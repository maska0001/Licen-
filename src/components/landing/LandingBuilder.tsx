import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { ImagePlus, Type, Palette, Eye, Globe, Link as LinkIcon, Save, Trash2, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { eventService, Event } from '../../services/eventService';

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
  timingIcons: string[]; // Pozele pentru pătratele din TIMING
  colorPrimary: string;
  colorSecondary: string;
}

export function LandingBuilder() {
  const { activeEventId } = useAppContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
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
  
  const [content, setContent] = useState<LandingContent>(() => {
    const saved = localStorage.getItem('landingContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          published: parsed.published || false,
          coverImage: parsed.coverImage || '',
          galleryImages: Array.isArray(parsed.galleryImages) ? parsed.galleryImages : [],
          title: parsed.title || event?.event_type || 'Evenimentul nostru',
          subtitle: parsed.subtitle || 'Vă invităm să sărbătorim împreună',
          date: parsed.date || event?.date || '',
          time: parsed.time || '18:00',
          location: parsed.location || event?.city || '',
          locationAddress: parsed.locationAddress || '',
          message: parsed.message || 'Cu drag vă așteptăm să fiți alături de noi în această zi specială!',
          dressCode: parsed.dressCode || 'Ținută elegantă',
          schedule: Array.isArray(parsed.schedule) ? parsed.schedule : [
            { time: '18:00', activity: 'Cocteil de bun venit' },
            { time: '19:00', activity: 'Ceremonia' },
            { time: '20:00', activity: 'Cină festivă' },
            { time: '22:00', activity: 'Petrecere' }
          ],
          timingIcons: Array.isArray(parsed.timingIcons) ? parsed.timingIcons : [],
          colorPrimary: parsed.colorPrimary || '#960010',
          colorSecondary: parsed.colorSecondary || '#ec4899'
        };
      } catch (e) {
        console.error('Error parsing landing content:', e);
      }
    }
    
    return {
      published: false,
      coverImage: '',
      galleryImages: [],
      title: event?.event_type || 'Evenimentul nostru',
      subtitle: 'Vă invităm să sărbătorim împreună',
      date: event?.date || '',
      time: '18:00',
      location: event?.city || '',
      locationAddress: '',
      message: 'Cu drag vă așteptăm să fiți alături de noi în această zi specială!',
      dressCode: 'Ținută elegantă',
      schedule: [
        { time: '18:00', activity: 'Cocteil de bun venit' },
        { time: '19:00', activity: 'Ceremonia' },
        { time: '20:00', activity: 'Cină festivă' },
        { time: '22:00', activity: 'Petrecere' }
      ],
      timingIcons: [],
      colorPrimary: '#960010',
      colorSecondary: '#ec4899'
    };
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'preview'>('content');
  const [showImageSearch, setShowImageSearch] = useState<'cover' | 'gallery' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('landingContent', JSON.stringify(content));
  }, [content]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if this is for timing icon
    const timingIconIndex = (window as any).__timingIconIndex;
    if (typeof timingIconIndex === 'number') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        updateTimingIcon(timingIconIndex, imageUrl);
        (window as any).__timingIconIndex = undefined;
        setShowImageSearch(null);
      };
      reader.readAsDataURL(file);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Te rog încarcă doar imagini (JPG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Imaginea este prea mare. Dimensiunea maximă este 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      
      if (showImageSearch === 'cover') {
        updateContent('coverImage', dataUrl);
      } else if (showImageSearch === 'gallery') {
        const slot = (window as any).__imageSlot;
        if (slot !== undefined) {
          const newImages = [...content.galleryImages];
          newImages[slot] = dataUrl;
          updateContent('galleryImages', newImages);
        } else {
          updateContent('galleryImages', [...content.galleryImages, dataUrl]);
        }
      }
      
      setShowImageSearch(null);
      setSearchQuery('');
    };
    
    reader.readAsDataURL(file);
  };

  const removeGalleryImage = (index: number) => {
    updateContent('galleryImages', content.galleryImages.filter((_, i) => i !== index));
  };

  const togglePublish = () => {
    if (!content.published) {
      if (!content.coverImage) {
        alert('Te rog adaugă o imagine de copertă înainte de a publica!');
        return;
      }
      if (confirm('Ești sigur că vrei să publici landing-ul? Invitații vor putea accesa linkul.')) {
        updateContent('published', true);
        alert('✅ Landing publicat cu succes! Acum poți trimite linkurile invitaților.');
      }
    } else {
      if (confirm('Vrei să ascunzi landing-ul? Invitații nu vor mai putea accesa linkul.')) {
        updateContent('published', false);
      }
    }
  };

  const getLandingUrl = () => {
    return `${window.location.origin}${window.location.pathname}?landing=view`;
  };

  const copyLink = () => {
    const link = getLandingUrl();
    
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
        {content.published && (
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
            className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm ${
              content.published
                ? 'bg-white border border-[#d1d5db] text-[#4b5563] hover:border-[#6b7280] hover:text-[#374151]'
                : 'bg-[#960010] text-white hover:bg-[#7d0000]'
            }`}
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
                  value={content.message}
                  onChange={(e) => updateContent('message', e.target.value)}
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
                  value={content.message}
                  onChange={(e) => updateContent('message', e.target.value)}
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
                  value={content.message}
                  onChange={(e) => updateContent('message', e.target.value)}
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
          <div className="w-full mx-auto" style={{ maxWidth: '375px' }}>
            
            {/* Hero Section - flex flex-col conform Figma */}
            <div className="content-stretch flex flex-col isolate items-start relative w-full">
              
              {/* Nav - z-[3] */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
                <div className="bg-white relative shrink-0 w-full">
                  <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
                      <div className="text-[14px] font-semibold text-black tracking-wide">POLUBVI</div>
                      <div className="relative shrink-0 size-[28px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                          <path d="M4 8h20M4 14h20M4 20h20" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Content - z-[2], h-[225px] */}
              <div className="h-[225px] relative shrink-0 w-full z-[2]">
                <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[16px] top-[64px] w-[343px]">
                  <div className="bg-[#f5f5f5] content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">
                        {content.subtitle || 'Subtitlu'}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold leading-[0.78] not-italic relative shrink-0 text-[88px] text-center tracking-[-5.28px] uppercase max-w-[364.914px]" style={{ color: content.colorPrimary }}>
                    {content.title || 'TITLU'}
                  </p>
                </div>
              </div>

              {/* Frame2 - Hero Image + Text jos - z-[1], h-[443px] */}
              <div className="h-[443px] relative shrink-0 w-full z-[1]">
                <div className="absolute h-[443px] left-0 top-0 w-[375px]">
                  {content.coverImage ? (
                    <>
                      <div 
                        aria-hidden="true" 
                        className="absolute inset-0 mix-blend-multiply opacity-[0.21] pointer-events-none"
                        style={{ 
                          backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQoU2NkYGD4z4AEmBhIBKMKhw4KAVMDAf/GfZLGAAAAAElFTkSuQmCC)',
                          backgroundSize: '500px 500px',
                          backgroundRepeat: 'repeat',
                          backgroundPosition: 'top left'
                        }}
                      />
                      <ImageWithFallback
                        src={content.coverImage}
                        alt="Hero"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[#e5e5e5] opacity-20" />
                  )}
                </div>
                <p className="absolute font-normal leading-[21.429px] left-[187.5px] not-italic text-[15px] text-center text-white top-[324px] tracking-[-0.1611px] translate-x-[-50%] w-[200px]">
                  {content.message || 'Text descriere'}
                </p>
              </div>
            </div>

            {/* DATA Section */}
            <div className="py-24 px-4" style={{ backgroundColor: content.colorPrimary }}>
              <div className="bg-white">
                {/* Date Header */}
                <div className="border-b border-[#e7e7e7] px-4 pt-12 pb-8">
                  <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
                    {content.date ? new Date(content.date).toLocaleDateString('ro-RO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '.') : 'DATA'}
                  </p>
                </div>

                {/* Description */}
                <div className="border-b border-[#e7e7e7] px-5 py-7">
                  <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center max-w-[360px] mx-auto">
                    {content.message || 'Descriere eveniment'}
                  </p>
                </div>

                {/* Image */}
                <div className="h-[285px] bg-[#e5e5e5]">
                  {content.galleryImages[0] ? (
                    <ImageWithFallback
                      src={content.galleryImages[0]}
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* LOCAȚIA Section */}
            <div className="py-24 px-4">
              <div className="flex flex-col gap-5 items-center mb-10">
                <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
                  {content.location || 'LOCAȚIA'}
                </p>
                <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center max-w-[360px]">
                  {content.locationAddress || 'Adresa completă a locației'}
                </p>
              </div>

              <div className="h-[285px] bg-[#e5e5e5]">
                {content.galleryImages[1] ? (
                  <ImageWithFallback
                    src={content.galleryImages[1]}
                    alt="Location"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            </div>

            {/* TIMING Section */}
            <div className="bg-[#f5f5f5] py-[100px] px-[16px]">
              <div className="content-stretch flex flex-col gap-[40px] items-center max-w-[1600px] mx-auto w-full">
                
                {/* Header */}
                <div className="content-stretch flex flex-col gap-[20px] items-start not-italic text-center w-full">
                  <p className="font-medium leading-none text-[43px] tracking-[-2.58px] uppercase w-full" style={{ color: content.colorPrimary }}>
                    TIMING
                  </p>
                  <p className="font-normal leading-[21.429px] max-w-[360px] text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full mx-auto">
                    {content.dressCode || 'Descriere'}
                  </p>
                </div>

                {/* Schedule Grid with Alternating Layout */}
                <div className="content-stretch flex flex-col gap-[6px] items-start w-full">
                  
                  {/* White Grid Container */}
                  <div className="bg-white content-stretch flex flex-col items-start w-full">
                    {content.schedule.map((item, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <div key={index} className="relative w-full">
                          <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                          <div className="flex flex-row items-center justify-end size-full">
                            <div className={`content-stretch flex gap-[20px] items-center px-[32px] py-[40px] relative w-full ${isEven ? 'justify-end' : 'justify-start'}`}>
                              
                              {/* Layout alternant */}
                              {isEven ? (
                                <>
                                  {/* Text la stânga */}
                                  <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic">
                                    <p className="font-medium leading-none text-[44px] tracking-[-0.88px] uppercase w-full" style={{ color: content.colorPrimary }}>
                                      {item.time || 'ORA'}
                                    </p>
                                    <p className="font-normal leading-[21.429px] text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">
                                      {item.activity || 'Descriere'}
                                    </p>
                                  </div>
                                  {/* Icon la dreapta */}
                                  {content.timingIcons[index] ? (
                                    <div className="shrink-0 size-[84px] relative overflow-hidden">
                                      <img
                                        src={content.timingIcons[index]}
                                        alt={`Icon ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
                                  )}
                                </>
                              ) : (
                                <>
                                  {/* Icon la stânga */}
                                  {content.timingIcons[index] ? (
                                    <div className="shrink-0 size-[84px] relative overflow-hidden">
                                      <img
                                        src={content.timingIcons[index]}
                                        alt={`Icon ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
                                  )}
                                  {/* Text la dreapta */}
                                  <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic">
                                    <p className="font-medium leading-none text-[44px] tracking-[-0.88px] uppercase w-full" style={{ color: content.colorPrimary }}>
                                      {item.time || 'ORA'}
                                    </p>
                                    <p className="font-normal leading-[21.429px] text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">
                                      {item.activity || 'Descriere'}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Image Mare */}
                  <div className="bg-[rgba(0,0,0,0.2)] h-[560px] relative w-full">
                    <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
                    {content.galleryImages[2] ? (
                      <ImageWithFallback
                        src={content.galleryImages[2]}
                        alt="Timing"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>

              </div>
            </div>

            {/* DETALII Section */}
            <div className="py-40 px-3" style={{ backgroundColor: content.colorPrimary }}>
              <div className="bg-white">
                <div className="px-5 py-12 flex flex-col gap-8 items-center">
                  <div className="flex flex-col gap-5 items-center">
                    <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center max-w-[280px]" style={{ color: content.colorPrimary }}>
                      DETALII
                    </p>
                    <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center">
                      {content.message || 'Descriere'}
                    </p>
                  </div>

                  <div className="h-[285px] w-full bg-[#e5e5e5]">
                    {content.galleryImages[3] ? (
                      <ImageWithFallback
                        src={content.galleryImages[3]}
                        alt="Details"
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RSVP Section */}
            <div className="bg-white py-16 px-4">
              <div className="max-w-[343px] mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-3 items-center mb-10">
                  <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
                    RSVP
                  </p>
                  <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center">
                    Confirmă prezența ta la eveniment
                  </p>
                </div>

                {/* RSVP Form */}
                <div className="space-y-6">
                  {/* Răspuns: VIN / NU VIN */}
                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-3">
                      Răspuns *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        className="py-3 px-4 border-2 rounded-lg font-medium text-[15px] transition-all"
                        style={{ 
                          borderColor: content.colorPrimary,
                          backgroundColor: content.colorPrimary,
                          color: 'white'
                        }}
                      >
                        VIN
                      </button>
                      <button 
                        className="py-3 px-4 border-2 border-[#e5e7eb] rounded-lg font-medium text-[15px] text-[#6b7280] hover:border-[#d1d5db] transition-all"
                      >
                        NU VIN
                      </button>
                    </div>
                  </div>

                  {/* Nume */}
                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Nume *
                    </label>
                    <input
                      type="text"
                      placeholder="Introdu numele tău"
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                      onFocus={(e) => e.currentTarget.style.borderColor = content.colorPrimary}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      placeholder="+40 XXX XXX XXX"
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                      onFocus={(e) => e.currentTarget.style.borderColor = content.colorPrimary}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  {/* Adulți și Copii */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[14px] text-[#111827] mb-2">
                        Adulți *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        defaultValue="1"
                        placeholder="0"
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                        onFocus={(e) => e.currentTarget.style.borderColor = content.colorPrimary}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[14px] text-[#111827] mb-2">
                        Copii
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        defaultValue="0"
                        placeholder="0"
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                        onFocus={(e) => e.currentTarget.style.borderColor = content.colorPrimary}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Notițe */}
                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Notițe (opțional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Preferințe alimentare, alergii, mesaje speciale..."
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none resize-none focus:border-2"
                      onFocus={(e) => e.currentTarget.style.borderColor = content.colorPrimary}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full py-4 rounded-lg font-semibold text-[16px] text-white transition-all shadow-sm hover:shadow-md"
                    style={{ backgroundColor: content.colorPrimary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Confirmă prezența
                  </button>

                  <p className="text-[12px] text-[#6b7280] text-center">
                    * Câmpuri obligatorii
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-black py-32 px-5 overflow-hidden">
              <div className="flex flex-col gap-10 items-center">
                <p className="font-semibold text-white text-[88px] leading-[0.78] tracking-[-5.28px] uppercase text-center">
                  POLUBVI
                </p>
                <div className="w-[300px] h-[1px] bg-white opacity-20" />
                <p className="font-normal text-[rgba(255,255,255,0.6)] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center">
                  © 2025 POLUBVI.<br />
                  Toate drepturile rezervate.
                </p>
              </div>
            </div>

          </div>
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