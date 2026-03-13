import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { Calendar, MapPin, Clock, Heart, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import polubviLogo from 'figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png';

interface LandingContent {
  published: boolean;
  coverImage: string;
  galleryImages: string[];
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  locationAddress: string;
  message: string;
  dressCode: string;
  schedule: { time: string; activity: string }[];
  colorPrimary: string;
  colorSecondary: string;
}

export function PublicLanding() {
  const { guests, setGuests } = useAppContext();
  const [content, setContent] = useState<LandingContent | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [guest, setGuest] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    adults: 1,
    children: 0,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Load landing content
    const saved = localStorage.getItem('landingContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        if (!parsed.published) {
          // Landing is not published
          return;
        }
        
        // Validate and set content with defaults
        const landingData = {
          published: parsed.published || false,
          coverImage: parsed.coverImage || '',
          galleryImages: Array.isArray(parsed.galleryImages) ? parsed.galleryImages : [],
          title: parsed.title || 'Evenimentul nostru',
          subtitle: parsed.subtitle || 'Vă invităm să sărbătorim împreună',
          date: parsed.date || '',
          time: parsed.time || '18:00',
          location: parsed.location || '',
          locationAddress: parsed.locationAddress || '',
          message: parsed.message || '',
          dressCode: parsed.dressCode || '',
          schedule: Array.isArray(parsed.schedule) ? parsed.schedule : [],
          colorPrimary: parsed.colorPrimary || '#9333ea',
          colorSecondary: parsed.colorSecondary || '#ec4899'
        };
        
        setContent(landingData);
      } catch (e) {
        console.error('Error parsing landing content:', e);
      }
    }

    // Get guest ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('landing');
    if (id && id !== 'view') {
      setGuestId(id);
      // Find guest
      const foundGuest = guests.find(g => g.id === id);
      if (foundGuest) {
        setGuest(foundGuest);
        setFormData({
          name: foundGuest.name,
          phone: foundGuest.phone || '',
          adults: foundGuest.attendees || 1,
          children: foundGuest.children || 0,
          message: foundGuest.notes || ''
        });
        // Check if already submitted
        if (foundGuest.rsvpStatus !== 'pending') {
          setSubmitted(true);
        }
      }
    }
  }, [guests]);

  const handleSubmit = (status: 'confirmed' | 'declined') => {
    if (!guestId) {
      // No guest ID - new guest
      const newGuest = {
        id: `guest-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        rsvpStatus: status,
        attendees: status === 'confirmed' ? formData.adults : 0,
        children: status === 'confirmed' ? formData.children : 0,
        notes: formData.message
      };
      setGuests([...guests, newGuest]);
    } else {
      // Update existing guest
      const updatedGuests = guests.map(g => {
        if (g.id === guestId) {
          return {
            ...g,
            name: formData.name,
            phone: formData.phone,
            rsvpStatus: status,
            attendees: status === 'confirmed' ? formData.adults : 0,
            children: status === 'confirmed' ? formData.children : 0,
            notes: formData.message
          };
        }
        return g;
      });
      setGuests(updatedGuests);
    }
    
    setSubmitted(true);
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-purple-100 max-w-md">
          <img src={polubviLogo} alt="POLUBVI" className="h-12 mx-auto mb-6" />
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-3">Landing-ul nu este disponibil</h2>
          <p className="text-gray-600 mb-2">Organizatorul evenimentului încă nu a publicat invitația digitală.</p>
          <p className="text-sm text-gray-500">Te rugăm să revii mai târziu sau să contactezi organizatorul.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Cover Image */}
      {content.coverImage && (
        <div className="relative h-screen">
          <ImageWithFallback
            src={content.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)`
            }}
          >
            <div className="text-center text-white px-4 max-w-4xl">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <Heart className="w-10 h-10" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl mb-6" style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.3)' 
              }}>
                {content.title}
              </h1>
              <p className="text-2xl md:text-3xl opacity-95 mb-12" style={{ 
                textShadow: '0 2px 12px rgba(0,0,0,0.3)' 
              }}>
                {content.subtitle}
              </p>
              <div className="inline-block bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl px-8 py-6">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <span>{formatDate(content.date)}</span>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-white/30"></div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    <span>{content.time}</span>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-white/30"></div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    <span>{content.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Welcome Message */}
        {content.message && (
          <div className="text-center mb-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-3xl text-gray-800 leading-relaxed">
                {content.message}
              </p>
            </div>
          </div>
        )}

        {/* Event Details Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div 
            className="rounded-2xl p-8 border-2 hover:shadow-lg transition-shadow"
            style={{
              background: `linear-gradient(135deg, ${content.colorPrimary}10 0%, ${content.colorSecondary}10 100%)`,
              borderColor: `${content.colorPrimary}30`
            }}
          >
            <h3 className="text-xl text-gray-900 mb-2 flex items-center gap-2">
              <span>📍</span>
              Locația
            </h3>
            <p className="text-gray-700 mb-1">{content.location}</p>
            {content.locationAddress && (
              <p className="text-gray-600 text-sm">{content.locationAddress}</p>
            )}
          </div>

          {content.dressCode && (
            <div 
              className="rounded-2xl p-8 border-2 hover:shadow-lg transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${content.colorPrimary}10 0%, ${content.colorSecondary}10 100%)`,
                borderColor: `${content.colorSecondary}30`
              }}
            >
              <h3 className="text-xl text-gray-900 mb-2 flex items-center gap-2">
                <span>🎭</span>
                Dress Code
              </h3>
              <p className="text-gray-700">{content.dressCode}</p>
            </div>
          )}
        </div>

        {/* Schedule */}
        {content.schedule.length > 0 && (
          <div className="mb-20">
            <h3 className="text-4xl text-gray-900 text-center mb-12">Program</h3>
            <div className="max-w-2xl mx-auto space-y-3">
              {content.schedule.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div 
                      className="text-xl font-semibold flex-shrink-0 w-16 text-center"
                      style={{ color: content.colorPrimary }}
                    >
                      {item.time}
                    </div>
                    <div className="flex-1 text-gray-700">
                      {item.activity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {content.galleryImages.length > 0 && (
          <div className="mb-20">
            <h3 className="text-4xl text-gray-900 text-center mb-12">Galerie</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {content.galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-all hover:scale-105"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP Form */}
        <div className="mb-20">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <h3 className="text-4xl text-gray-900 text-center mb-3">
              Confirmă prezența
            </h3>
            <p className="text-center text-gray-600 mb-10">
              Te rugăm să completezi formularul de mai jos
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${content.colorPrimary}15` }}>
                  <CheckCircle 
                    className="w-12 h-12" 
                    style={{ color: content.colorPrimary }}
                  />
                </div>
                <h4 className="text-3xl text-gray-900 mb-3">Mulțumim!</h4>
                <p className="text-lg text-gray-600">
                  {guest?.rsvpStatus === 'confirmed' 
                    ? 'Răspunsul tău a fost înregistrat. Te așteptăm cu drag!' 
                    : 'Răspunsul tău a fost înregistrat.'}
                </p>
              </div>
            ) : (
              <div className="max-w-xl mx-auto">
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Nume complet *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                      placeholder="Ion Popescu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                      placeholder="+373 69 123 456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Număr de adulți</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.adults}
                      onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Număr de copii</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Mesaj (opțional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none resize-none transition-colors"
                      placeholder="Mesajul tău..."
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleSubmit('confirmed')}
                    disabled={!formData.name}
                    className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✓ Confirm prezența
                  </button>
                  <button
                    onClick={() => handleSubmit('declined')}
                    disabled={!formData.name}
                    className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✗ Nu pot participa
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t-2 border-gray-200 pt-8">
          <img src={polubviLogo} alt="POLUBVI" className="h-8 mx-auto mb-3 opacity-40" />
          <p>Creat cu POLUBVI Event Planner</p>
        </div>
      </div>
    </div>
  );
}