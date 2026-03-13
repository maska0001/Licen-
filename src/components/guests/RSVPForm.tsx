import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { Check, Users, Baby, Heart } from 'lucide-react';
import { eventService, Event } from '../../services/eventService';

export function RSVPForm() {
  const { guests, setGuests, rsvpGuestId, activeEventId } = useAppContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const guest = guests.find(g => g.id === rsvpGuestId);

  // Load event data from eventService
  useEffect(() => {
    const loadEventData = async () => {
      if (!activeEventId) {
        setEvent(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await eventService.getEvent(parseInt(activeEventId));
        setEvent(eventData);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [activeEventId]);
  
  const [formData, setFormData] = useState({
    attending: '',
    attendees: 1,
    withPartner: false,
    withChildren: false,
    childrenCount: 0,
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-2xl mb-4">Se încarcă...</div>
        </div>
      </div>
    );
  }

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">Link invalid</h2>
          <p className="text-gray-600">Nu am găsit invitația ta. Verifică link-ul primit.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalAttendees = formData.withPartner ? 2 : 1;
    
    setGuests(guests.map(g =>
      g.id === rsvpGuestId
        ? {
            ...g,
            rsvpStatus: formData.attending === 'yes' ? 'confirmed' : 'declined',
            attendees: formData.attending === 'yes' ? totalAttendees : 0,
            withPartner: formData.withPartner,
            withChildren: formData.withChildren,
            notes: formData.notes,
          }
        : g
    ));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">Mulțumim!</h2>
          <p className="text-gray-600 mb-6">
            {formData.attending === 'yes'
              ? 'Confirmarea ta a fost înregistrată. Ne vedem la eveniment!'
              : 'Răspunsul tău a fost înregistrat. Ne pare rău că nu poți participa.'}
          </p>
          <div className="text-sm text-gray-500">
            Poți închide această pagină.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h1 className="text-3xl text-purple-600 mb-2">{event?.event_type || 'Eveniment Special'}</h1>
          {event && (
            <p className="text-gray-600">
              {new Date(event.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })} • {event.city}
            </p>
          )}
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <p className="text-lg text-gray-900 mb-2">Bună, {guest.name}!</p>
          <p className="text-gray-600">Te rugăm să confirmi participarea la evenimentul nostru.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-900 mb-3">Vei participa la eveniment? *</label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  formData.attending === 'yes'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.attending === 'yes'
                    ? 'border-green-600 bg-green-600'
                    : 'border-gray-300'
                }`}>
                  {formData.attending === 'yes' && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className="text-gray-900">Da, particip cu plăcere!</p>
                  <p className="text-sm text-gray-500">Confirmă prezența</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'no', withPartner: false, withChildren: false })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  formData.attending === 'no'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.attending === 'no'
                    ? 'border-red-600 bg-red-600'
                    : 'border-gray-300'
                }`}>
                  {formData.attending === 'no' && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className="text-gray-900">Nu, din păcate nu pot participa</p>
                  <p className="text-sm text-gray-500">Refuză invitația</p>
                </div>
              </button>
            </div>
          </div>

          {formData.attending === 'yes' && (
            <>
              <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-gray-900 mb-4">Detalii participare</h3>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.withPartner}
                    onChange={(e) => setFormData({ ...formData, withPartner: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-900">Vin cu partenerul/partenera</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.withChildren}
                    onChange={(e) => setFormData({ ...formData, withChildren: e.target.checked, childrenCount: e.target.checked ? 1 : 0 })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <Baby className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-900">Am copii cu mine</span>
                  </div>
                </label>

                {formData.withChildren && (
                  <div className="ml-8">
                    <label className="block text-sm text-gray-700 mb-2">Câți copii?</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.childrenCount}
                      onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 1 })}
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>
                      Total persoane: {formData.withPartner ? 2 : 1}
                      {formData.withChildren && ` + ${formData.childrenCount} copii`}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-900 mb-2">Notițe speciale (opțional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Alergii alimentare, preferințe pentru meniu, sau alte mențiuni..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!formData.attending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Trimite confirmarea
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          Powered by EventPro
        </div>
      </div>
    </div>
  );
}
