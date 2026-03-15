import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface LandingContent {
  published: boolean;
  coverImage: string;
  galleryImages: string[];
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  locationAddress: string;
  heroMessage: string;
  dateDescription: string;
  detailsDescription: string;
  dressCode: string;
  schedule: { time: string; activity: string }[];
  timingIcons: string[];
  colorPrimary: string;
  colorSecondary: string;
}

export interface LandingRsvpFormData {
  name: string;
  phone: string;
  adults: number;
  children: number;
  message: string;
}

interface LandingMobileViewProps {
  content: LandingContent;
  showRsvp: boolean;
  submitted?: boolean;
  submitting?: boolean;
  guestStatus?: string | null;
  responseStatus: 'confirmed' | 'declined';
  formData: LandingRsvpFormData;
  onFormChange: (field: keyof LandingRsvpFormData, value: string | number) => void;
  onResponseStatusChange: (status: 'confirmed' | 'declined') => void;
  onSubmit?: () => void;
  previewMode?: boolean;
}

const formatPreviewDate = (dateStr: string) => {
  if (!dateStr) {
    return 'DATA';
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  return date
    .toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
};

export function LandingMobileView({
  content,
  showRsvp,
  submitted = false,
  submitting = false,
  guestStatus,
  responseStatus,
  formData,
  onFormChange,
  onResponseStatusChange,
  onSubmit,
  previewMode = false,
}: LandingMobileViewProps) {
  return (
    <div className="bg-white">
      <div className="w-full mx-auto" style={{ maxWidth: '375px' }}>
        <div className="content-stretch flex flex-col isolate items-start relative w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
            <div className="bg-white relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
                  <div className="text-[14px] font-semibold text-black tracking-wide">POLUBVI</div>
                  <div className="relative shrink-0 size-[28px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                      <path d="M4 8h20M4 14h20M4 20h20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      backgroundPosition: 'top left',
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
              {content.heroMessage || 'Text descriere'}
            </p>
          </div>
        </div>

        <div className="py-24 px-4" style={{ backgroundColor: content.colorPrimary }}>
          <div className="bg-white">
            <div className="border-b border-[#e7e7e7] px-4 pt-12 pb-8">
              <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
                {formatPreviewDate(content.date)}
              </p>
            </div>
            <div className="border-b border-[#e7e7e7] px-5 py-7">
              <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center max-w-[360px] mx-auto">
                {content.dateDescription || 'Descriere eveniment'}
              </p>
            </div>
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

        <div className="py-24 px-4">
          <div className="flex flex-col gap-5 items-center mb-10">
            <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
              {content.location || 'LOCATIA'}
            </p>
            <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center max-w-[360px]">
              {content.locationAddress || 'Adresa completa a locatiei'}
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

        <div className="bg-[#f5f5f5] py-[100px] px-[16px]">
          <div className="content-stretch flex flex-col gap-[40px] items-center max-w-[1600px] mx-auto w-full">
            <div className="content-stretch flex flex-col gap-[20px] items-start not-italic text-center w-full">
              <p className="font-medium leading-none text-[43px] tracking-[-2.58px] uppercase w-full" style={{ color: content.colorPrimary }}>
                TIMING
              </p>
              <p className="font-normal leading-[21.429px] max-w-[360px] text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full mx-auto">
                {content.detailsDescription || 'Descriere'}
              </p>
            </div>

            <div className="content-stretch flex flex-col gap-[6px] items-start w-full">
              <div className="bg-white content-stretch flex flex-col items-start w-full">
                {content.schedule.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} className="relative w-full">
                      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                      <div className="flex flex-row items-center justify-end size-full">
                        <div className={`content-stretch flex gap-[20px] items-center px-[32px] py-[40px] relative w-full ${isEven ? 'justify-end' : 'justify-start'}`}>
                          {isEven ? (
                            <>
                              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic">
                                <p className="font-medium leading-none text-[44px] tracking-[-0.88px] uppercase w-full" style={{ color: content.colorPrimary }}>
                                  {item.time || 'ORA'}
                                </p>
                                <p className="font-normal leading-[21.429px] text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">
                                  {item.activity || 'Descriere'}
                                </p>
                              </div>
                              {content.timingIcons[index] ? (
                                <div className="shrink-0 size-[84px] relative overflow-hidden">
                                  <img src={content.timingIcons[index]} alt={`Icon ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
                              )}
                            </>
                          ) : (
                            <>
                              {content.timingIcons[index] ? (
                                <div className="shrink-0 size-[84px] relative overflow-hidden">
                                  <img src={content.timingIcons[index]} alt={`Icon ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
                              )}
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

        {showRsvp && (
          <div className="bg-white py-16 px-4">
            <div className="max-w-[343px] mx-auto">
              <div className="flex flex-col gap-3 items-center mb-10">
                <p className="font-medium text-[43px] leading-none tracking-[-2.58px] uppercase text-center" style={{ color: content.colorPrimary }}>
                  RSVP
                </p>
                <p className="font-normal text-[#414c5a] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center">
                  Confirma prezenta ta la eveniment
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${content.colorPrimary}15` }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ color: content.colorPrimary }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-3xl text-gray-900 mb-3">Multumim!</h4>
                  <p className="text-lg text-gray-600">
                    {guestStatus === 'confirmed'
                      ? 'Raspunsul tau a fost inregistrat. Te asteptam cu drag!'
                      : 'Raspunsul tau a fost inregistrat.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-3">
                      Raspuns *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => onResponseStatusChange('confirmed')}
                        className="py-3 px-4 border-2 rounded-lg font-medium text-[15px] transition-all"
                        style={{
                          borderColor: responseStatus === 'confirmed' ? content.colorPrimary : '#e5e7eb',
                          backgroundColor: responseStatus === 'confirmed' ? content.colorPrimary : 'white',
                          color: responseStatus === 'confirmed' ? 'white' : '#6b7280',
                        }}
                      >
                        VIN
                      </button>
                      <button
                        type="button"
                        onClick={() => onResponseStatusChange('declined')}
                        className="py-3 px-4 border-2 rounded-lg font-medium text-[15px] transition-all"
                        style={{
                          borderColor: responseStatus === 'declined' ? content.colorPrimary : '#e5e7eb',
                          backgroundColor: responseStatus === 'declined' ? content.colorPrimary : 'white',
                          color: responseStatus === 'declined' ? 'white' : '#6b7280',
                        }}
                      >
                        NU VIN
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Nume *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => onFormChange('name', e.target.value)}
                      readOnly={previewMode}
                      placeholder="Introdu numele tau"
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                      onFocus={(e) => (e.currentTarget.style.borderColor = content.colorPrimary)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => onFormChange('phone', e.target.value)}
                      placeholder="+40 XXX XXX XXX"
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                      onFocus={(e) => (e.currentTarget.style.borderColor = content.colorPrimary)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[14px] text-[#111827] mb-2">
                        Adulti *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.adults}
                        onChange={(e) => onFormChange('adults', parseInt(e.target.value, 10) || 0)}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                        onFocus={(e) => (e.currentTarget.style.borderColor = content.colorPrimary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
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
                        value={formData.children}
                        onChange={(e) => onFormChange('children', parseInt(e.target.value, 10) || 0)}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-2"
                        onFocus={(e) => (e.currentTarget.style.borderColor = content.colorPrimary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[14px] text-[#111827] mb-2">
                      Notite (optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => onFormChange('message', e.target.value)}
                      placeholder="Preferinte alimentare, alergii, mesaje speciale..."
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] text-[#111827] placeholder:text-[#9ca3af] outline-none resize-none focus:border-2"
                      onFocus={(e) => (e.currentTarget.style.borderColor = content.colorPrimary)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onSubmit?.()}
                    disabled={previewMode || submitting || !formData.name}
                    className="w-full py-4 rounded-lg font-semibold text-[16px] text-white transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
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
                    {submitting ? 'Se trimite...' : 'Confirma prezenta'}
                  </button>

                  <p className="text-[12px] text-[#6b7280] text-center">
                    * Campuri obligatorii
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-black py-32 px-5 overflow-hidden">
          <div className="flex flex-col gap-10 items-center">
            <p className="font-semibold text-white text-[88px] leading-[0.78] tracking-[-5.28px] uppercase text-center">
              POLUBVI
            </p>
            <div className="w-[300px] h-[1px] bg-white opacity-20" />
            <p className="font-normal text-[rgba(255,255,255,0.6)] text-[15px] leading-[21.43px] tracking-[-0.16px] text-center">
              © 2025 POLUBVI.
              <br />
              Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
