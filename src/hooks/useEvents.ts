import { useState, useEffect } from 'react';
import { eventService, Event } from '../services';

/**
 * Custom hook pentru management evenimente cu API
 * Înlocuiește localStorage cu API calls
 */
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events la mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents([...events, newEvent]);
      return newEvent;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create event');
      throw err;
    }
  };

  const updateEvent = async (id: number, eventData: any) => {
    try {
      const updated = await eventService.updateEvent(id, eventData);
      setEvents(events.map(e => e.id === id ? updated : e));
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update event');
      throw err;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete event');
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
