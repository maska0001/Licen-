import { useState, useEffect } from 'react';
import { guestService, Guest } from '../services';

export function useGuests(eventId: number | null) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      fetchGuests();
    }
  }, [eventId]);

  const fetchGuests = async () => {
    if (!eventId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await guestService.getGuests(eventId);
      setGuests(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch guests');
    } finally {
      setLoading(false);
    }
  };

  const createGuest = async (guestData: any) => {
    if (!eventId) throw new Error('No event selected');
    
    try {
      const newGuest = await guestService.createGuest(eventId, guestData);
      setGuests([...guests, newGuest]);
      return newGuest;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create guest');
      throw err;
    }
  };

  const updateGuest = async (guestId: number, guestData: any) => {
    try {
      const updated = await guestService.updateGuest(guestId, guestData);
      setGuests(guests.map(g => g.id === guestId ? updated : g));
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update guest');
      throw err;
    }
  };

  const deleteGuest = async (guestId: number) => {
    try {
      await guestService.deleteGuest(guestId);
      setGuests(guests.filter(g => g.id !== guestId));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete guest');
      throw err;
    }
  };

  return {
    guests,
    loading,
    error,
    fetchGuests,
    createGuest,
    updateGuest,
    deleteGuest,
  };
}
