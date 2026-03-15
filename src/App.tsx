import React, { useState, createContext, useContext, useEffect } from 'react';
import { Login } from './components/auth/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import { EventWizard } from './components/wizard/EventWizard';
import { Checklist } from './components/checklist/Checklist';
import { Suppliers } from './components/suppliers/Suppliers';
import { Budget } from './components/budget/Budget';
import { GuestList } from './components/guests/GuestList';
import { RSVPForm } from './components/guests/RSVPForm';
import { TableArrangement } from './components/tables/TableArrangement';
import { LandingBuilder } from './components/landing/LandingBuilder';
import { PublicLanding } from './components/landing/PublicLanding';
import { MarketingLanding } from './components/marketing/MarketingLanding';
import { EventSidebar } from './components/sidebar/EventSidebar';
import polubviLogo from 'figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png';
import { authService, eventService } from './services';
import { mapEventFromApi } from './utils/mapEventFromApi';
import { guestService } from './services/guestService';
import { supplierService } from './services/supplierService';
import { budgetService } from './services/budgetService';
import { checklistService } from './services/checklistService';
import { tableService } from './services/tableService';

// Event management platform
interface Event {
  id: string;
  type: string;
  eventName?: string; // Nume personalizat pentru eveniment (ex: "Ziua de naștere 23 ani")
  customImage?: string; // URL sau base64 pentru imagine personalizată
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

interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  adults: number;
  children: number;
  attendees?: number; // deprecated, kept for backward compatibility
  notes?: string;
  tableId?: string;
  parentGuestId?: string;
  isChildrenOnly?: boolean;
  eventId?: string; // Link guest to specific event
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  price: number;
  priceType: 'FIX_EVENT' | 'PER_INVITAT';
  unitLabel?: string;
  minUnits?: number;
  rating: number;
  contact: string;
  location: string;
  selected: boolean;
  description?: string;
  isCustom?: boolean;
  eventId?: string; // Link supplier to specific event
}

interface BudgetItem {
  id: string;
  supplierId?: string;
  category: string;
  name: string;
  estimatedPrice: number;
  realPrice: number;
  paymentStatus: 'unpaid' | 'deposit' | 'paid';
  eventId?: string; // Link budget item to specific event
}

interface Table {
  id: string;
  name: string;
  totalSeats: number;
  occupiedSeats: number;
  eventId?: string; // Link table to specific event
}

interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  dueDate?: string;
  eventId?: string; // Link checklist item to specific event
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
  activeEventId: string | null;
  setActiveEventId: (id: string | null) => void;
  event: Event | null; // For backward compatibility
  setEvent: (event: Event) => void; // For backward compatibility
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
  budgetItems: BudgetItem[];
  setBudgetItems: (items: BudgetItem[]) => void;
  tables: Table[];
  setTables: (tables: Table[]) => void;
  checklist: ChecklistItem[];
  setChecklist: (items: ChecklistItem[]) => void;
  rsvpGuestId: string | null;
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bootstrapLoading, setBootstrapLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState<'wizard' | 'dashboard' | 'landing'>('wizard');
  const [events, setEvents] = useState<Event[]>([]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  // Auth/bootstrap
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setEvents([]);
      setActiveEventId(null);
      setCurrentView('wizard');
      setGuests([]);
      setSuppliers([]);
      setBudgetItems([]);
      setTables([]);
      setChecklist([]);
    };
    window.addEventListener('auth:logout', handleLogout);

    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setBootstrapLoading(false);
        return;
      }
      try {
        await authService.getCurrentUser();
        setIsAuthenticated(true);
        const apiEvents = await eventService.getEvents();
        const mapped = apiEvents.map(mapEventFromApi);
        setEvents(mapped);
        if (mapped.length > 0) {
          setActiveEventId(mapped[0].id);
          setCurrentView('dashboard');
        } else {
          setCurrentView('wizard');
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentView('wizard');
      } finally {
        setBootstrapLoading(false);
      }
    };

    init();
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);
  
  const rsvpGuestId = new URLSearchParams(window.location.search).get('guest');
  const landingParam = new URLSearchParams(window.location.search).get('landing');
  const publicLandingPath = /^\/landing\/[^/]+$/.test(window.location.pathname);

  // Reload event-scoped data when activeEventId changes
  useEffect(() => {
    const loadAll = async () => {
      if (!isAuthenticated || !activeEventId) {
        setGuests([]);
        setSuppliers([]);
        setBudgetItems([]);
        setTables([]);
        setChecklist([]);
        return;
      }
      try {
        const [g, s, b, t, c] = await Promise.all([
          guestService.getGuests(parseInt(activeEventId)),
          supplierService.getSuppliers(parseInt(activeEventId)),
          budgetService.getBudgetItems(parseInt(activeEventId)),
          tableService.getTables(parseInt(activeEventId)),
          checklistService.getChecklistItems(parseInt(activeEventId)),
        ]);
        setGuests(g || []);
        setSuppliers(s || []);
        
        // Map budget items from API to frontend structure
        const mappedBudgetItems = (b || []).map((item: any) => ({
          id: item.id.toString(),
          supplierId: item.supplier_id?.toString(),
          category: item.category || '📋 General',
          name: item.name,
          estimatedPrice: item.estimated_cost || 0,
          realPrice: item.actual_cost || 0,
          paymentStatus: item.payment_status || 'unpaid',
          eventId: activeEventId
        }));
        
        setBudgetItems(mappedBudgetItems);
        setTables(t || []);
        setChecklist(c || []);
      } catch (err) {
        console.error('Failed to load event data', err);
      }
    };
    loadAll();
  }, [isAuthenticated, activeEventId]);

  if (bootstrapLoading) {
    return <div className="flex items-center justify-center min-h-screen">Se încarcă sesiunea...</div>;
  }

  // Get active event
  const activeEvent = events.find(e => e.id === activeEventId) || null;

  const value: AppContextType = {
    isAuthenticated,
    setIsAuthenticated,
    currentView,
    setCurrentView,
    events,
    setEvents,
    activeEventId,
    setActiveEventId,
    event: activeEvent, // For backward compatibility
    setEvent: (event: Event) => { // For backward compatibility
      setEvents(prevEvents => {
        const index = prevEvents.findIndex(e => e.id === event.id);
        if (index >= 0) {
          const newEvents = [...prevEvents];
          newEvents[index] = event;
          return newEvents;
        }
        return [...prevEvents, event];
      });
      setActiveEventId(event.id);
    },
    guests,
    setGuests,
    suppliers,
    setSuppliers,
    budgetItems,
    setBudgetItems,
    tables,
    setTables,
    checklist,
    setChecklist,
    rsvpGuestId,
    showLogin,
    setShowLogin,
    authMode,
    setAuthMode,
  };

  // Public landing page (no authentication required)
  if (landingParam || publicLandingPath) {
    return (
      <AppContext.Provider value={value}>
        <PublicLanding />
      </AppContext.Provider>
    );
  }

  if (rsvpGuestId) {
    return (
      <AppContext.Provider value={value}>
        <RSVPForm />
      </AppContext.Provider>
    );
  }

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <AppContext.Provider value={value}>
          <Login onBackToLanding={() => setShowLogin(false)} initialMode={authMode} />
        </AppContext.Provider>
      );
    }
    return (
      <AppContext.Provider value={value}>
        <MarketingLanding 
          onLogin={() => {
            setAuthMode('login');
            setShowLogin(true);
          }}
          onRegister={() => {
            setAuthMode('signup');
            setShowLogin(true);
          }}
        />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen bg-white flex">
        {currentView !== 'wizard' && (
          <>
            {/* Event Sidebar */}
            <EventSidebar
              events={events}
              activeEventId={activeEventId}
              onSelectEvent={(eventId) => {
                setActiveEventId(eventId);
              }}
              onCreateEvent={() => {
                setActiveEventId(null);
                setCurrentView('wizard');
              }}
              onRenameEvent={(eventId, newName) => {
                setEvents(prevEvents =>
                  prevEvents.map(e =>
                    e.id === eventId ? { ...e, type: newName } : e
                  )
                );
              }}
              onDeleteEvent={async (eventId) => {
                console.log('onDeleteEvent called with eventId:', eventId);
                // Don't allow deleting the last event
                if (events.length === 1) {
                  alert('Nu poți șterge ultimul eveniment!');
                  return;
                }
                
                try {
                  console.log('Calling eventService.deleteEvent...');
                  // Delete from backend first
                  await eventService.deleteEvent(parseInt(eventId));
                  console.log('Backend deletion successful');
                  
                  // Then update local state
                  setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
                  console.log('Local state updated');
                  
                  // If deleting active event, switch to another one
                  if (activeEventId === eventId) {
                    const remainingEvents = events.filter(e => e.id !== eventId);
                    if (remainingEvents.length > 0) {
                      setActiveEventId(remainingEvents[0].id);
                    }
                  }
                } catch (error) {
                  console.error('Failed to delete event:', error);
                  alert('Eroare la ștergerea evenimentului');
                }
              }}
            />

            {/* Top Navigation */}
            <nav className="bg-white h-[65px] fixed left-0 right-0 top-0 z-10">
              <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
              <div className="content-stretch flex flex-col items-start pb-px pt-0 px-[64px] relative size-full">
                <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full">
                  {/* Logo */}
                  <div className="h-[32px] relative shrink-0 w-[128.391px]">
                    <img alt="POLUBVI" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={polubviLogo} />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative">
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                        currentView === 'dashboard' ? 'bg-[#101828]' : ''
                      }`}
                    >
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                          currentView === 'dashboard' ? 'text-white' : 'text-[#4a5565]'
                        }`}>
                          Dashboard
                        </p>
                      </div>
                    </button>

                    {activeEvent && (
                      <>
                        <button
                          onClick={() => setCurrentView('checklist')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'checklist' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'checklist' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Checklist
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentView('suppliers')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'suppliers' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'suppliers' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Furnizori
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentView('budget')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'budget' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'budget' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Buget
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentView('guests')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'guests' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'guests' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Invitați
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentView('tables')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'tables' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'tables' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Mese
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentView('landing')}
                          className={`h-[40px] relative rounded-[1.67772e+07px] shrink-0 ${
                            currentView === 'landing' ? 'bg-[#101828]' : ''
                          }`}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-center text-nowrap tracking-[-0.3125px] ${
                              currentView === 'landing' ? 'text-white' : 'text-[#4a5565]'
                            }`}>
                              Constructor
                            </p>
                          </div>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        localStorage.clear();
                        setIsAuthenticated(false);
                        setEvents([]);
                        setActiveEventId(null);
                        setGuests([]);
                        setBudgetItems([]);
                        setChecklist([]);
                        setCurrentView('dashboard');
                      }}
                      className="h-[40px] relative rounded-[1.67772e+07px] shrink-0"
                    >
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full px-4 flex items-center justify-center">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#e7000b] text-[16px] text-center text-nowrap tracking-[-0.3125px]">
                          Ieșire
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}

        {/* Main Content */}
        <main className={currentView === 'wizard' ? 'flex-1' : 'flex-1 ml-[279px] mt-[65px] py-8'}>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'wizard' && <EventWizard />}
          {currentView === 'checklist' && <Checklist />}
          {currentView === 'suppliers' && <Suppliers />}
          {currentView === 'budget' && <Budget />}
          {currentView === 'guests' && <GuestList />}
          {currentView === 'tables' && <TableArrangement />}
          {currentView === 'landing' && <LandingBuilder />}
          {currentView === 'public-landing' && <PublicLanding />}
          {currentView === 'marketing-landing' && <MarketingLanding />}
        </main>
      </div>
    </AppContext.Provider>
  );
}
