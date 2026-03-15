import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { Plus, Users, X, Check, User, Baby, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { guestService, Guest } from '../../services/guestService';
import { tableService, Table } from '../../services/tableService';

export function TableArrangement() {
  const { activeEventId } = useAppContext();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<number | null>(null);
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [showEditTableModal, setShowEditTableModal] = useState(false);
  const [editingTable, setEditingTable] = useState<{ id: number; name: string; seats: number } | null>(null);
  const [newTable, setNewTable] = useState({ name: '', seats: 8 });
  const [filter, setFilter] = useState<'all' | 'available' | 'full'>('all');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Load guests and tables from backend
  useEffect(() => {
    const loadData = async () => {
      if (!activeEventId) {
        setGuests([]);
        setTables([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [guestsData, tablesData] = await Promise.all([
          guestService.getGuests(parseInt(activeEventId)),
          tableService.getTables(parseInt(activeEventId))
        ]);
        setGuests(guestsData);
        setTables(tablesData);
      } catch (error) {
        console.error('Failed to load data:', error);
        setGuests([]);
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeEventId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Auto-reunite family only when parent and children end up at the same table.
  useEffect(() => {
    const childrenGuests = guests.filter(g => g.is_children_only && g.parent_guest_id);
    
    childrenGuests.forEach(childGuest => {
      const parent = guests.find(g => g.id === childGuest.parent_guest_id);
      if (!parent) return;

      // Both at same table - reunite
      if (childGuest.table_id && childGuest.table_id === parent.table_id) {
        setTimeout(() => reuniteFamily(childGuest.id), 50);
        return;
      }
    });
  }, [guests.map(g => `${g.id}-${g.table_id}`).join(',')]);

  const unallocatedGuests = guests.filter(g => !g.table_id && g.status === 'confirmed');
  
  // Calculate total number of people (adults + children) in unallocated guests
  const unallocatedPeopleCount = unallocatedGuests.reduce((sum, guest) => {
    return sum + (guest.adults || 0) + (guest.children || 0);
  }, 0);

  const separateChildren = async (guestId: number) => {
    const guest = guests.find(g => g.id === guestId);
    if (!guest || guest.children === 0 || !activeEventId) return;

    try {
      // Create a new children-only guest entry
      const childrenGuest = await guestService.createGuest(parseInt(activeEventId), {
        name: guest.name,
        phone: guest.phone || undefined,
        status: guest.status,
        adults: 0,
        children: guest.children,
        notes: guest.notes || undefined,
        parent_guest_id: guestId,
        is_children_only: true,
      });

      // Update the original guest to have 0 children
      const updatedGuest = await guestService.updateGuest(guestId, { children: 0 });
      
      setGuests([
        ...guests.map(g => g.id === guestId ? updatedGuest : g),
        childrenGuest
      ]);

      // If parent was already allocated to a table, update table occupied seats
      if (guest.table_id) {
        const table = tables.find(t => t.id === guest.table_id);
        if (table) {
          const updatedTable = await tableService.updateTable(guest.table_id, {
            occupied_seats: Math.max(0, table.occupied_seats - guest.children)
          });
          setTables(tables.map(t => t.id === guest.table_id ? updatedTable : t));
        }
      }

      // Open modal to allocate children
      setTimeout(() => {
        setSelectedGuest(childrenGuest.id);
      }, 100);
    } catch (error) {
      console.error('Failed to separate children:', error);
      alert('Eroare la separarea copiilor');
    }
  };

  const reuniteFamily = async (childrenGuestId: number) => {
    const childrenGuest = guests.find(g => g.id === childrenGuestId);
    if (!childrenGuest || !childrenGuest.parent_guest_id) return;

    const parentGuest = guests.find(g => g.id === childrenGuest.parent_guest_id);
    if (!parentGuest) return;

    try {
      const parentTableId = parentGuest.table_id ?? null;
      const childrenTableId = childrenGuest.table_id ?? null;
      const childrenSeats = childrenGuest.children || 0;
      const sharedTableId =
        parentTableId && parentTableId === childrenTableId ? parentTableId : null;

      // Families stay where they reunite:
      // - same table => remain on that table
      // - both unallocated => remain unallocated
      const updatedParent = await guestService.updateGuest(childrenGuest.parent_guest_id, {
        children: (parentGuest.children || 0) + childrenSeats,
        table_id: sharedTableId,
      });

      // Delete the children-only guest
      await guestService.deleteGuest(childrenGuestId);
      setGuests(guests.map(g => 
        g.id === childrenGuest.parent_guest_id ? updatedParent : g
      ).filter(g => g.id !== childrenGuestId));
    } catch (error) {
      console.error('Failed to reunite family:', error);
      alert('Eroare la reunirea familiei');
    }
  };
  
  const allocateToTable = async (guestId: number, tableId: number) => {
    const guest = guests.find(g => g.id === guestId);
    const table = tables.find(t => t.id === tableId);
    
    if (!guest || !table) return;

    // Calculate correct attendees based on adults + children
    const guestAttendees = (guest.adults || 0) + (guest.children || 0);
    const availableSeats = table.total_seats - table.occupied_seats;

    if (availableSeats < guestAttendees) {
      alert(`Nu există suficiente locuri la această masă. Disponibile: ${availableSeats}, Necesare: ${guestAttendees}`);
      return;
    }

    try {
      // Use backend assign endpoint
      const updatedTable = await tableService.assignGuest(tableId, guestId);
      
      // Update local state
      setTables(tables.map(t => t.id === tableId ? updatedTable : t));
      setGuests(guests.map(g => g.id === guestId ? { ...g, table_id: tableId } : g));
      setSelectedGuest(null);
    } catch (error) {
      console.error('Failed to allocate guest to table:', error);
      alert('Eroare la alocarea invitatului la masă');
    }
  };

  const removeFromTable = async (guestId: number) => {
    const guest = guests.find(g => g.id === guestId);
    if (!guest || !guest.table_id) return;

    try {
      // Use backend unassign endpoint
      const updatedTable = await tableService.unassignGuest(guest.table_id, guestId);
      
      // Update local state
      setTables(tables.map(t => t.id === guest.table_id ? updatedTable : t));
      setGuests(guests.map(g => g.id === guestId ? { ...g, table_id: null } : g));

      // Check if we need to reunite family (both unallocated now)
      setTimeout(() => {
        const currentGuest = guests.find(g => g.id === guestId);
        if (!currentGuest) return;

        if (currentGuest.is_children_only && currentGuest.parent_guest_id) {
          // This is children - check if parent is also unallocated
          const parent = guests.find(g => g.id === currentGuest.parent_guest_id);
          if (parent && !parent.table_id) {
            reuniteFamily(guestId);
          }
        } else if (!currentGuest.is_children_only) {
          // This is parent - check if separated children are also unallocated
          const separatedChildren = guests.find(g => 
            g.is_children_only && g.parent_guest_id === guestId && !g.table_id
          );
          if (separatedChildren) {
            reuniteFamily(separatedChildren.id);
          }
        }
      }, 100);
    } catch (error) {
      console.error('Failed to remove guest from table:', error);
      alert('Eroare la eliminarea invitatului din masă');
    }
  };

  const addTable = async () => {
    if (!activeEventId) return;

    try {
      const table = await tableService.createTable(parseInt(activeEventId), {
        name: newTable.name || `MASA ${tables.length + 1}`,
        total_seats: newTable.seats,
      });
      setTables([...tables, table]);
      setShowAddTableModal(false);
      setNewTable({ name: '', seats: 8 });
    } catch (error) {
      console.error('Failed to add table:', error);
      alert('Eroare la adăugarea mesei');
    }
  };

  const editTable = async () => {
    if (!editingTable) return;

    try {
      const updatedTable = await tableService.updateTable(editingTable.id, {
        name: editingTable.name,
        total_seats: editingTable.seats,
      });
      setTables(tables.map(t => t.id === editingTable.id ? updatedTable : t));
      setShowEditTableModal(false);
      setEditingTable(null);
    } catch (error) {
      console.error('Failed to edit table:', error);
      alert('Eroare la editarea mesei');
    }
  };

  const deleteTable = async (tableId: number) => {
    try {
      // Remove guests from this table before deleting
      const guestsAtTable = guests.filter(g => g.table_id === tableId);
      for (const guest of guestsAtTable) {
        await guestService.updateGuest(guest.id, { table_id: null });
      }
      
      await tableService.deleteTable(tableId);
      
      setGuests(guests.map(g => g.table_id === tableId ? { ...g, table_id: null } : g));
      setTables(tables.filter(t => t.id !== tableId));
    } catch (error) {
      console.error('Failed to delete table:', error);
      alert('Eroare la ștergerea mesei');
    }
  };

  // Filter tables
  const filteredTables = tables.filter(t => {
    if (filter === 'available') return t.occupied_seats < t.total_seats;
    if (filter === 'full') return t.occupied_seats === t.total_seats;
    return true;
  });

  const availableTablesCount = tables.filter(t => t.occupied_seats < t.total_seats).length;
  const fullTablesCount = tables.filter(t => t.occupied_seats === t.total_seats).length;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title with 50px top spacing */}
      <div className="mb-8" style={{ marginTop: '50px' }}>
        <h2 className="text-[80px] leading-[80px] font-medium text-[#960010] uppercase tracking-[-2px] mb-2">
          ARANJARE MESE
        </h2>
        <p className="text-[16px] leading-[24px] text-[#6a7282] tracking-[-0.625px]">
          Organizează invitații confirmați la mese
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* LEFT: Unallocated Guests Card */}
        <div className="bg-white border border-[#e7e7e7] p-[25px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[43px] leading-[43px] text-[#960010] uppercase tracking-[-2.2126px]">
              INVITAȚI<br />NEALOCAȚI
            </h3>
            <div className="bg-[#fef2f2] h-[28px] px-3 rounded-full flex items-center justify-center">
              <p className="font-normal text-[14px] leading-[20px] text-[#960010] tracking-[-0.1504px]">
                {unallocatedPeopleCount}
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-[#f5f5f5] mb-4" />

          {/* Content */}
          {unallocatedGuests.length === 0 ? (
            <div className="h-[144px] flex flex-col items-center justify-center">
              <div className="bg-[#960010] w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.1504px]">
                Toți invitații sunt alocați
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {unallocatedGuests.map(guest => (
                <div
                  key={guest.id}
                  className="border border-[#e7e7e7] p-[13px]"
                >
                  <div className="flex items-center justify-between h-[43px]">
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-medium text-[14px] leading-[21px] text-[#101828] tracking-[-0.3008px] uppercase">
                        {guest.is_children_only 
                          ? `${guest.children}x Copii ai ${guest.name}` 
                          : guest.name
                        }
                      </p>
                      <div className="flex items-center gap-3 h-[18px]">
                        {(guest.adults || 0) > 0 && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-[#6a7282]" strokeWidth={1.33} />
                            <span className="font-normal text-[12px] leading-[18px] text-[#6a7282]">
                              {guest.adults}
                            </span>
                          </div>
                        )}
                        {(guest.children || 0) > 0 && !guest.is_children_only && (
                          <div 
                            className="flex items-center gap-1 cursor-pointer hover:bg-[#f3f4f6] px-1.5 py-0.5 rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              separateChildren(guest.id);
                            }}
                            title="Click pentru a separa copiii"
                          >
                            <Baby className="w-4 h-4 text-[#6a7282]" strokeWidth={1.33} />
                            <span className="font-normal text-[12px] leading-[18px] text-[#6a7282]">
                              {guest.children}
                            </span>
                          </div>
                        )}
                        {guest.is_children_only && (
                          <div className="flex items-center gap-1">
                            <Baby className="w-4 h-4 text-[#6a7282]" strokeWidth={1.33} />
                            <span className="font-normal text-[12px] leading-[18px] text-[#6a7282]">
                              {guest.children}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGuest(guest.id)}
                      className="bg-[#960010] hover:bg-[#7a000d] h-[30px] px-4 rounded-full text-white text-[12px] leading-[18px] transition-colors"
                    >
                      Alocă
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Tables Section */}
        <div className="bg-[#960010] p-[40px]">
          <div className="bg-white p-[32px]">
            {/* Header */}
            <div className="mb-6">
              <h3 className="font-medium text-[43px] leading-[43px] text-[#960010] uppercase tracking-[-2.2126px] mb-6">
                MESE ({tables.length})
              </h3>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`flex items-center gap-2 h-[44px] px-4 rounded-full transition-all cursor-pointer ${
                    filter === 'all'
                      ? 'bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]'
                      : 'bg-white text-[#364153] border border-[#e7e7e7] hover:border-[#960010] hover:bg-[#fef2f2]'
                  }`}
                >
                  <span className="font-normal text-[16px] leading-[24px] tracking-[-0.625px]">Toate</span>
                  <span className={`h-[20px] px-2 rounded-full text-[12px] leading-[16px] flex items-center justify-center ${
                    filter === 'all' ? 'bg-white/20 text-white' : 'bg-[#f3f4f6] text-[#4a5565]'
                  }`}>
                    {tables.length}
                  </span>
                </button>

                <button
                  onClick={() => setFilter('available')}
                  className={`flex items-center gap-2 h-[44px] px-4 rounded-full transition-all cursor-pointer ${
                    filter === 'available'
                      ? 'bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]'
                      : 'bg-white text-[#364153] border border-[#e7e7e7] hover:border-[#960010] hover:bg-[#fef2f2]'
                  }`}
                >
                  <span className="font-normal text-[16px] leading-[24px] tracking-[-0.625px]">Disponibile</span>
                  <span className={`h-[20px] px-2 rounded-full text-[12px] leading-[16px] flex items-center justify-center ${
                    filter === 'available' ? 'bg-white/20 text-white' : 'bg-[#f3f4f6] text-[#4a5565]'
                  }`}>
                    {availableTablesCount}
                  </span>
                </button>

                <button
                  onClick={() => setFilter('full')}
                  className={`flex items-center gap-2 h-[44px] px-4 rounded-full transition-all cursor-pointer ${
                    filter === 'full'
                      ? 'bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]'
                      : 'bg-white text-[#364153] border border-[#e7e7e7] hover:border-[#960010] hover:bg-[#fef2f2]'
                  }`}
                >
                  <span className="font-normal text-[16px] leading-[24px] tracking-[-0.625px]">Finalizate</span>
                  <span className={`h-[20px] px-2 rounded-full text-[12px] leading-[16px] flex items-center justify-center ${
                    filter === 'full' ? 'bg-white/20 text-white' : 'bg-[#f3f4f6] text-[#4a5565]'
                  }`}>
                    {fullTablesCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTables.map(table => {
                const tableGuests = guests.filter(g => g.table_id === table.id);
                const availableSeats = table.total_seats - table.occupied_seats;
                const isAvailable = availableSeats > 0;

                return (
                  <div
                    key={table.id}
                    className="bg-white border border-[#e7e7e7] p-[25px] relative"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[24px] leading-[32px] text-[#101828] tracking-[-0.4395px] uppercase mb-1.5">
                          {table.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#4a5565]" />
                          <span className="font-normal text-[14px] leading-[20px] text-[#4a5565] tracking-[-0.1504px]">
                            {table.occupied_seats} / {table.total_seats} locuri
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-[19px] px-2 rounded-full flex items-center ${
                          isAvailable ? 'bg-[#f0fdf4]' : 'bg-red-50'
                        }`}>
                          <span className={`font-semibold text-[10px] leading-[15px] tracking-[0.1172px] uppercase ${
                            isAvailable ? 'text-[#008236]' : 'text-red-700'
                          }`}>
                            {isAvailable ? 'DISPONIBILĂ' : 'COMPLETĂ'}
                          </span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === table.id ? null : table.id);
                            }}
                            className="p-1 text-[#99a1af] hover:text-[#960010] transition-colors"
                            title="Opțiuni"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openDropdown === table.id && (
                            <div className="absolute right-0 top-8 bg-white border border-[#e7e7e7] shadow-lg z-20 min-w-[140px]">
                              <button
                                onClick={() => {
                                  setEditingTable({ id: table.id, name: table.name, seats: table.total_seats });
                                  setShowEditTableModal(true);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-[14px] text-[#364153] hover:bg-[#f3f4f6] transition-colors"
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Editează
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Ești sigur că vrei să ștergi această masă?')) {
                                    deleteTable(table.id);
                                  }
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-[14px] text-[#960010] hover:bg-[#f3f4f6] transition-colors border-t border-[#f5f5f5]"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Șterge
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="bg-[#f3f4f6] h-2 rounded-full mb-4">
                      <div
                        className="bg-black h-2 rounded-full transition-all"
                        style={{ width: `${(table.occupied_seats / table.total_seats) * 100}%` }}
                      />
                    </div>

                    {/* Guests List */}
                    <div>
                      <p className="font-normal text-[14px] leading-[20px] text-[#4a5565] tracking-[-0.1504px] mb-2">
                        Invitați alocați:
                      </p>
                      {tableGuests.length > 0 ? (
                        <div className="space-y-2">
                          {tableGuests.map(guest => {
                            const isDeclined = guest.status === 'declined';
                            const isPending = guest.status === 'pending';
                            const isInvalid = isDeclined || isPending;
                            return (
                              <div
                                key={guest.id}
                                onClick={() => setSelectedGuest(guest.id)}
                                className={`relative border p-3 cursor-pointer transition-colors ${
                                  isInvalid 
                                    ? 'border-[#e7e7e7] bg-gray-100 opacity-50' 
                                    : 'border-[#e7e7e7] hover:bg-[#f9fafb]'
                                }`}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromTable(guest.id);
                                  }}
                                  className={`absolute top-2 right-2 p-1 transition-colors z-10 ${
                                    isInvalid
                                      ? 'text-[#960010] hover:text-[#7a000d]'
                                      : 'text-[#99a1af] hover:text-[#960010]'
                                  }`}
                                  title={isInvalid ? "Status invalid - elimină din masă" : "Elimină din masă"}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                                
                                {isDeclined && (
                                  <div className="absolute top-2 left-2 bg-red-100 text-red-700 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase z-10">
                                    REFUZAT
                                  </div>
                                )}
                                
                                {isPending && (
                                  <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-700 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase z-10">
                                    ÎN AȘTEPTARE
                                  </div>
                                )}
                                
                                <p className={`font-medium text-[14px] leading-[20px] tracking-[-0.1504px] uppercase mb-2 pr-6 ${
                                  isInvalid ? 'text-gray-500' : 'text-[#101828]'
                                } ${isInvalid ? 'pl-24' : ''}`}>
                                  {guest.is_children_only 
                                    ? `${guest.children}x Copii ai ${guest.name}` 
                                    : guest.name
                                  }
                                </p>
                                <div className="flex items-center gap-3">
                                  {(guest.adults || 0) > 0 && (
                                    <div className="flex items-center gap-1">
                                      <User className={`w-4 h-4 ${isInvalid ? 'text-gray-400' : 'text-[#4a5565]'}`} strokeWidth={1.33} />
                                      <span className={`text-[12px] ${isInvalid ? 'text-gray-400' : 'text-[#4a5565]'}`}>{guest.adults}</span>
                                    </div>
                                  )}
                                  {(guest.children || 0) > 0 && !guest.is_children_only && (
                                    <div
                                      className="flex items-center gap-1 cursor-pointer hover:bg-[#f3f4f6] px-1.5 py-0.5 rounded transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        separateChildren(guest.id);
                                      }}
                                      title="Click pentru a separa copiii"
                                    >
                                      <Baby className="w-4 h-4 text-[#4a5565]" strokeWidth={1.33} />
                                      <span className="text-[12px] text-[#4a5565]">{guest.children}</span>
                                    </div>
                                  )}
                                  {guest.is_children_only && (
                                    <div className="flex items-center gap-1">
                                      <Baby className="w-4 h-4 text-[#4a5565]" strokeWidth={1.33} />
                                      <span className="text-[12px] text-[#4a5565]">{guest.children}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[14px] text-[#6a7282] text-center py-4">
                          Niciun invitat alocat
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {tables.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#6a7282]" />
                </div>
                <p className="text-[16px] text-[#101828] tracking-[-0.3125px] mb-2">Nu există mese încă</p>
                <p className="text-[14px] text-[#6a7282] tracking-[-0.1504px]">Adaugă mese pentru a putea aloca invitații</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddTableModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#960010] hover:bg-[#7a000d] rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40"
        title="Adaugă masă"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Table Selection Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] font-semibold text-[#101828] tracking-[-0.6006px]">Selectează masa</h3>
              <button
                onClick={() => setSelectedGuest(null)}
                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-6">
              Invitat: <span className="font-medium text-[#101828]">
                {(() => {
                  const guest = guests.find(g => g.id === selectedGuest);
                  if (!guest) return '';
                  return guest.is_children_only 
                    ? `${guest.children}x Copii ai ${guest.name}` 
                    : guest.name;
                })()}
              </span>
            </p>
            
            <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
              {tables.map(table => {
                const guest = guests.find(g => g.id === selectedGuest);
                const guestAttendees = guest ? (guest.adults || 0) + (guest.children || 0) : 0;
                const availableSeats = table.total_seats - table.occupied_seats;
                const canAllocate = availableSeats >= guestAttendees;

                return (
                  <button
                    key={table.id}
                    onClick={() => canAllocate && allocateToTable(selectedGuest!, table.id)}
                    disabled={!canAllocate}
                    className={`w-full p-4 border-2 text-left transition-all ${
                      canAllocate
                        ? 'border-[#e5e7eb] hover:border-[#960010] hover:bg-[#f9fafb] cursor-pointer'
                        : 'border-[#e5e7eb] bg-[#f9fafb] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[14px] text-[#101828] tracking-[-0.1504px]">{table.name}</p>
                        <p className="text-[12px] text-[#6a7282] tracking-[-0.1504px]">
                          {table.occupied_seats} / {table.total_seats} locuri ocupate
                        </p>
                      </div>
                      {canAllocate ? (
                        <span className="text-[12px] text-green-600 font-semibold">
                          {availableSeats} libere
                        </span>
                      ) : (
                        <span className="text-[12px] text-red-600 font-semibold">
                          Insuficiente
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedGuest(null)}
              className="w-full bg-white hover:bg-[#f3f4f6] text-[#364153] border border-[#e5e7eb] py-3 rounded-full transition-all"
            >
              Anulează
            </button>
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {showAddTableModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] font-semibold text-[#101828] tracking-[-0.6006px]">Adaugă masă nouă</h3>
              <button
                onClick={() => setShowAddTableModal(false)}
                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Nume masă</label>
                <input
                  type="text"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  placeholder={`MASA ${tables.length + 1}`}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Număr locuri</label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={newTable.seats}
                  onChange={(e) => setNewTable({ ...newTable, seats: parseInt(e.target.value) || 8 })}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={addTable}
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all"
              >
                Adaugă
              </button>
              <button
                onClick={() => setShowAddTableModal(false)}
                className="flex-1 bg-white hover:bg-[#f3f4f6] text-[#364153] border border-[#e5e7eb] py-3 rounded-full transition-all"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {showEditTableModal && editingTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] font-semibold text-[#101828] tracking-[-0.6006px]">Editează masă</h3>
              <button
                onClick={() => setShowEditTableModal(false)}
                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Nume masă</label>
                <input
                  type="text"
                  value={editingTable.name}
                  onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Număr locuri</label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={editingTable.seats}
                  onChange={(e) => setEditingTable({ ...editingTable, seats: parseInt(e.target.value) || 8 })}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={editTable}
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all"
              >
                Salvează
              </button>
              <button
                onClick={() => setShowEditTableModal(false)}
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
