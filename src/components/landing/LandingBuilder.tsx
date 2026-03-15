import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { ImagePlus, Type, Palette, Eye, Globe, Link as LinkIcon, Save, Trash2, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { eventService, Event } from '../../services/eventService';
import { landingService } from '../../services/landingService';
import { LandingMobileView, LandingRsvpFormData, LandingContent as SharedLandingContent } from './LandingMobileView';
import { buildDefaultLandingContent, buildLandingContentFromApi } from '../../utils/landingContent';

type LandingContent = SharedLandingContent;

const normalizeSlugInput = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function LandingBuilder() {
  const { activeEventId } = useAppContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingLanding, setLoadingLanding] = useState(false);
  const [landingSlug, setLandingSlug] = useState<string | null>(null);
  const [slugInput, setSlugInput] = useState('');
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string>('');
  
  const [content, setContent] = useState<LandingContent>(buildDefaultLandingContent(null));
  const [previewResponseStatus, setPreviewResponseStatus] = useState<'confirmed' | 'declined'>('confirmed');
  const [previewFormData, setPreviewFormData] = useState<LandingRsvpFormData>({
    name: '',
    phone: '',
    adults: 1,
    children: 0,
    message: '',
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'preview'>('content');
  const [showImageSearch, setShowImageSearch] = useState<'cover' | 'gallery' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentSnapshot = JSON.stringify({
    content,
    slugInput: normalizeSlugInput(slugInput),
  });
  const isDirty = !loading && !loadingLanding && currentSnapshot !== lastSavedSnapshot;

  useEffect(() => {
    const loadLandingData = async () => {
      if (!activeEventId) {
        setEvent(null);
        setContent(buildDefaultLandingContent(null));
        setLandingSlug(null);
        setLoading(false);
        setLoadingLanding(false);
        return;
      }

      try {
        setLoading(true);
        setLoadingLanding(true);
        const eventId = parseInt(activeEventId, 10);
        const [eventData, landingData] = await Promise.all([
          eventService.getEvent(eventId),
          landingService.getLandingPage(eventId),
        ]);
        setEvent(eventData);
        setLandingSlug(landingData.public_slug || null);
        setSlugInput(landingData.public_slug || '');

        const nextContent = buildLandingContentFromApi(landingData, eventData);

        setContent(nextContent);
        setLastSavedSnapshot(
          JSON.stringify({
            content: nextContent,
            slugInput: normalizeSlugInput(landingData.public_slug || ''),
          })
        );
      } catch (error) {
        console.error('Failed to load landing data:', error);
        setEvent(null);
        setContent(buildDefaultLandingContent(null));
        setLandingSlug(null);
        setSlugInput('');
        setLastSavedSnapshot(
          JSON.stringify({
            content: buildDefaultLandingContent(null),
            slugInput: '',
          })
        );
      } finally {
        setLoading(false);
        setLoadingLanding(false);
      }
    };

    loadLandingData();
  }, [activeEventId]);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const updateContent = (field: keyof LandingContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const addScheduleItem = () => {
    setContent(prev => ({
      ...prev,
      schedule: [...prev.schedule, { time: '', activity: '' }]
    }));
  };

  const updateScheduleItem = (index: number, field: 'time' | 'activity', value: string) => {
    setContent(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeScheduleItem = (index: number) => {
    setContent(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const updateTimingIcon = (index: number, imageUrl: string) => {
    setContent(prev => {
      const newTimingIcons = [...prev.timingIcons];
      newTimingIcons[index] = imageUrl;
      return { ...prev, timingIcons: newTimingIcons };
    });
  };

  const handleImageSearch = async () => {
    const mockImage = `https://images.unsplash.com/photo-5191677581-83f29da8c3cf?w=1200&q=80`;
    
    if (showImageSearch === 'cover') {
      updateContent('coverImage', mockImage);
    } else if (showImageSearch === 'gallery') {
      updateContent('galleryImages', [...content.galleryImages, mockImage]);
    }
    
    setShowImageSearch(null);
    setSearchQuery('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!activeEventId) {
      alert('Selecteaza mai intai un eveniment pentru a putea incarca imagini.');
      e.target.value = '';
      return;
    }

    // Check if this is for timing icon
    const timingIconIndex = (window as any).__timingIconIndex;

    if (!file.type.startsWith('image/')) {
      alert('Te rog încarcă doar imagini (JPG, PNG, etc.)');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Imaginea este prea mare. Dimensiunea maximă este 5MB.');
      e.target.value = '';
      return;
    }

    try {
      const eventId = parseInt(activeEventId, 10);
      const { url } = await landingService.uploadImage(eventId, file);

      if (typeof timingIconIndex === 'number') {
        updateTimingIcon(timingIconIndex, url);
        (window as any).__timingIconIndex = undefined;
        setShowImageSearch(null);
        e.target.value = '';
        return;
      }

      if (showImageSearch === 'cover') {
        updateContent('coverImage', url);
      } else if (showImageSearch === 'gallery') {
        const slot = (window as any).__imageSlot;
        if (slot !== undefined) {
          const newImages = [...content.galleryImages];
          newImages[slot] = url;
          updateContent('galleryImages', newImages);
        } else {
          updateContent('galleryImages', [...content.galleryImages, url]);
        }
      }

      setShowImageSearch(null);
      setSearchQuery('');
    } catch (error) {
      console.error('Failed to upload landing image:', error);
      alert('Nu am putut incarca imaginea.');
    } finally {
      e.target.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    updateContent('galleryImages', content.galleryImages.filter((_, i) => i !== index));
  };

  const saveLanding = async (nextPublished?: boolean) => {
    if (!activeEventId) {
      return false;
    }

    try {
      setSaving(true);
      const eventId = parseInt(activeEventId, 10);
      const payload = {
        title: content.title,
        date: content.date,
        location: content.location,
        cover_image: content.coverImage,
        message: content.heroMessage,
        dress_code: content.dressCode,
        public_slug: normalizeSlugInput(slugInput),
        published: nextPublished ?? content.published,
        content_json: JSON.stringify({
          ...content,
          published: nextPublished ?? content.published,
        }),
      };
      const updatedLanding = await landingService.updateLandingPage(eventId, payload);
      if ((nextPublished ?? content.published) && !content.published) {
        await landingService.publishLandingPage(eventId);
      }
      const normalizedSlug = updatedLanding.public_slug || '';
      const nextContentState = { ...content, published: nextPublished ?? content.published };
      setLandingSlug(updatedLanding.public_slug || null);
      setSlugInput(normalizedSlug);
      setContent(nextContentState);
      setLastSavedSnapshot(
        JSON.stringify({
          content: nextContentState,
          slugInput: normalizeSlugInput(normalizedSlug),
        })
      );
      return true;
    } catch (error) {
      console.error('Failed to save landing page:', error);
      alert('Nu am putut salva modificarile landing-ului.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async () => {
    if (!content.published) {
      if (!content.coverImage) {
        alert('Te rog adaugă o imagine de copertă înainte de a publica!');
        return;
      }
      if (confirm('Ești sigur că vrei să publici landing-ul? Invitații vor putea accesa linkul.')) {
        const saved = await saveLanding(true);
        if (saved) {
          alert('Landing publicat cu succes! Acum poti trimite linkurile invitatiilor.');
        }
      }
    } else {
      if (confirm('Vrei să ascunzi landing-ul? Invitații nu vor mai putea accesa linkul.')) {
        const saved = await saveLanding(false);
        if (saved) {
          alert('Landing ascuns cu succes.');
        }
      }
    }
  };

  const getLandingUrl = () => {
    if (!landingSlug) {
      return null;
    }
    return `${window.location.origin}/landing/${landingSlug}`;
  };

  const copyLink = () => {
    const link = getLandingUrl();
    if (!link) {
      alert('Salveaza landing-ul pentru a genera un link public real.');
      return;
    }
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link)
        .then(() => {
          alert('✅ Link copiat în clipboard!');
        })
        .catch(() => {
          fallbackCopyTextToClipboard(link);
        });
    } else {
      fallbackCopyTextToClipboard(link);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('✅ Link copiat în clipboard!');
    } catch (err) {
      alert('❌ Nu s-a putut copia linkul. Link: ' + text);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-medium leading-none text-[#960010] text-[80px] tracking-[-4.8px] uppercase mb-2">Constructor invitație digitală</h1>
        <p className="font-normal leading-[24px] text-[#4a5565] text-[16px] tracking-[-0.3125px]">
          Creează o invitație digitală elegantă pentru invitații tăi
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${
              isDirty
                ? 'bg-[#fef2f2] text-[#960010] border border-[#fecaca]'
                : 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
            }`}
          >
            {isDirty ? 'Modificări nesalvate' : 'Toate modificările sunt salvate'}
          </div>
        </div>
        <div className="mt-4 max-w-xl">
          <label className="block text-[14px] text-[#6b7280] tracking-[-0.1504px] mb-2">
            Link public
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-2.5 border border-[#d1d5db] rounded-lg bg-[#f9fafb] text-[14px] text-[#6b7280]">
              {window.location.origin}/landing/
              <input
                type="text"
                value={slugInput}
                onChange={(e) => setSlugInput(normalizeSlugInput(e.target.value))}
                placeholder="numele-linkului"
                className="bg-transparent outline-none text-[#111827] w-[220px]"
              />
            </div>
            {landingSlug && content.published && (
              <button
                onClick={copyLink}
                className="px-4 py-2.5 bg-white border border-[#d1d5db] text-[#4b5563] rounded-lg hover:border-[#960010] hover:text-[#960010] transition-all flex items-center gap-2 shadow-sm"
              >
                <LinkIcon className="w-4 h-4" />
                Copiaza
              </button>
            )}
          </div>
          <p className="mt-2 text-[12px] text-[#6b7280]">
            Doar litere mici, cifre si cratime. Daca slugul exista deja, backendul il ajusteaza automat.
          </p>
          {!landingSlug && (
            <p className="mt-2 text-[12px] text-[#960010]">
              Linkul public apare dupa prima salvare.
            </p>
          )}
        </div>
        {loading && (
          <p className="mt-4 text-[14px] text-[#6b7280]">
            Se incarca configuratia landing-ului...
          </p>
        )}
        {content.published && getLandingUrl() && (
          <div className="mt-4 p-4 bg-[#f0fdf4]">
            <p className="text-[#15803d] text-[14px]">
              ✅ Landing-ul este publicat și accesibil la: <strong className="font-mono text-[13px]">{getLandingUrl()}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Tabs and Publish Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 border-b border-[#e5e7eb] flex-1">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-medium text-[15px] transition-all relative ${
              activeTab === 'content'
                ? 'text-[#960010]'
                : 'text-[#6b7280] hover:text-[#111827]'
            }`}
          >
            <Type className="w-4 h-4 inline mr-2" />
            Conținut
            {activeTab === 'content' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#960010]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-6 py-3 font-medium text-[15px] transition-all relative ${
              activeTab === 'design'
                ? 'text-[#960010]'
                : 'text-[#6b7280] hover:text-[#111827]'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Design
            {activeTab === 'design' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#960010]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-medium text-[15px] transition-all relative ${
              activeTab === 'preview'
                ? 'text-[#960010]'
                : 'text-[#6b7280] hover:text-[#111827]'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Preview
            {activeTab === 'preview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#960010]" />
            )}
          </button>
        </div>
        
        <div className="flex gap-3 ml-6">
          <button
            onClick={() => {
              void saveLanding();
            }}
            disabled={!activeEventId || saving || loading}
            className="px-5 py-2.5 bg-white border border-[#d1d5db] text-[#4b5563] rounded-lg hover:border-[#960010] hover:text-[#960010] transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Se salveaza...' : 'Salveaza'}
          </button>
          {content.published && (
            <button
              onClick={copyLink}
              className="px-5 py-2.5 bg-white border border-[#d1d5db] text-[#4b5563] rounded-lg hover:border-[#960010] hover:text-[#960010] transition-all flex items-center gap-2 shadow-sm"
            >
              <LinkIcon className="w-4 h-4" />
              Copiază link
            </button>
          )}
          <button
            onClick={togglePublish}
            disabled={!activeEventId || saving || loading}
            className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm ${
              content.published
                ? 'bg-white border border-[#d1d5db] text-[#4b5563] hover:border-[#6b7280] hover:text-[#374151]'
                : 'bg-[#960010] text-white hover:bg-[#7d0000]'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <Globe className="w-4 h-4" />
            {content.published ? 'Ascunde' : 'Publică'}
          </button>
        </div>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          
          {/* Hero Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#960010]">
            <h3 className="text-[20px] font-semibold text-[#111827] mb-1">📍 Secțiunea HERO</h3>
            <p className="text-[13px] text-[#6b7280] mb-6">Prima secțiunea - titlu mare și imagine de fundal</p>
            
            <div className="space-y-4">
              {/* Cover Image */}
              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Imagine de fundal *</label>
                {content.coverImage ? (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    <ImageWithFallback
                      src={content.coverImage}
                      alt="Hero Background"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => updateContent('coverImage', '')}
                      className="absolute top-3 right-3 p-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowImageSearch('cover')}
                    className="w-full aspect-[16/9] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.backgroundColor = `${content.colorPrimary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <ImagePlus className="w-8 h-8 text-[#9ca3af]" />
                    <span className="text-[#6b7280] text-[15px]">Adaugă imagine de fundal</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Subtitlu (tag mic deasupra titlului)</label>
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => updateContent('subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                  placeholder="ex: Vă invităm să sărbătorim împreună"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Titlu principal MARE *</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => updateContent('title', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all text-[18px] font-semibold"
                  placeholder="ex: Nunta noastră"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Text descriere jos (pe fundal alb)</label>
                <textarea
                  value={content.heroMessage}
                  onChange={(e) => updateContent('heroMessage', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all resize-none"
                  placeholder="Text scurt pentru secțiunea hero..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* DATA Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4" style={{ borderColor: content.colorPrimary }}>
            <h3 className="text-[20px] font-semibold text-[#111827] mb-1">📅 Secțiunea DATA</h3>
            <p className="text-[13px] text-[#6b7280] mb-6">Data evenimentului cu descriere și imagine</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#374151] mb-2">Data evenimentului *</label>
                  <input
                    type="date"
                    value={content.date}
                    onChange={(e) => updateContent('date', e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#374151] mb-2">Ora (opțional)</label>
                  <input
                    type="time"
                    value={content.time}
                    onChange={(e) => updateContent('time', e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Descriere pentru secțiunea DATA</label>
                <textarea
                  value={content.dateDescription}
                  onChange={(e) => updateContent('dateDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all resize-none"
                  placeholder="Descriere pentru secțiunea cu data..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Imagine pentru secțiunea DATA</label>
                {content.galleryImages[0] ? (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    <ImageWithFallback
                      src={content.galleryImages[0]}
                      alt="Data Section"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const newImages = [...content.galleryImages];
                        newImages[0] = '';
                        updateContent('galleryImages', newImages.filter(img => img !== ''));
                      }}
                      className="absolute top-3 right-3 p-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowImageSearch('gallery');
                      (window as any).__imageSlot = 0;
                    }}
                    className="w-full aspect-[16/9] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.backgroundColor = `${content.colorPrimary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <ImagePlus className="w-8 h-8 text-[#9ca3af]" />
                    <span className="text-[#6b7280] text-[15px]">Adaugă imagine</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* LOCAȚIA Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4" style={{ borderColor: content.colorPrimary }}>
            <h3 className="text-[20px] font-semibold text-[#111827] mb-1">📍 Secțiunea LOCAȚIA</h3>
            <p className="text-[13px] text-[#6b7280] mb-6">Informații despre locație și imagine</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Nume locație (va fi afișat MARE) *</label>
                <input
                  type="text"
                  value={content.location}
                  onChange={(e) => updateContent('location', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                  placeholder="ex: CHISINAU"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Adresa completă</label>
                <input
                  type="text"
                  value={content.locationAddress}
                  onChange={(e) => updateContent('locationAddress', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                  placeholder="ex: Restaurant La Vatra, str. Alexei Mateevici 60"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Imagine pentru secțiunea LOCAȚIA</label>
                {content.galleryImages[1] ? (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    <ImageWithFallback
                      src={content.galleryImages[1]}
                      alt="Location Section"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const newImages = [...content.galleryImages];
                        newImages[1] = '';
                        updateContent('galleryImages', newImages);
                      }}
                      className="absolute top-3 right-3 p-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowImageSearch('gallery');
                      (window as any).__imageSlot = 1;
                    }}
                    className="w-full aspect-[16/9] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.backgroundColor = `${content.colorPrimary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <ImagePlus className="w-8 h-8 text-[#9ca3af]" />
                    <span className="text-[#6b7280] text-[15px]">Adaugă imagine</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TIMING Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4" style={{ borderColor: content.colorPrimary }}>
            <h3 className="text-[20px] font-semibold text-[#111827] mb-1">⏰ Secțiunea TIMING</h3>
            <p className="text-[13px] text-[#6b7280] mb-6">Program detaliat cu orele și activitățile</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Descriere (ex: Dress code)</label>
                <input
                  type="text"
                  value={content.dressCode}
                  onChange={(e) => updateContent('dressCode', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all"
                  placeholder="ex: Ținută elegantă"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[14px] font-medium text-[#374151]">Program eveniment</label>
                  <button
                    onClick={addScheduleItem}
                    className="px-3 py-1.5 text-white rounded-lg transition-colors text-[13px] font-medium flex items-center gap-1.5"
                    style={{ backgroundColor: content.colorPrimary }}
                    onMouseEnter={(e) => {
                      const darker = `${content.colorPrimary}dd`;
                      e.currentTarget.style.backgroundColor = darker;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = content.colorPrimary;
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Adaugă
                  </button>
                </div>
                <div className="space-y-3">
                  {content.schedule.map((item, index) => (
                    <div key={index} className="space-y-2 p-3 border border-[#e5e7eb] rounded-lg bg-[#f9fafb]">
                      <div className="flex gap-2 items-center">
                        <input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                          className="w-28 px-3 py-2 border border-[#d1d5db] rounded-lg outline-none transition-all text-[14px]"
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = content.colorPrimary;
                            e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                        <input
                          type="text"
                          value={item.activity}
                          onChange={(e) => updateScheduleItem(index, 'activity', e.target.value)}
                          className="flex-1 px-3 py-2 border border-[#d1d5db] rounded-lg outline-none transition-all text-[14px]"
                          placeholder="Activitate"
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = content.colorPrimary;
                            e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                        <button
                          onClick={() => removeScheduleItem(index)}
                          className="p-2 text-[#dc2626] hover:bg-[#fee2e2] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Icon pentru acest item */}
                      <div>
                        <label className="block text-[13px] font-medium text-[#6b7280] mb-1.5">Poză icon (84x84px)</label>
                        {content.timingIcons[index] ? (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#e5e7eb]">
                            <img
                              src={content.timingIcons[index]}
                              alt={`Icon ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => updateTimingIcon(index, '')}
                              className="absolute top-1 right-1 p-1 bg-[#dc2626] text-white rounded-full hover:bg-[#b91c1c] transition-colors shadow-sm"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setShowImageSearch('gallery');
                              (window as any).__timingIconIndex = index;
                            }}
                            className="w-20 h-20 border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center transition-all hover:border-[#960010] hover:bg-[#96001010]"
                          >
                            <ImagePlus className="w-6 h-6 text-[#9ca3af]" />
                            <span className="text-[10px] text-[#9ca3af] mt-1">Icon</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Imagine MARE pentru secțiunea TIMING</label>
                {content.galleryImages[2] ? (
                  <div className="relative aspect-[9/16] max-h-[400px] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    <ImageWithFallback
                      src={content.galleryImages[2]}
                      alt="Timing Section"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const newImages = [...content.galleryImages];
                        newImages[2] = '';
                        updateContent('galleryImages', newImages);
                      }}
                      className="absolute top-3 right-3 p-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowImageSearch('gallery');
                      (window as any).__imageSlot = 2;
                    }}
                    className="w-full aspect-[9/16] max-h-[400px] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.backgroundColor = `${content.colorPrimary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <ImagePlus className="w-8 h-8 text-[#9ca3af]" />
                    <span className="text-[#6b7280] text-[15px]">Adaugă imagine verticală</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* DETALII Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4" style={{ borderColor: content.colorPrimary }}>
            <h3 className="text-[20px] font-semibold text-[#111827] mb-1">✨ Secțiunea DETALII</h3>
            <p className="text-[13px] text-[#6b7280] mb-6">Detalii suplimentare și imagine finală</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Descriere detalii</label>
                <textarea
                  value={content.detailsDescription}
                  onChange={(e) => updateContent('detailsDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all resize-none"
                  placeholder="Detalii suplimentare pentru invitați..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Imagine pentru secțiunea DETALII</label>
                {content.galleryImages[3] ? (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    <ImageWithFallback
                      src={content.galleryImages[3]}
                      alt="Details Section"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const newImages = [...content.galleryImages];
                        newImages[3] = '';
                        updateContent('galleryImages', newImages);
                      }}
                      className="absolute top-3 right-3 p-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowImageSearch('gallery');
                      (window as any).__imageSlot = 3;
                    }}
                    className="w-full aspect-[16/9] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = content.colorPrimary;
                      e.currentTarget.style.backgroundColor = `${content.colorPrimary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <ImagePlus className="w-8 h-8 text-[#9ca3af]" />
                    <span className="text-[#6b7280] text-[15px]">Adaugă imagine</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Design Tab */}
      {activeTab === 'design' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#111827] mb-2">Culoare principală</h3>
          <p className="text-[13px] text-[#6b7280] mb-6">Personalizează culoarea principală care va fi folosită în tot landing-ul (titluri, accentuări, butoane)</p>
          <div className="max-w-md">
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={content.colorPrimary}
                onChange={(e) => updateContent('colorPrimary', e.target.value)}
                className="w-20 h-20 rounded-lg cursor-pointer border-2 border-[#d1d5db]"
              />
              <div className="flex-1">
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Cod culoare</label>
                <input
                  type="text"
                  value={content.colorPrimary}
                  onChange={(e) => updateContent('colorPrimary', e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all font-mono text-[16px]"
                  placeholder="#960010"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = content.colorPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <p className="text-[13px] text-[#6b7280] mb-3">Culori populare:</p>
              <div className="flex gap-2 flex-wrap">
                {['#960010', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#000000'].map(color => (
                  <button
                    key={color}
                    onClick={() => updateContent('colorPrimary', color)}
                    className="w-10 h-10 rounded-lg border-2 border-[#d1d5db] hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="bg-white -mx-8 -mb-8">
          <LandingMobileView
            content={content}
            showRsvp
            previewMode
            responseStatus={previewResponseStatus}
            formData={previewFormData}
            onFormChange={(field, value) =>
              setPreviewFormData((prev) => ({ ...prev, [field]: value }))
            }
            onResponseStatusChange={setPreviewResponseStatus}
          />
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-[20px] font-semibold text-[#111827] mb-4">
              Adaugă imagine
            </h3>
            <div className="mb-4">
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Încarcă de pe computer
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-white"
                style={{
                  '--file-bg': content.colorPrimary
                } as any}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = content.colorPrimary;
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${content.colorPrimary}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <p className="text-[12px] text-[#6b7280] mt-2">
                Dimensiune maximă: 5MB. Formate: JPG, PNG, etc.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowImageSearch(null)}
                className="flex-1 px-4 py-2.5 bg-white border border-[#d1d5db] text-[#374151] rounded-lg hover:bg-[#f9fafb] transition-colors font-medium"
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
