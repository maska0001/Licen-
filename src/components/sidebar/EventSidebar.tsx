import React, { useState, useRef, useEffect } from 'react';
import { Heart, Cake, Baby, Briefcase, PartyPopper, Calendar, MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import svgPaths from './imports/svg-0diqo9tvby';
import { formatEventDate } from '../../utils/eventDate';

interface Event {
  id: string;
  type: string;
  eventName?: string;
  customImage?: string;
  status: string;
  date: string | null;
  dateMode?: string | null;
  eventMonth?: number | null;
  eventYear?: number | null;
  city: string;
  guestCount: number;
  vibe: string;
  services: string[];
  budget: number;
}

interface EventSidebarProps {
  events: Event[];
  activeEventId: string | null;
  onSelectEvent: (eventId: string) => void;
  onCreateEvent: () => void;
  onRenameEvent?: (eventId: string, newName: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

// Function to get icon based on event type
function getEventIcon(eventType: string) {
  switch (eventType) {
    case 'Nuntă':
      return Heart;
    case 'Zi de naștere':
      return Cake;
    case 'Botez':
      return Baby;
    case 'Eveniment corporate':
      return Briefcase;
    case 'Aniversare':
      return PartyPopper;
    case 'Baby shower':
      return Baby;
    default:
      return Calendar;
  }
}

export function EventSidebar({ events, activeEventId, onSelectEvent, onCreateEvent, onRenameEvent, onDeleteEvent }: EventSidebarProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when editing starts
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const handleMenuToggle = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === eventId ? null : eventId);
  };

  const handleRenameStart = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(event.id);
    setEditValue(event.type);
    setOpenMenuId(null);
  };

  const handleRenameSave = (eventId: string) => {
    if (editValue.trim() && onRenameEvent) {
      onRenameEvent(eventId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = async (eventId: string, e: React.MouseEvent) => {
    console.log('handleDelete called with eventId:', eventId);
    e.stopPropagation();
    
    const confirmed = window.confirm('Sigur vrei să ștergi acest eveniment? Această acțiune nu poate fi anulată.');
    console.log('User confirmation:', confirmed);
    
    if (confirmed) {
      console.log('User confirmed deletion');
      try {
        console.log('Calling onDeleteEvent...');
        await onDeleteEvent?.(eventId);
        console.log('onDeleteEvent completed successfully');
        setOpenMenuId(null);
      } catch (error) {
        console.error('Error deleting event:', error);
        setOpenMenuId(null);
      }
    } else {
      console.log('User cancelled deletion');
      setOpenMenuId(null);
    }
  };

  return (
    <aside className="bg-white content-stretch flex flex-col items-start fixed left-0 top-[65px] h-[calc(100vh-65px)] w-[279px] border-r border-[#e7e7e7]">
      {/* Events List Container */}
      <div className="h-[calc(100vh-144.5px)] relative shrink-0 w-full overflow-y-auto">{/* 65px navbar + 79.5px button = 144.5px */}
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[24px] px-[16px] relative">
          {/* Header */}
          <div className="h-[16.5px] relative shrink-0 w-full">
            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[12px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[0.5px] tracking-[0.5645px] uppercase">
              Evenimentele tale
            </p>
          </div>

          {events.length === 0 ? (
            <div className="px-3 py-8 text-center w-full">
              <Calendar className="w-12 h-12 text-[#d1d5db] mx-auto mb-3" />
              <p className="text-[13px] text-[#6a7282] mb-1">
                Nu ai evenimente încă
              </p>
              <p className="text-[12px] text-[#9ca3af]">
                Creează primul tău eveniment
              </p>
            </div>
          ) : (
            events.map((event) => {
              const isActive = event.id === activeEventId;
              const isEditing = editingId === event.id;
              const hasMenu = openMenuId === event.id;

              return (
                <div
                  key={event.id}
                  className={`h-[82px] relative shrink-0 w-full group ${
                    isActive ? 'bg-[#fef2f2]' : ''
                  }`}
                >
                  {isActive && (
                    <div aria-hidden="true" className="absolute border border-[#960010] border-solid inset-0 pointer-events-none" />
                  )}
                  
                  <div
                    onClick={() => !isEditing && onSelectEvent(event.id)}
                    className="w-full h-full cursor-pointer"
                  >
                    <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
                      {/* Icon Container - Complet Rotund */}
                      <div className={`relative rounded-[183px] shrink-0 size-[40px] ${
                        isActive ? 'bg-[#960010]' : 'bg-gray-100'
                      }`}>
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                          {event.type === 'Nuntă' ? (
                            <svg className="block size-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <path d={svgPaths.p2f84f400} stroke={isActive ? 'white' : '#6a7282'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          ) : (
                            (() => {
                              const Icon = getEventIcon(event.type);
                              return <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#6a7282]'}`} />;
                            })()
                          )}
                        </div>
                      </div>

                      {/* Event Info */}
                      <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
                          {/* Titlu eveniment (sau "Eveniment") */}
                          <div className="content-stretch flex gap-[4px] h-[17.5px] items-center relative shrink-0 w-full">
                            {isEditing ? (
                              <div className="flex items-center gap-1 flex-1">
                                <input
                                  ref={inputRef}
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleRenameSave(event.id);
                                    if (e.key === 'Escape') handleRenameCancel();
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 px-1 py-0.5 text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#111827] border border-[#960010] rounded focus:outline-none focus:ring-1 focus:ring-[#960010] uppercase"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameSave(event.id);
                                  }}
                                  className="p-0.5 hover:bg-green-100 rounded"
                                >
                                  <Check className="w-3 h-3 text-green-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameCancel();
                                  }}
                                  className="p-0.5 hover:bg-red-100 rounded"
                                >
                                  <X className="w-3 h-3 text-red-600" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="h-[18px] relative flex-1">
                                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                                    <p className={`absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] uppercase ${
                                      isActive ? 'text-[#960010]' : 'text-[#111827]'
                                    }`}>
                                      {event.eventName || 'EVENIMENT'}
                                    </p>
                                  </div>
                                </div>
                                {isActive && (
                                  <svg className="block size-[16px] shrink-0" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path d={svgPaths.p39be50} stroke="#960010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  </svg>
                                )}
                                {/* Three Dots Menu */}
                                <div className="relative shrink-0" ref={menuRef}>
                                  <button
                                    onClick={(e) => handleMenuToggle(event.id, e)}
                                    className="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-opacity"
                                  >
                                    <MoreVertical className="w-4 h-4 text-[#6a7282]" />
                                  </button>
                                  
                                  {/* Dropdown Menu */}
                                  {hasMenu && (
                                    <div ref={menuRef} className="absolute right-0 top-6 z-50 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                                      <button
                                        onClick={(e) => handleRenameStart(event, e)}
                                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                        Redenumește
                                      </button>
                                      <button
                                        onClick={(e) => handleDelete(event.id, e)}
                                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        Șterge
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Tip eveniment */}
                          <div className="h-[18px] overflow-clip relative shrink-0 w-full">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">
                              {event.type}
                            </p>
                          </div>

                          {/* Data evenimentului */}
                          <div className="h-[16.5px] overflow-clip relative shrink-0 w-full">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ca3af] text-[11px] text-nowrap top-[0.5px] tracking-[0.0645px]">
                              {formatEventDate(
                                {
                                  date: event.date,
                                  dateMode: event.dateMode,
                                  eventMonth: event.eventMonth,
                                  eventYear: event.eventYear,
                                },
                                'short'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add New Event Button */}
      <div className="h-[79.5px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start pb-0 pt-[17px] px-[16px] relative size-full">
          <button
            onClick={onCreateEvent}
            className="bg-[#960010] h-[46.5px] relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center pl-0 pr-[0.008px] py-0 relative size-full">
                <svg className="block size-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d="M4.16667 10H15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M10 4.16667V15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
                <div className="h-[22.5px] relative shrink-0">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] not-italic text-[15px] text-center text-nowrap text-white tracking-[-0.2344px]">
                      Eveniment nou
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
