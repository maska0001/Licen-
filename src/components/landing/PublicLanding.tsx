import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import polubviLogo from 'figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png';
import { rsvpService } from '../../services/rsvpService';
import { LandingMobileView, LandingContent, LandingRsvpFormData } from './LandingMobileView';
import { buildLandingContentFromApi } from '../../utils/landingContent';

export function PublicLanding() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [guest, setGuest] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LandingRsvpFormData>({
    name: '',
    phone: '',
    adults: 1,
    children: 0,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState<'confirmed' | 'declined'>('confirmed');

  useEffect(() => {
    const loadPublicLanding = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('landing');
      const pathMatch = window.location.pathname.match(/^\/landing\/([^/]+)$/);
      const slug = pathMatch?.[1] || null;

      if (!id && !slug) {
        setError('Link invalid pentru landing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        if (id && id !== 'view') {
          setToken(id);
          const response = await rsvpService.getRsvpInfo(id);
          const landingData: LandingContent = buildLandingContentFromApi(response.landing_page, response.event);

          setContent(landingData);
          setGuest(response.guest);
          setFormData({
            name: response.guest.name,
            phone: response.guest.phone || '',
            adults: response.guest.adults || 1,
            children: response.guest.children || 0,
            message: response.guest.notes || ''
          });
          setSubmitted(response.guest.status !== 'pending');
          setResponseStatus(response.guest.status === 'declined' ? 'declined' : 'confirmed');
        } else if (slug) {
          setToken(null);
          const response = await rsvpService.getPublicLanding(slug);
          const landingData: LandingContent = buildLandingContentFromApi(response.landing_page, response.event);

          setContent(landingData);
          setGuest(null);
          setSubmitted(false);
        }
      } catch (e) {
        console.error('Error loading public landing:', e);
        setError('Landing-ul nu este disponibil.');
      } finally {
        setLoading(false);
      }
    };

    void loadPublicLanding();
  }, []);

  const handleSubmit = async (status: 'confirmed' | 'declined') => {
    if (!token) {
      return;
    }

    try {
      setSubmitting(true);
      const resolvedAdults = Math.max(1, formData.adults || 1);
      const resolvedChildren = Math.max(0, formData.children || 0);
      const updatedGuest = await rsvpService.submitRsvp(token, {
        status,
        phone: formData.phone,
        adults: resolvedAdults,
        children: resolvedChildren,
        notes: formData.message,
      });
      setGuest(updatedGuest);
      setSubmitted(true);
    } catch (submitError) {
      console.error('Error submitting RSVP:', submitError);
      alert('Nu am putut salva raspunsul tau. Incearca din nou.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-purple-100 max-w-md">
          <img src={polubviLogo} alt="POLUBVI" className="h-12 mx-auto mb-6" />
          <h2 className="text-2xl text-gray-900 mb-3">Se incarca invitatia</h2>
          <p className="text-gray-600">Te rugam sa astepti cateva secunde.</p>
        </div>
      </div>
    );
  }

  if (!content || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-purple-100 max-w-md">
          <img src={polubviLogo} alt="POLUBVI" className="h-12 mx-auto mb-6" />
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-3">Landing-ul nu este disponibil</h2>
          <p className="text-gray-600 mb-2">{error || 'Organizatorul evenimentului inca nu a publicat invitatia digitala.'}</p>
          <p className="text-sm text-gray-500">Te rugăm să revii mai târziu sau să contactezi organizatorul.</p>
        </div>
      </div>
    );
  }

  return (
    <LandingMobileView
      content={content}
      showRsvp={Boolean(token)}
      submitted={submitted}
      submitting={submitting}
      guestStatus={guest?.status || null}
      responseStatus={responseStatus}
      formData={formData}
      onFormChange={(field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }))
      }
      onResponseStatusChange={setResponseStatus}
      onSubmit={() => {
        void handleSubmit(responseStatus);
      }}
    />
  );
}
