import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { Plus, Pencil, DollarSign, TrendingUp, TrendingDown, X, Trash2, ChevronDown } from 'lucide-react';
import { BudgetCategoryItem } from './BudgetCategoryItem';
import { TASK_CATEGORIES } from '../../data/categories';
import { eventService, Event } from '../../services/eventService';
import { budgetService } from '../../services/budgetService';

export function Budget() {
  const { activeEventId } = useAppContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [budgetItems, setBudgetItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'paid' | 'deposit' | 'unpaid'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'recent-updated'>('recent-updated');
  const [newItem, setNewItem] = useState({
    category: '📋 General',
    name: '',
    priceType: 'FIX_EVENT' as const,
    unitPrice: 0,
    quantity: 1,
    estimatedPrice: 0,
    realPrice: 0,
    paymentStatus: 'unpaid' as const,
  });
  const [editValues, setEditValues] = useState({
    priceType: 'FIX_EVENT' as const,
    unitPrice: 0,
    quantity: 1,
    estimatedPrice: 0,
    realPrice: 0,
    paymentStatus: 'unpaid' as const,
  });

  // Load event data and budget items from backend
  useEffect(() => {
    const loadEventData = async () => {
      if (!activeEventId) {
        setEvent(null);
        setBudgetItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await eventService.getEvent(parseInt(activeEventId));
        setEvent(eventData);
        
        // Load budget items from backend
        const budgetData = await budgetService.getBudgetItems(parseInt(activeEventId));
        const mappedBudgetItems = budgetData.map((item: any) => ({
          id: item.id.toString(),
          supplierId: item.supplier_id?.toString(),
          category: item.category || '📋 General',
          name: item.name,
          priceType: item.price_type || 'FIX_EVENT',
          unitPrice: item.unit_price ?? item.estimated_cost ?? 0,
          quantity: item.quantity ?? 1,
          estimatedPrice: item.estimated_cost || 0,
          realPrice: item.actual_cost || 0,
          paymentStatus: item.payment_status || 'unpaid',
          updatedAt: item.updated_at || item.created_at || null,
        }));
        setBudgetItems(mappedBudgetItems);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setEvent(null);
        setBudgetItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [activeEventId]);

  // Helper function to automatically calculate payment status
  const calculatePaymentStatus = (realPrice: number, estimatedPrice: number): 'unpaid' | 'deposit' | 'paid' => {
    if (realPrice === 0) return 'unpaid';
    if (realPrice >= estimatedPrice) return 'paid';
    return 'deposit';
  };

  const totalEstimated = event?.budget_total_estimated || budgetItems.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const totalReal = budgetItems.reduce((sum, item) => sum + item.realPrice, 0);
  const difference = totalReal - totalEstimated;
  const percentagePaid = totalEstimated > 0 ? Math.round((totalReal / totalEstimated) * 100) : 0;

  const startEdit = (item: typeof budgetItems[0]) => {
    setEditingId(item.id);
    setEditValues({
      priceType: item.priceType || 'FIX_EVENT',
      unitPrice: item.unitPrice || item.estimatedPrice,
      quantity: item.quantity || 1,
      estimatedPrice: item.estimatedPrice,
      realPrice: item.realPrice,
      paymentStatus: item.paymentStatus,
    });
  };

  const saveEdit = async () => {
    if (!editingId || !activeEventId) return;
    
    try {
      const currentItem = budgetItems.find(item => item.id === editingId);
      if (!currentItem) return;
      
      // Update budget item in backend
      await budgetService.updateBudgetItem(parseInt(editingId), {
        price_type: currentItem.priceType === 'PER_INVITAT' ? 'PER_INVITAT' : 'FIX_EVENT',
        unit_price: currentItem.priceType === 'PER_INVITAT' ? (editValues.unitPrice || 0) : editValues.estimatedPrice,
        quantity: currentItem.priceType === 'PER_INVITAT' ? (editValues.quantity || currentItem.quantity || 1) : 1,
        estimated_cost: editValues.estimatedPrice,
        actual_cost: editValues.realPrice,
        payment_status: editValues.paymentStatus,
      });
      
      // Update local state
      setBudgetItems(budgetItems.map(item =>
        item.id === editingId
          ? {
              ...item,
              ...editValues,
              priceType: currentItem.priceType,
              unitPrice: currentItem.priceType === 'PER_INVITAT' ? (editValues.unitPrice || 0) : editValues.estimatedPrice,
              quantity: currentItem.priceType === 'PER_INVITAT' ? (editValues.quantity || currentItem.quantity || 1) : 1,
              updatedAt: new Date().toISOString(),
            }
          : item
      ));
      
      // Reload event to get updated budget_total_estimated
      const eventData = await eventService.getEvent(parseInt(activeEventId));
      setEvent(eventData);
      
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update budget item:', error);
      alert('Eroare la actualizarea bugetului');
    }
  };

  const addCustomItem = async () => {
    if (!activeEventId || !newItem.name) {
      alert('Te rog completează toate câmpurile obligatorii!');
      return;
    }
    
    try {
      // Create budget item in backend
      const createdItem = await budgetService.createBudgetItem(parseInt(activeEventId), {
        name: newItem.name,
        category: newItem.category,
        price_type: newItem.priceType,
        unit_price: newItem.priceType === 'PER_INVITAT' ? newItem.unitPrice : newItem.estimatedPrice,
        quantity: newItem.priceType === 'PER_INVITAT' ? newItem.quantity : 1,
        estimated_cost: newItem.estimatedPrice,
        actual_cost: newItem.realPrice,
        payment_status: newItem.paymentStatus,
      });
      
      // Add to local state
      const mappedItem = {
        id: createdItem.id.toString(),
        supplierId: createdItem.supplier_id?.toString(),
        category: createdItem.category || '📋 General',
        name: createdItem.name,
        priceType: createdItem.price_type || 'FIX_EVENT',
        unitPrice: createdItem.unit_price ?? createdItem.estimated_cost ?? 0,
        quantity: createdItem.quantity ?? 1,
        estimatedPrice: createdItem.estimated_cost || 0,
        realPrice: createdItem.actual_cost || 0,
        paymentStatus: createdItem.payment_status || 'unpaid',
        updatedAt: createdItem.updated_at || createdItem.created_at || null,
      };
      setBudgetItems([...budgetItems, mappedItem]);
      
      // Reload event to get updated budget_total_estimated
      const eventData = await eventService.getEvent(parseInt(activeEventId));
      setEvent(eventData);
      
      setShowAddModal(false);
      setNewItem({
        category: '📋 General',
        name: '',
        priceType: 'FIX_EVENT',
        unitPrice: 0,
        quantity: 1,
        estimatedPrice: 0,
        realPrice: 0,
        paymentStatus: 'unpaid',
      });
    } catch (error) {
      console.error('Failed to create budget item:', error);
      alert('Eroare la adăugarea cheltuielii');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi această cheltuială?')) return;
    
    try {
      await budgetService.deleteBudgetItem(parseInt(id));
      setBudgetItems(budgetItems.filter(item => item.id !== id));
      
      // Reload event to get updated budget_total_estimated
      if (activeEventId) {
        const eventData = await eventService.getEvent(parseInt(activeEventId));
        setEvent(eventData);
      }
    } catch (error) {
      console.error('Failed to delete budget item:', error);
      alert('Eroare la ștergerea cheltuielii');
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-700';
      case 'deposit': return 'bg-amber-50 text-amber-700';
      default: return 'bg-red-50 text-red-700';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Achitat';
      case 'deposit': return 'Avans';
      default: return 'Neachitat';
    }
  };

  // Filtrare și sortare
  const filteredItems = budgetItems.filter(item => {
    if (filter === 'all') return true;
    return item.paymentStatus === filter;
  });

  const sortItems = (items: typeof budgetItems) => {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'recent-updated':
        return sorted.sort((a, b) => {
          const left = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const right = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return right - left;
        });
      case 'price-asc':
        return sorted.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.estimatedPrice - a.estimatedPrice);
      default:
        return sorted;
    }
  };

  const sortedAndFilteredItems = sortItems(filteredItems);

  // Contoare pentru filtre
  const paidCount = budgetItems.filter(item => item.paymentStatus === 'paid').length;
  const depositCount = budgetItems.filter(item => item.paymentStatus === 'deposit').length;
  const unpaidCount = budgetItems.filter(item => item.paymentStatus === 'unpaid').length;

  // Grupare pentru afișare
  const categories = Array.from(new Set(sortedAndFilteredItems.map(item => item.category)));
  const statuses: Array<'unpaid' | 'deposit' | 'paid'> = ['unpaid', 'deposit', 'paid'];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title with 50px top spacing */}
      <div className="mb-8" style={{ marginTop: '50px' }}>
        <h2 className="text-[80px] leading-[1] font-medium text-[#960010] uppercase tracking-[-2px] mb-2">
          BUGET
        </h2>
        <p className="text-[16px] text-[#6a7282] tracking-[-0.3125px]">
          Controlează toate cheltuielile evenimentului tău
        </p>
      </div>

      {/* Summary Cards - EXACT ca în Figma: container roșu + container alb */}
      <div className="bg-[#960010] p-[40px] mb-8">
        <div className="bg-white p-[20px]">
          <div className="mb-[32px]">
            <h3 className="font-medium text-[43px] leading-none text-[#960010] uppercase tracking-[-2.58px]">
              Detalii buget
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] h-[128px]">
            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border-2 border-[#960010] pt-[26px] px-[26px] pb-[2px] flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Achitat</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">
                {totalReal.toLocaleString()} MDL
              </p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Preț total</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">
                {totalEstimated.toLocaleString()} MDL
              </p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Diferență</h3>
              <p className={`font-semibold text-[30px] leading-[38px] tracking-[-0.2051px] ${
                difference > 0 ? 'text-[#960010]' : 'text-[#101828]'
              }`}>
                {difference > 0 && '+'}{difference.toLocaleString()} MDL
              </p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Procent achitat</h3>
              <p className={`font-semibold text-[30px] leading-[38px] tracking-[-0.2051px] ${
                percentagePaid >= 100 ? 'text-green-600' : percentagePaid >= 50 ? 'text-[#960010]' : 'text-[#101828]'
              }`}>
                {percentagePaid}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Details - minimalist card */}
      <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] p-8">
        {budgetItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-[#6a7282]" />
            </div>
            <p className="text-[16px] text-[#101828] tracking-[-0.3125px] mb-2">Nu există încă cheltuieli în buget</p>
            <p className="text-[14px] text-[#6a7282] tracking-[-0.1504px]">Selectează furnizori sau adaugă cheltuieli manual</p>
          </div>
        ) : (
          <>
            {/* Filtre și sortare - minimalist style */}
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              {/* Filtre */}
              <button
                onClick={() => setFilter('all')}
                className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                    : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
                }`}
              >
                <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">
                  Toate
                </span>
                <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                  filter === 'all'
                    ? 'bg-[rgba(255,255,255,0.2)] text-white'
                    : 'bg-[#f3f4f6] text-[#4a5565]'
                }`}>
                  {filteredItems.length}
                </span>
              </button>
              
              <button
                onClick={() => setFilter('unpaid')}
                className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                  filter === 'unpaid'
                    ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                    : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
                }`}
              >
                <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">
                  De plată
                </span>
                <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                  filter === 'unpaid'
                    ? 'bg-[rgba(255,255,255,0.2)] text-white'
                    : 'bg-[#f3f4f6] text-[#4a5565]'
                }`}>
                  {budgetItems.filter(item => item.paymentStatus === 'unpaid').length}
                </span>
              </button>
              
              <button
                onClick={() => setFilter('deposit')}
                className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                  filter === 'deposit'
                    ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                    : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
                }`}
              >
                <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">
                  Avans plătit
                </span>
                <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                  filter === 'deposit'
                    ? 'bg-[rgba(255,255,255,0.2)] text-white'
                    : 'bg-[#f3f4f6] text-[#4a5565]'
                }`}>
                  {budgetItems.filter(item => item.paymentStatus === 'deposit').length}
                </span>
              </button>
              
              <button
                onClick={() => setFilter('paid')}
                className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                  filter === 'paid'
                    ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                    : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
                }`}
              >
                <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">
                  Plătit complet
                </span>
                <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                  filter === 'paid'
                    ? 'bg-[rgba(255,255,255,0.2)] text-white'
                    : 'bg-[#f3f4f6] text-[#4a5565]'
                }`}>
                  {budgetItems.filter(item => item.paymentStatus === 'paid').length}
                </span>
              </button>
              
              {/* Separator */}
              <div className="h-8 w-px bg-[#e5e7eb] mx-2"></div>
              
              {/* Sortare */}
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-[#6a7282] tracking-[-0.1504px]">Sortare:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-[40px] px-[16px] border border-[#e7e7e7] text-[#364153] rounded-full font-normal text-[16px] leading-[24px] tracking-[-0.3125px] hover:border-[#d1d5dc] transition-all focus:outline-none focus:border-[#960010] cursor-pointer bg-white"
                >
                  <option value="recent-updated">Ultimele modificări</option>
                  <option value="price-asc">Preț (crescător)</option>
                  <option value="price-desc">Preț (descrescător)</option>
                </select>
              </div>
            </div>

            {sortBy === 'price-asc' || sortBy === 'price-desc' || sortBy === 'recent-updated' ? (
              // Tabel pentru sortare după preț cu editare inline
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Categorie</th>
                      <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Nume</th>
                      <th className="text-right py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Preț estimat</th>
                      <th className="text-right py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Achitat</th>
                      <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Status plată</th>
                      <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAndFilteredItems.map(item => (
                      editingId === item.id ? (
                        // Modul editare
                        <tr key={item.id} className="border-b border-[#f3f4f6] bg-[#f9fafb]">
                          <td className="py-4 px-4">
                            <span className="text-[12px] leading-[16px] px-3.5 py-1.5 rounded-full bg-[#f3f4f6] text-[#4a5565] h-[28px] inline-flex items-center">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-[14px] text-[#101828] tracking-[-0.1504px]">{item.name}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {item.priceType === 'PER_INVITAT' && (
                              <div className="text-[11px] text-[#6a7282] mb-1">
                                {(item.unitPrice || 0).toLocaleString()} MDL × {(item.quantity || 1).toLocaleString()}
                              </div>
                            )}
                            <input
                              type="number"
                              value={item.priceType === 'PER_INVITAT' ? (editValues.unitPrice ?? 0) : editValues.estimatedPrice}
                              onChange={(e) => {
                                const rawValue = parseFloat(e.target.value) || 0;
                                const newEstimated = item.priceType === 'PER_INVITAT'
                                  ? rawValue * (editValues.quantity || item.quantity || 1)
                                  : rawValue;
                                const newStatus = calculatePaymentStatus(editValues.realPrice, newEstimated);
                                setEditValues({
                                  ...editValues,
                                  unitPrice: item.priceType === 'PER_INVITAT' ? rawValue : editValues.unitPrice,
                                  estimatedPrice: newEstimated,
                                  paymentStatus: newStatus,
                                });
                              }}
                              className="w-24 px-2 py-1 border border-[#960010] rounded text-right font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]"
                            />
                          </td>
                          <td className="py-4 px-4 text-right">
                            <input
                              type="number"
                              value={editValues.realPrice}
                              onChange={(e) => {
                                const newReal = parseFloat(e.target.value) || 0;
                                const newStatus = calculatePaymentStatus(newReal, editValues.estimatedPrice);
                                setEditValues({ ...editValues, realPrice: newReal, paymentStatus: newStatus });
                              }}
                              className="w-24 px-2 py-1 border border-[#960010] rounded text-right font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]"
                            />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold inline-block ${getPaymentStatusColor(editValues.paymentStatus)}`}>
                              {getPaymentStatusText(editValues.paymentStatus)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={saveEdit}
                                className="p-2 text-white bg-[#960010] hover:bg-[#7a000d] rounded-full transition-all"
                                title="Salvează"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-white rounded-full transition-all"
                                title="Anulează"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        // Modul vizualizare
                        <tr key={item.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                          <td className="py-4 px-4">
                            <span className="text-[12px] leading-[16px] px-3.5 py-1.5 rounded-full bg-[#f3f4f6] text-[#4a5565] h-[28px] inline-flex items-center">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-[14px] text-[#101828] tracking-[-0.1504px]">{item.name}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {item.priceType === 'PER_INVITAT' && (
                              <div className="text-[11px] text-[#6a7282] mb-1">
                                {(item.unitPrice || 0).toLocaleString()} MDL × {(item.quantity || 1).toLocaleString()} invitați
                              </div>
                            )}
                            <span className="font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]">
                              {item.estimatedPrice.toLocaleString()} MDL
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]">
                              {item.realPrice.toLocaleString()} MDL
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold inline-block ${getPaymentStatusColor(item.paymentStatus)}`}>
                              {getPaymentStatusText(item.paymentStatus)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => startEdit(item)}
                                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-white rounded-full transition-all"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-[#6a7282] hover:text-[#960010] hover:bg-white rounded-full transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Grupat după categorie
              <div className="space-y-8">
                {categories.map(category => {
                  const categoryItems = sortedAndFilteredItems.filter(item => item.category === category);
                  if (categoryItems.length === 0) return null;

                  const categoryTotal = categoryItems.reduce((sum, item) => sum + item.estimatedPrice, 0);
                  const categoryPaid = categoryItems.reduce((sum, item) => sum + item.realPrice, 0);

                  return (
                    <div key={category}>
                      {/* Header categorie */}
                      <div className="flex items-center justify-between h-[28px] mb-[16px]">
                        <h3 className="font-medium text-[22px] leading-[28px] text-[#101828] tracking-[-0.55px] uppercase">{category}</h3>
                        <p className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.1504px]">
                          {categoryPaid.toLocaleString()}/{categoryTotal.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Items - gap 8px între ele */}
                      <div className="flex flex-col gap-[8px]">
                        {categoryItems.map(item => (
                          <BudgetCategoryItem
                            key={item.id}
                            item={item}
                            isEditing={editingId === item.id}
                            editValues={editValues}
                            onStartEdit={() => startEdit(item)}
                            onSaveEdit={saveEdit}
                            onCancelEdit={() => setEditingId(null)}
                            onDelete={() => deleteItem(item.id)}
                            onEditValuesChange={setEditValues}
                            getPaymentStatusColor={getPaymentStatusColor}
                            getPaymentStatusText={getPaymentStatusText}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#960010] hover:bg-[#7a000d] rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40"
        title="Adaugă cheltuială"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] font-semibold text-[#101828] tracking-[-0.6006px]">Adaugă cheltuială</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Nume *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Ex: Transport invitați"
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Categorie *</label>
                <div className="relative">
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full appearance-none px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none bg-white text-[#101828]"
                  >
                    {TASK_CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#6a7282] absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Preț estimat (MDL) *</label>
                {newItem.priceType === 'PER_INVITAT' && (
                  <p className="text-[12px] text-[#6a7282] mb-2">
                    {(newItem.unitPrice || 0).toLocaleString()} MDL × {(newItem.quantity || 1).toLocaleString()} invitați = {(newItem.estimatedPrice || 0).toLocaleString()} MDL
                  </p>
                )}
                <input
                  type="number"
                  value={newItem.priceType === 'PER_INVITAT' ? (newItem.unitPrice || '') : (newItem.estimatedPrice || '')}
                  onChange={(e) => {
                    const rawValue = parseFloat(e.target.value) || 0;
                    const newEstimated = newItem.priceType === 'PER_INVITAT'
                      ? rawValue * (newItem.quantity || 1)
                      : rawValue;
                    const newStatus = calculatePaymentStatus(newItem.realPrice, newEstimated);
                    setNewItem({
                      ...newItem,
                      unitPrice: newItem.priceType === 'PER_INVITAT' ? rawValue : newItem.unitPrice,
                      estimatedPrice: newEstimated,
                      paymentStatus: newStatus,
                    });
                  }}
                  placeholder="Ex: 5000"
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Tip preț</label>
                <div className="relative">
                  <select
                    value={newItem.priceType}
                    onChange={(e) => {
                      const nextType = e.target.value as 'FIX_EVENT' | 'PER_INVITAT';
                      const nextEstimated =
                        nextType === 'PER_INVITAT'
                          ? (newItem.unitPrice || 0) * (newItem.quantity || 1)
                          : newItem.estimatedPrice;
                      const nextStatus = calculatePaymentStatus(newItem.realPrice, nextEstimated);
                      setNewItem({ ...newItem, priceType: nextType, estimatedPrice: nextEstimated, paymentStatus: nextStatus });
                    }}
                    className="w-full appearance-none px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none bg-white text-[#101828]"
                  >
                    <option value="FIX_EVENT">Fix per eveniment</option>
                    <option value="PER_INVITAT">Per invitat</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#6a7282] absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {newItem.priceType === 'PER_INVITAT' && (
                <div>
                  <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Număr invitați</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity || ''}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value, 10) || 1;
                      const newEstimated = (newItem.unitPrice || 0) * qty;
                      const newStatus = calculatePaymentStatus(newItem.realPrice, newEstimated);
                      setNewItem({ ...newItem, quantity: qty, estimatedPrice: newEstimated, paymentStatus: newStatus });
                    }}
                    className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Achitat (MDL)</label>
                <input
                  type="number"
                  value={newItem.realPrice || ''}
                  onChange={(e) => {
                    const newReal = parseFloat(e.target.value) || 0;
                    const newStatus = calculatePaymentStatus(newReal, newItem.estimatedPrice);
                    setNewItem({ ...newItem, realPrice: newReal, paymentStatus: newStatus });
                  }}
                  placeholder="Ex: 0"
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Status plată (automat)</label>
                <div className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full bg-[#f9fafb] flex items-center">
                  <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold ${getPaymentStatusColor(newItem.paymentStatus)}`}>
                    {getPaymentStatusText(newItem.paymentStatus)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={addCustomItem}
                disabled={!newItem.name || newItem.estimatedPrice <= 0}
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all disabled:bg-[#d1d5dc] disabled:cursor-not-allowed"
              >
                Adaugă
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-white hover:bg-[#f3f4f6] text-[#364153] border border-[#e5e7eb] py-3 rounded-full transition-all"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
