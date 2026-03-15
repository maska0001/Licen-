import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../App';
import { Plus, Mail, Phone, Copy, Check, X, Users, UserCheck, UserX, Clock, Edit2, ExternalLink, ChevronDown } from 'lucide-react';
import { guestService, Guest, RsvpStatus } from '../../services/guestService';

export function GuestList() {
  const { activeEventId, setGuests: setAppGuests } = useAppContext();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'declined'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingGuest, setEditingGuest] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    status: 'pending' as RsvpStatus,
    adults: 1,
    children: 0,
    notes: '',
  });

  const loadGuests = useCallback(async (showLoader = false) => {
    if (!activeEventId) {
      setGuests([]);
      setAppGuests([]);
      setLoading(false);
      return;
    }

    try {
      if (showLoader) {
        setLoading(true);
      }
      const guestsData = await guestService.getGuests(parseInt(activeEventId));
      setGuests(guestsData);
      setAppGuests(guestsData);
    } catch (error) {
      console.error('Failed to load guests:', error);
      setGuests([]);
      setAppGuests([]);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, [activeEventId, setAppGuests]);

  // Load guests from backend
  useEffect(() => {
    void loadGuests(true);
  }, [loadGuests]);

  // Keep guest responses fresh without manual page refresh
  useEffect(() => {
    if (!activeEventId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadGuests(false);
    }, 5000);

    const handleFocus = () => {
      void loadGuests(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadGuests(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeEventId, loadGuests]);

  const addGuest = async () => {
    if (!activeEventId || !newGuest.name) return;

    try {
      const createdGuest = await guestService.createGuest(parseInt(activeEventId), {
        name: newGuest.name,
        phone: newGuest.phone || undefined,
        status: newGuest.status,
        adults: newGuest.adults,
        children: newGuest.children,
        notes: newGuest.notes || undefined,
      });
      setGuests([...guests, createdGuest]);
      setShowAddModal(false);
      setNewGuest({ name: '', phone: '', status: 'pending', adults: 1, children: 0, notes: '' });
    } catch (error) {
      console.error('Failed to add guest:', error);
      alert('Eroare la adăugarea invitatului');
    }
  };

  const removeGuest = async (id: number) => {
    try {
      await guestService.deleteGuest(id);
      setGuests(guests.filter(g => g.id !== id));
    } catch (error) {
      console.error('Failed to remove guest:', error);
      alert('Eroare la ștergerea invitatului');
    }
  };

  const updateGuestStatus = async (guestId: number, status: RsvpStatus) => {
    try {
      const updatedGuest = await guestService.updateGuest(guestId, { status });
      setGuests(guests.map(g => g.id === guestId ? updatedGuest : g));
    } catch (error) {
      console.error('Failed to update guest status:', error);
      alert('Eroare la actualizarea statusului');
    }
  };

  const updateGuestNotes = async (guestId: number, notes: string) => {
    try {
      const updatedGuest = await guestService.updateGuest(guestId, { notes });
      setGuests(guests.map(g => g.id === guestId ? updatedGuest : g));
    } catch (error) {
      console.error('Failed to update guest notes:', error);
      alert('Eroare la actualizarea notițelor');
    }
  };

  const startEditGuest = (guest: Guest) => {
    setEditingGuest(guest.id);
    setEditNotes(guest.notes || '');
  };

  const saveEditGuest = () => {
    if (editingGuest) {
      updateGuestNotes(editingGuest, editNotes);
      setEditingGuest(null);
      setEditNotes('');
    }
  };

  const buildRsvpLink = (guest: Guest) => {
    if (!guest.rsvp_token) {
      return null;
    }
    return `${window.location.origin}/?landing=${guest.rsvp_token}`;
  };

  const copyRSVPLink = (guest: Guest) => {
    const link = buildRsvpLink(guest);
    if (!link) {
      alert('Linkul RSVP nu este disponibil încă pentru acest invitat.');
      return;
    }
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openRSVPLink = (guest: Guest) => {
    const link = buildRsvpLink(guest);
    if (!link) {
      alert('Linkul RSVP nu este disponibil încă pentru acest invitat.');
      return;
    }
    window.open(link, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 text-green-700';
      case 'pending': return 'bg-amber-50 text-amber-700';
      case 'declined': return 'bg-red-50 text-red-700';
      default: return 'bg-[#f3f4f6] text-[#4a5565]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'CONFIRMAT';
      case 'pending': return 'ÎN AȘTEPTARE';
      case 'declined': return 'REFUZAT';
      default: return status;
    }
  };

  const getGuestPeopleCount = (guest: Guest) =>
    Math.max(0, (guest.adults || 0) + (guest.children || 0));

  // Stats count real invited people, not guest rows.
  const totalInvitedPeople = guests.reduce((sum, guest) => sum + getGuestPeopleCount(guest), 0);
  const confirmedGuests = guests
    .filter(g => g.status === 'confirmed')
    .reduce((sum, guest) => sum + getGuestPeopleCount(guest), 0);
  const pendingGuests = guests
    .filter(g => g.status === 'pending')
    .reduce((sum, guest) => sum + getGuestPeopleCount(guest), 0);
  const declinedGuests = guests
    .filter(g => g.status === 'declined')
    .reduce((sum, guest) => sum + getGuestPeopleCount(guest), 0);

  // Filter guests
  const filteredGuests = guests.filter(g => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title with 50px top spacing */}
      <div className="mb-8" style={{ marginTop: '50px' }}>
        <h2 className="text-[80px] leading-[1] font-medium text-[#960010] uppercase tracking-[-2px] mb-2">
          LISTĂ INVITAȚI
        </h2>
        <p className="text-[16px] text-[#6a7282] tracking-[-0.3125px]">
          Gestionează lista de invitați și confirmările RSVP
        </p>
      </div>

      {/* Summary Cards - EXACT ca în Figma: container roșu + container alb */}
      <div className="bg-[#960010] p-[40px] mb-8">
        <div className="bg-white p-[20px]">
          <div className="mb-[32px]">
            <h3 className="font-medium text-[43px] leading-none text-[#960010] uppercase tracking-[-2.58px]">
              Statistici invitați
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] h-[128px]">
            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Total invitați</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">{totalInvitedPeople}</p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Confirmați</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">{confirmedGuests}</p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">În așteptare</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">{pendingGuests}</p>
            </div>

            <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] pt-[25px] px-[25px] pb-px flex flex-col gap-[8px]">
              <h3 className="font-normal text-[14px] leading-[20px] text-[#6a7282] tracking-[-0.3008px]">Refuzați</h3>
              <p className="font-semibold text-[30px] leading-[38px] text-[#101828] tracking-[-0.2051px]">{declinedGuests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e5e7eb] p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                  : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
              }`}
            >
              <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">Toți</span>
              <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                filter === 'all'
                  ? 'bg-[rgba(255,255,255,0.2)] text-white'
                  : 'bg-[#f3f4f6] text-[#4a5565]'
              }`}>
                {totalInvitedPeople}
              </span>
            </button>
            
            <button
              onClick={() => setFilter('confirmed')}
              className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                filter === 'confirmed'
                  ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                  : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
              }`}
            >
              <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">Confirmați</span>
              <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                filter === 'confirmed'
                  ? 'bg-[rgba(255,255,255,0.2)] text-white'
                  : 'bg-[#f3f4f6] text-[#4a5565]'
              }`}>
                {confirmedGuests}
              </span>
            </button>
            
            <button
              onClick={() => setFilter('pending')}
              className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                filter === 'pending'
                  ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                  : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
              }`}
            >
              <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">În așteptare</span>
              <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                filter === 'pending'
                  ? 'bg-[rgba(255,255,255,0.2)] text-white'
                  : 'bg-[#f3f4f6] text-[#4a5565]'
              }`}>
                {pendingGuests}
              </span>
            </button>
            
            <button
              onClick={() => setFilter('declined')}
              className={`h-[40px] flex items-center gap-[8px] rounded-full transition-all cursor-pointer ${
                filter === 'declined'
                  ? 'bg-[#960010] text-white px-[16px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                  : 'border border-[#e7e7e7] text-[#364153] px-[17px] hover:border-[#960010] hover:bg-[#fef2f2]'
              }`}
            >
              <span className="font-normal text-[16px] leading-[24px] tracking-[-0.3125px]">Refuzați</span>
              <span className={`h-[20px] px-[8px] flex items-center justify-center rounded-full text-[12px] font-normal leading-[16px] ${
                filter === 'declined'
                  ? 'bg-[rgba(255,255,255,0.2)] text-white'
                  : 'bg-[#f3f4f6] text-[#4a5565]'
              }`}>
                {declinedGuests}
              </span>
            </button>
          </div>
        </div>

        {filteredGuests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#6a7282]" />
            </div>
            <p className="text-[16px] text-[#101828] tracking-[-0.3125px] mb-2">Nu există invitați{filter !== 'all' ? ' în această categorie' : ''}</p>
            <p className="text-[14px] text-[#6a7282] tracking-[-0.1504px]">Adaugă primul invitat pentru a începe</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Nume</th>
                  <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Telefon</th>
                  <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Răspuns</th>
                  <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Adulți</th>
                  <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Copii</th>
                  <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Link personal</th>
                  <th className="text-left py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Notițe</th>
                  <th className="text-center py-4 px-4 text-[14px] text-[#6a7282] font-medium tracking-[-0.1504px]">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map(guest => (
                  <tr key={guest.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-[14px] text-[#101828] tracking-[-0.1504px]">{guest.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[14px] text-[#101828] tracking-[-0.1504px]">{guest.phone || '-'}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {editingGuest === guest.id ? (
                        <select
                          value={guest.status}
                          onChange={(e) => updateGuestStatus(guest.id, e.target.value as RsvpStatus)}
                          className="text-[12px] px-4 py-2 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                          autoFocus
                        >
                          <option value="pending">În așteptare</option>
                          <option value="confirmed">Confirmat</option>
                          <option value="declined">Refuzat</option>
                        </select>
                      ) : (
                        <button
                          onClick={() => setEditingGuest(guest.id)}
                          className={`inline-block text-[10px] px-[8px] py-[2.5px] h-[19px] rounded-full uppercase font-semibold transition-opacity hover:opacity-80 ${getStatusColor(guest.status)}`}
                        >
                          {getStatusText(guest.status)}
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]">{guest.adults || 0}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-[14px] text-[#101828] tracking-[-0.1504px]">{guest.children || 0}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyRSVPLink(guest)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#960010]/5 text-[#960010] rounded-lg hover:bg-[#960010]/10 transition-colors border border-[#960010]/20"
                          title="Copiază linkul personal"
                        >
                          {copiedId === guest.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copiat!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiază</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => openRSVPLink(guest)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#101828]/5 text-[#101828] rounded-lg hover:bg-[#101828]/10 transition-colors border border-[#101828]/20"
                          title="Deschide linkul"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Deschide</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {editingGuest === guest.id ? (
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Adaugă notițe..."
                          className="w-full px-3 py-1.5 border border-[#960010] rounded text-[14px] text-[#101828] tracking-[-0.1504px] focus:outline-none"
                        />
                      ) : (
                        <span className="text-[14px] text-[#101828] tracking-[-0.1504px] max-w-xs truncate block">{guest.notes || '-'}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {editingGuest === guest.id ? (
                          <button
                            onClick={saveEditGuest}
                            className="w-[32px] h-[32px] text-[#99A1AF] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-[16px] transition-all flex items-center justify-center"
                            title="Salvează"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditGuest(guest)}
                            className="w-[32px] h-[32px] text-[#99A1AF] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-[16px] transition-all flex items-center justify-center"
                            title="Editează"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => removeGuest(guest.id)}
                          className="w-[32px] h-[32px] text-[#99A1AF] hover:text-[#960010] hover:bg-[#f3f4f6] rounded-[16px] transition-all flex items-center justify-center"
                          title="Șterge"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#960010] hover:bg-[#7a000d] rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40"
        title="Adaugă invitat"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] font-semibold text-[#101828] tracking-[-0.6006px]">Adaugă invitat nou</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-[#6a7282] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Nume complet *</label>
                <input
                  type="text"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Ion Popescu"
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

                  <div>
                    <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Telefon</label>
                    <input
                      type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="0721234567"
                      className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Status</label>
                    <div className="relative">
                      <select
                        value={newGuest.status}
                        onChange={(e) =>
                          setNewGuest({
                            ...newGuest,
                            status: e.target.value as RsvpStatus,
                          })
                        }
                        className="w-full appearance-none px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none bg-white text-[#101828]"
                      >
                        <option value="pending">În așteptare</option>
                        <option value="confirmed">Confirmat</option>
                        <option value="declined">Refuzat</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#6a7282] absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Câți adulți veți fi *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newGuest.adults}
                  onChange={(e) => setNewGuest({ ...newGuest, adults: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Câți copii veți fi</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={newGuest.children}
                  onChange={(e) => setNewGuest({ ...newGuest, children: parseInt(e.target.value) || 0 })}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] text-[#6a7282] tracking-[-0.1504px] mb-2">Notițe speciale</label>
                <textarea
                  value={newGuest.notes}
                  onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                  placeholder="Alergii, preferințe, etc."
                  rows={3}
                  className="w-full px-6 py-3 border border-[#e5e7eb] rounded-2xl focus:border-[#960010] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={addGuest}
                disabled={!newGuest.name || newGuest.adults < 1}
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
