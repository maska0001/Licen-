import { useState, useEffect } from 'react';
import { eventService, Event } from '../services';

/**
 * Example: Event List Component with API Integration
 * 
 * This replaces localStorage with API calls
 */

export function EventListExample() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Fetch events on component mount
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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      setCreating(true);
      const newEvent = await eventService.createEvent({
        title: 'New Event',
        date: '2026-12-31',
        city: 'New York',
        guest_count: 50
      });
      setEvents([...events, newEvent]);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to create event');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure?')) return;

    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete event');
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchEvents}>Retry</button>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="header">
        <h2>My Events</h2>
        <button onClick={handleCreateEvent} disabled={creating}>
          {creating ? 'Creating...' : 'Create Event'}
        </button>
      </div>

      {events.length === 0 ? (
        <p>No events yet. Create your first event!</p>
      ) : (
        <div className="events">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>City: {event.city || 'Not specified'}</p>
              <p>Guests: {event.guest_count}</p>
              <button onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
