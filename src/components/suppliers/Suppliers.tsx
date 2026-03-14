import React, { useState, useMemo, useEffect } from "react";
import { useAppContext } from "../../App";
import {
  Star,
  Phone,
  Check,
  X,
  RefreshCw,
  MapPin,
  Edit2,
  MoreVertical,
  Heart,
  Plus,
} from "lucide-react";
import {
  calculateSupplierPrice,
  formatPriceDisplay,
  formatEstimatedTotal,
} from "../../utils/pricing";
import {
  SUPPLIER_CATEGORIES,
  getSupplierGroup,
  getSupplierLabel,
} from "../../data/categories";
import { supplierService } from "../../services/supplierService";

export function Suppliers() {
  const { activeEventId, event } = useAppContext();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Toate");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [customPriceType, setCustomPriceType] = useState<
    "FIX_EVENT" | "PER_HOUR" | "PER_PERSON"
  >("FIX_EVENT");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    category: "🎤 Entertainment & atmosferă",
    contact: "",
    location: "Chișinău",
    price: 0,
    priceType: "FIX_EVENT" as const,
    rating: 0,
  });

  // Load suppliers from backend
  useEffect(() => {
    const loadSuppliers = async () => {
      if (!activeEventId) {
        setSuppliers([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        console.log('DEBUG SUPPLIERS: Loading data for event', activeEventId);
        
        // Load both supplier templates and selected suppliers
        const [templatesData, selectedSuppliersData] = await Promise.all([
          supplierService.getSupplierTemplates(),
          supplierService.getSuppliers(parseInt(activeEventId))
        ]);
        
        console.log('DEBUG SUPPLIERS: Loaded templates:', templatesData?.length || 0);
        console.log('DEBUG SUPPLIERS: Loaded selected suppliers:', selectedSuppliersData?.length || 0);
        
        // Start with templates
        const allSuppliers = [...(templatesData || [])];
        
        // Add selected suppliers (they override templates)
        for (const selectedSupplier of selectedSuppliersData || []) {
          const templateIndex = allSuppliers.findIndex(s => 
            s.name === selectedSupplier.name && s.category === selectedSupplier.category
          );
          
          if (templateIndex >= 0) {
            // Replace template with selected supplier
            allSuppliers[templateIndex] = {
              ...selectedSupplier,
              selected: true
            };
          } else {
            // Add custom supplier
            allSuppliers.push({
              ...selectedSupplier,
              selected: true
            });
          }
        }
        
        console.log('DEBUG SUPPLIERS: Final suppliers list:', allSuppliers.length);
        setSuppliers(allSuppliers);
      } catch (error) {
        console.error("Failed to load suppliers:", error);
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, [activeEventId]);

  // Categoriile cu iconițe (importate din fișierul comun)
  const categories = SUPPLIER_CATEGORIES;

  const toggleSupplier = async (supplierId: string) => {
    console.log('DEBUG FRONTEND: toggleSupplier called with supplierId:', supplierId);
    if (!activeEventId) {
      console.log('DEBUG FRONTEND: No activeEventId, returning');
      return;
    }

    const supplier = suppliers.find((s) => s.id.toString() === supplierId);
    if (!supplier) {
      console.log('DEBUG FRONTEND: Supplier not found in local state');
      return;
    }

    console.log('DEBUG FRONTEND: Found supplier:', supplier.name, 'current selected:', supplier.selected);

    try {
      if (supplier.selected) {
        // Deselecting - delete from backend
        console.log('DEBUG FRONTEND: Deselecting supplier, calling delete...');
        await supplierService.deleteSupplier(parseInt(supplierId));
        
        // Update local state - if it's a template, mark as not selected
        if (supplierId.startsWith('template_')) {
          setSuppliers(
            suppliers.map((s) =>
              s.id.toString() === supplierId ? { ...s, selected: false } : s
            )
          );
        } else {
          // Remove from list if it was a selected supplier
          setSuppliers(suppliers.filter((s) => s.id.toString() !== supplierId));
        }
      } else {
        // Selecting - create new supplier in backend
        console.log('DEBUG FRONTEND: Selecting supplier, calling create...');
        const createdSupplier = await supplierService.createSupplier(
          parseInt(activeEventId),
          {
            name: supplier.name,
            category: supplier.category,
            contact: supplier.contact || undefined,
            location: supplier.location || undefined,
            price: supplier.price,
            price_type: supplier.priceType,
            rating: supplier.rating,
            selected: true,
            is_custom: false,
          }
        );

        console.log('DEBUG FRONTEND: Backend create successful, created supplier:', createdSupplier);

        // Update local state - replace template with selected supplier
        setSuppliers(
          suppliers.map((s) =>
            s.id.toString() === supplierId 
              ? { ...createdSupplier, selected: true }
              : s
          )
        );
      }

      console.log('DEBUG FRONTEND: Local state updated');
    } catch (error) {
      console.error("Failed to toggle supplier:", error);
      alert("Eroare la actualizarea furnizorului");
    }
  };

  const filteredSuppliers =
    selectedCategory === "Toate"
      ? suppliers.filter((s) => !s.isCustom)
      : suppliers.filter(
          (s) => getSupplierGroup(s.category) === selectedCategory && !s.isCustom
        );

  const selectedSuppliers = suppliers.filter((s) => s.selected);

  const addCustomSupplier = async () => {
    if (
      !activeEventId ||
      !newSupplier.name ||
      !newSupplier.contact ||
      newSupplier.price <= 0
    ) {
      alert("Te rog completează toate câmpurile obligatorii!");
      return;
    }

    try {
      // Create supplier in backend
      const createdSupplier = await supplierService.createSupplier(
        parseInt(activeEventId),
        {
          name: newSupplier.name,
          category: newSupplier.category,
          contact: newSupplier.contact,
          location: newSupplier.location,
          price: newSupplier.price,
          price_type: newSupplier.priceType,
          rating: newSupplier.rating,
          selected: true,
          is_custom: true,
        }
      );

      // Add to local state
      setSuppliers([...suppliers, createdSupplier]);

      // Reset form and close modal
      setNewSupplier({
        name: "",
        category: "🎤 Entertainment & atmosferă",
        contact: "",
        location: "Chișinău",
        price: 0,
        priceType: "FIX_EVENT",
        rating: 0,
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create supplier:", error);
      alert("Eroare la adăugarea furnizorului");
    }
  };

  const openEditModal = (supplierId: string) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    if (!supplier) return;

    setNewSupplier({
      name: supplier.name,
      category: supplier.category,
      contact: supplier.contact,
      location: supplier.location || "Chișinău",
      price: supplier.price,
      priceType: supplier.priceType,
      rating: supplier.rating,
    });
    setEditingSupplier(supplierId);
  };

  const saveEditedSupplier = async () => {
    if (
      !editingSupplier ||
      !newSupplier.name ||
      !newSupplier.contact ||
      newSupplier.price <= 0
    ) {
      alert("Te rog completează toate câmpurile obligatorii!");
      return;
    }

    try {
      // Update supplier in backend
      await supplierService.updateSupplier(parseInt(editingSupplier), {
        name: newSupplier.name,
        category: newSupplier.category,
        contact: newSupplier.contact,
        location: newSupplier.location,
        price: newSupplier.price,
        price_type: newSupplier.priceType,
        rating: newSupplier.rating,
      });

      // Update local state
      setSuppliers(
        suppliers.map((s) => {
          if (s.id.toString() === editingSupplier) {
            return {
              ...s,
              name: newSupplier.name,
              category: newSupplier.category,
              contact: newSupplier.contact,
              location: newSupplier.location,
              price: newSupplier.price,
              price_type: newSupplier.priceType,
              rating: newSupplier.rating,
            };
          }
          return s;
        })
      );

      // Backend automatically updates budget items via supplier_service.py

      setNewSupplier({
        name: "",
        category: "🎤 Entertainment & atmosferă",
        contact: "",
        location: "Chișinău",
        price: 0,
        priceType: "FIX_EVENT",
        rating: 0,
      });
      setEditingSupplier(null);
    } catch (error) {
      console.error("Failed to update supplier:", error);
      alert("Eroare la actualizarea furnizorului");
    }
  };

  const openPriceEditModal = (supplierId: string) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    if (!supplier || !event) return;

    const unitPrice = supplier.customPrice || supplier.price;

    setCustomPrice(unitPrice);
    setCustomPriceType(supplier.priceType);
    setEditingPrice(supplierId);
  };

  const savePriceEdit = async () => {
    if (!editingPrice || customPrice <= 0 || !activeEventId) {
      alert("Te rog introdu un preț valid!");
      return;
    }

    try {
      // Update supplier price in backend
      await supplierService.updateSupplier(parseInt(editingPrice), {
        price: customPrice,
      });

      // Update local state
      setSuppliers(
        suppliers.map((s) => {
          if (s.id.toString() === editingPrice) {
            return {
              ...s,
              price: customPrice,
              priceType: customPriceType,
              customPrice: customPrice,
            };
          }
          return s;
        })
      );

      // Backend automatically updates budget items via supplier_service.py

      setEditingPrice(null);
      setCustomPrice(0);
      setCustomPriceType("FIX_EVENT");
    } catch (error) {
      console.error("Failed to update supplier price:", error);
      alert("Eroare la actualizarea prețului");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title with 50px top spacing */}
      <div className="mb-8" style={{ marginTop: "50px" }}>
        <h2 className="text-[80px] leading-[1] font-medium text-[#960010] uppercase tracking-[-2px] mb-2">
          FURNIZORI
        </h2>
        <p className="text-[16px] text-[#6a7282] tracking-[-0.3125px]">
          Selectează furnizorii pentru evenimentul tău. Ei vor fi adăugați
          automat în buget.
        </p>
      </div>

      {/* Selected Suppliers Section - EXACT ca în Figma */}
      {selectedSuppliers.length > 0 && (
        <div className="bg-[#960010] p-[40px] mb-8">
          <div className="bg-white p-[20px]">
            {/* Header */}
            <div className="flex items-start justify-between mb-[32px]">
              <h3 className="font-medium text-[43px] leading-none text-[#960010] uppercase tracking-[-2.58px]">
                FURNIZORI SELECTAȚI ({selectedSuppliers.length})
              </h3>
            </div>

            {/* Grid cu furnizori - 3 coloane */}
            <div className="grid grid-cols-3 gap-[16px]">
              {selectedSuppliers.map((supplier) => {
                const displayCategory = getSupplierLabel(supplier.category);

                const pricingContext = {
                  guestCount: event?.guestCount || 0,
                  durationHours: 4,
                  eventType: event?.type || "Nuntă",
                };
                const totalPrice = calculateSupplierPrice(supplier, pricingContext);
                const unitPrice = supplier.customPrice || supplier.price;

                return (
                  <div
                    key={supplier.id}
                    className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[16px] px-[16px] pb-[16px] flex flex-col gap-[8px]"
                  >
                    {/* Top section - Category + Name + Menu */}
                    <div className="flex items-start justify-between h-[48px]">
                      <div className="flex-1">
                        <div className="flex items-center gap-[8px]">
                          <p className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.1504px]">
                            {displayCategory}
                          </p>
                          {supplier.isCustom && (
                            <span className="bg-[#960010] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                              ADĂUGAT
                            </span>
                          )}
                          {/* Rating - only for non-custom suppliers */}
                          {!supplier.isCustom && supplier.rating > 0 && (
                            <div className="flex items-center gap-[4px]">
                              <Star className="w-[14px] h-[14px] text-[#F0B100] fill-[#F0B100]" />
                              <span className="font-normal text-[12px] leading-[16px] text-[#101828]">
                                {supplier.rating}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-[16px] leading-[24px] text-[#101828] tracking-[-0.3125px] uppercase mt-[4px]">
                          {supplier.name}
                        </h4>
                      </div>

                      {/* 3 dots menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === supplier.id ? null : supplier.id
                            );
                          }}
                          className="w-[32px] h-[32px] rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                          <MoreVertical className="w-[20px] h-[20px] text-[#6a7282]" />
                        </button>

                        {openMenuId === supplier.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-[36px] z-20 bg-white shadow-lg border border-gray-200 py-1 min-w-[160px]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  openPriceEditModal(supplier.id);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                Editează preț
                              </button>
                              {supplier.isCustom && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(null);
                                    openEditModal(supplier.id);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  Editează furnizor
                                </button>
                              )}
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  toggleSupplier(supplier.id);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <X className="w-3.5 h-3.5" />
                                Șterge
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bottom section - Price only */}
                    <div className="flex items-center justify-between h-[40px]">
                      <div>
                        <div className="flex items-center gap-[8px]">
                          <p className="font-semibold text-[14px] leading-[20px] text-[#960010] tracking-[-0.1504px]">
                            {totalPrice.toLocaleString()} MDL
                          </p>
                          {supplier.customPrice && (
                            <span className="bg-white border border-[#960010] text-[#960010] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                              MODIFICAT
                            </span>
                          )}
                        </div>
                        <p className="font-normal text-[12px] leading-[16px] text-[#6a7282] mt-[4px]">
                          {unitPrice.toLocaleString()} MDL{" "}
                          {formatPriceDisplay(supplier)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const categoryCount =
            category === "Toate"
              ? suppliers.filter((s) => !s.isCustom).length
              : suppliers.filter(
                  (s) => getSupplierGroup(s.category) === category && !s.isCustom
                ).length;

          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  : "border border-[#e7e7e7] text-[#364153] px-[17px] py-px hover:border-[#960010] hover:bg-[#fef2f2]"
              }`}
            >
              <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">
                {category}
              </span>
              {categoryCount > 0 && (
                <span
                  className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                    isSelected
                      ? "bg-[rgba(255,255,255,0.2)] text-white"
                      : "bg-[#f3f4f6] text-[#4a5565]"
                  }`}
                >
                  {categoryCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => {
          const displayCategory = getSupplierLabel(supplier.category);

          const pricingContext = {
            guestCount: event?.guestCount || 0,
            durationHours: 4,
            eventType: event?.type || "Nuntă",
          };
          const totalPrice = calculateSupplierPrice(supplier, pricingContext);
          const unitPrice = supplier.customPrice || supplier.price;
          const isSelected = supplier.selected;

          return (
            <div
              key={supplier.id}
              onClick={() => toggleSupplier(supplier.id)}
              className={`bg-white p-[24px] cursor-pointer transition-shadow relative ${
                isSelected
                  ? "border-2 border-[#101828]"
                  : "border-2 border-[#e5e7eb] hover:shadow-md"
              }`}
            >
              {/* Header - Category + Rating + Checkbox */}
              <div className="flex items-start justify-between mb-[8px]">
                <div className="flex-1">
                  <div className="flex items-center gap-[8px]">
                    <div className="bg-[#f3f4f6] h-[24px] rounded-full inline-flex items-center px-[12px]">
                      <p className="font-normal text-[12px] leading-[16px] text-[#4a5565]">
                        {displayCategory}
                      </p>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <Star className="w-[14px] h-[14px] text-[#F0B100] fill-[#F0B100]" />
                      <span className="font-normal text-[12px] leading-[16px] text-[#101828]">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`w-[24px] h-[24px] rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-[#101828] border-2 border-[#101828]"
                      : "border-2 border-[#d1d5dc]"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-[16px] h-[16px] text-white" />
                  )}
                </div>
              </div>

              {/* Supplier Name */}
              <h4 className="font-semibold text-[18px] leading-[28px] text-[#101828] tracking-[-0.4395px] uppercase mb-[12px]">
                {supplier.name}
              </h4>

              {/* Contact Info */}
              <div className="space-y-[8px] mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Phone className="w-[16px] h-[16px] text-[#4a5565]" />
                  <span className="font-normal text-[14px] leading-[20px] text-[#4a5565] tracking-[-0.1504px]">
                    {supplier.contact}
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <MapPin className="w-[16px] h-[16px] text-[#4a5565]" />
                  <span className="font-normal text-[14px] leading-[20px] text-[#4a5565] tracking-[-0.1504px]">
                    {supplier.location || "Chișinău"}
                  </span>
                </div>
              </div>

              {/* Price Section - with border top */}
              <div className="pt-[17px] border-t border-[#e5e7eb] flex items-center justify-between">
                <div>
                  <p className="font-normal text-[14px] leading-[20px] text-[#4a5565] tracking-[-0.1504px]">
                    {formatPriceDisplay(supplier)}
                  </p>
                </div>
                <div
                  className={`h-[40px] rounded-full flex items-center justify-center px-[14px] ${
                    isSelected
                      ? "bg-[#101828] border-2 border-[#101828]"
                      : "bg-[#f3f4f6] border-2 border-[#f3f4f6]"
                  }`}
                >
                  <span
                    className={`font-semibold text-[16px] leading-[24px] tracking-[-0.3125px] ${
                      isSelected ? "text-white" : "text-[#101828]"
                    }`}
                  >
                    {totalPrice.toLocaleString()} MDL
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nu există furnizori în această categorie
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#960010] hover:bg-[#7a000d] rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40"
        title="Adaugă furnizor"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-900">
                Adaugă furnizor personalizat
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Nume *
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                  placeholder="Ex: DJ Premium Events"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Categorie *
                </label>
                <select
                  value={newSupplier.category}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, category: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                >
                  {categories
                    .filter((c) => c !== "Toate")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Contact *
                </label>
                <input
                  type="text"
                  value={newSupplier.contact}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, contact: e.target.value })
                  }
                  placeholder="Ex: +373 69 123 456"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Locație
                </label>
                <input
                  type="text"
                  value={newSupplier.location}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, location: e.target.value })
                  }
                  placeholder="Ex: Chișinău"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Preț *
                </label>
                <input
                  type="number"
                  value={newSupplier.price || ""}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Ex: 5000"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Tip preț *
                </label>
                <select
                  value={newSupplier.priceType}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      priceType: e.target.value as "FIX_EVENT",
                    })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                >
                  <option value="FIX_EVENT">Fix per eveniment</option>
                  <option value="PER_HOUR">Per oră</option>
                  <option value="PER_PERSON">Per persoană</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={addCustomSupplier}
                disabled={
                  !newSupplier.name ||
                  !newSupplier.contact ||
                  newSupplier.price <= 0
                }
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Adaugă
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Supplier Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-900">Editează furnizorul</h3>
              <button
                onClick={() => setEditingSupplier(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Nume *
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Categorie *
                </label>
                <select
                  value={newSupplier.category}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, category: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                >
                  {categories
                    .filter((c) => c !== "Toate")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Contact *
                </label>
                <input
                  type="text"
                  value={newSupplier.contact}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, contact: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Locație
                </label>
                <input
                  type="text"
                  value={newSupplier.location}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, location: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Preț *
                </label>
                <input
                  type="number"
                  value={newSupplier.price || ""}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Tip preț *
                </label>
                <select
                  value={newSupplier.priceType}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      priceType: e.target.value as "FIX_EVENT",
                    })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                >
                  <option value="FIX_EVENT">Fix per eveniment</option>
                  <option value="PER_HOUR">Per oră</option>
                  <option value="PER_PERSON">Per persoană</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={newSupplier.rating || ""}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      rating: parseFloat(e.target.value) || 4.5,
                    })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={saveEditedSupplier}
                disabled={
                  !newSupplier.name ||
                  !newSupplier.contact ||
                  newSupplier.price <= 0
                }
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Salvează
              </button>
              <button
                onClick={() => setEditingSupplier(null)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-full transition-all"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Modal */}
      {editingPrice &&
        (() => {
          const supplier = suppliers.find((s) => s.id === editingPrice);
          const previewTotal =
            event && customPrice > 0
              ? calculateSupplierPrice(
                  {
                    ...supplier,
                    price: customPrice,
                    priceType: customPriceType,
                  },
                  {
                    guestCount: event.guest_count || 0,
                    durationHours: 4,
                    eventType: event.event_type || "Nuntă",
                  }
                )
              : 0;

          return (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div
                className="absolute inset-0 bg-black opacity-20"
                onClick={() => setEditingPrice(null)}
              ></div>

              <div className="bg-white shadow-2xl p-8 w-full max-w-md border border-gray-200 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Editează prețul
                  </h3>
                  <button
                    onClick={() => setEditingPrice(null)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {supplier && (
                  <>
                    <div className="mb-6 p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-1">Furnizor</p>
                      <p className="text-gray-900 font-semibold">
                        {supplier.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {supplier.category}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Preț unitar (MDL) *
                        </label>
                        <input
                          type="number"
                          value={customPrice || ""}
                          onChange={(e) =>
                            setCustomPrice(parseFloat(e.target.value) || 0)
                          }
                          placeholder="Ex: 5000"
                          className="w-full px-4 py-2 border border-gray-300 focus:border-[#960010] focus:outline-none"
                          autoFocus
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Tip preț *
                        </label>
                        <select
                          value={customPriceType}
                          onChange={(e) =>
                            setCustomPriceType(e.target.value as "FIX_EVENT")
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:border-[#960010] focus:outline-none"
                        >
                          <option value="FIX_EVENT">Fix per eveniment</option>
                          <option value="PER_HOUR">Per oră</option>
                          <option value="PER_PERSON">Per persoană</option>
                        </select>
                      </div>

                      {customPrice > 0 && event && (
                        <div className="p-4 bg-gray-50 border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">
                            Preview preț total
                          </p>
                          <p className="text-2xl text-[#960010] font-bold">
                            {previewTotal.toLocaleString()} MDL
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {customPriceType === "PER_PERSON" &&
                              `${customPrice.toLocaleString()} MDL × ${
                                event.guest_count || 0
                              } invitați`}
                            {customPriceType === "PER_HOUR" &&
                              `${customPrice.toLocaleString()} MDL × 4 ore`}
                            {customPriceType === "FIX_EVENT" &&
                              `Preț fix pentru eveniment`}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setEditingPrice(null)}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all"
                      >
                        Anulează
                      </button>
                      <button
                        onClick={savePriceEdit}
                        disabled={customPrice <= 0}
                        className="flex-1 px-6 py-3 bg-[#960010] hover:bg-[#7a000d] text-white transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Salvează
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
