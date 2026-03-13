import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { defaultSuppliers } from '../../data/suppliers';
import svgPathsEye from '../../imports/svg-j8gx8xj9k2';
import svgPathsMobile from '../../imports/svg-pdnv9up2ou';
import { authService, eventService } from '../../services';
import { mapEventFromApi } from '../../utils/mapEventFromApi';

import corporateImg from 'figma:asset/4e815f4fc6dfedf9044f5dfd67d3d094851e0b8a.png';
import anniversaryImg from 'figma:asset/8ef9e5a6b81c2de01053c4b39beb1fa17e08453a.png';
import weddingImg from 'figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png';
import babyShowerImg from 'figma:asset/66cb4c28a8c243d16a3e3664d6f82e019cdb3394.png';
import otherEventImg from 'figma:asset/df9c3e29e618246d377d0e2a4c1857c9d744d483.png';
import christeningImg from 'figma:asset/e25e65a1d04953d1ddbc8fa6671ec1ad7e344c13.png';
import birthdayImg from 'figma:asset/c62f1af1fab83475a987c6e8c4446613340ebfcb.png';
import imgLogoPolubvi from 'figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png';

interface LoginProps {
  onBackToLanding?: () => void;
  initialMode?: 'login' | 'signup';
}

export function Login({ onBackToLanding, initialMode = 'login' }: LoginProps) {
  const { 
    setIsAuthenticated, 
    setEvent, 
    setEvents,
    setActiveEventId,
    setGuests, 
    setBudgetItems, 
    setChecklist, 
    setSuppliers,
    setTables,
    setCurrentView,
    setShowLogin
  } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');

  const eventSlides = [
    {
      type: 'Nuntă',
      description: 'Creează ziua ta de vis',
      image: weddingImg
    },
    {
      type: 'Zi de naștere',
      description: 'Fă fiecare aniversare de neuitat',
      image: birthdayImg
    },
    {
      type: 'Botez',
      description: 'Primii pași într-o călătorie specială',
      image: christeningImg
    },
    {
      type: 'Eveniment corporate',
      description: 'Evenimente profesionale care inspiră',
      image: corporateImg
    },
    {
      type: 'Aniversare',
      description: 'Onorează momentele tale speciale',
      image: anniversaryImg
    },
    {
      type: 'Baby shower',
      description: 'Celebrează noi începuturi',
      image: babyShowerImg
    },
    {
      type: 'Altele',
      description: 'Orice eveniment special pentru tine',
      image: otherEventImg
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventSlides.length) % eventSlides.length);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Vă rugăm completați toate câmpurile');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email invalid');
      return;
    }

    try {
      // Call API to login
      await authService.login({ email, password });

      // Fetch events to decide destination
      const apiEvents = await eventService.getEvents();
      const mapped = apiEvents.map(mapEventFromApi);
      setEvents(mapped);
      if (mapped.length > 0) {
        setActiveEventId(mapped[0].id);
        setCurrentView('dashboard');
      } else {
        setCurrentView('wizard');
      }
      setIsAuthenticated(true);
      setShowLogin(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Email sau parolă incorectă');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      setError('Vă rugăm completați toate câmpurile');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email invalid');
      return;
    }

    // Validate password length
    if (password.length < 3) {
      setError('Parola trebuie să aibă minim 3 caractere');
      return;
    }

    if (password !== confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    try {
      // Call API to register
      await authService.register({ email, password, name });

      // Auto-login after registration
      await authService.login({ email, password });
      
      const apiEvents = await eventService.getEvents();
      const mapped = apiEvents.map(mapEventFromApi);
      setEvents(mapped);
      if (mapped.length > 0) {
        setActiveEventId(mapped[0].id);
        setCurrentView('dashboard');
      } else {
        setCurrentView('wizard');
      }
      setIsAuthenticated(true);
      setShowLogin(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Înregistrarea a eșuat');
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const handleDemoLogin = () => {
    // Create a complete demo event
    const demoEvent = {
      id: 'demo-1',
      type: 'Nuntă',
      status: 'planning',
      date: '2025-08-15',
      city: 'Chișinău',
      guestCount: 120,
      vibe: 'Romantic și elegant',
      services: ['Fotografie', 'Videografie', 'Muzică', 'Decor'],
      budget: 150000
    };

    const demoGuests = [
      { id: '1', name: 'Ion Popescu', email: 'ion@email.com', phone: '069123456', rsvpStatus: 'confirmed' as const, attendees: 2, adults: 2, children: 0, notes: 'Vegetarian', tableId: '1', withPartner: true, withChildren: false },
      { id: '2', name: 'Maria Ionescu', email: 'maria@email.com', phone: '069234567', rsvpStatus: 'confirmed' as const, attendees: 1, adults: 1, children: 0, notes: '', tableId: '1', withPartner: false, withChildren: false },
      { id: '3', name: 'Vasile Gheorghe', email: 'vasile@email.com', phone: '069345678', rsvpStatus: 'pending' as const, attendees: 3, adults: 2, children: 1, notes: 'Cu copii', tableId: '2', withPartner: true, withChildren: true },
      { id: '4', name: 'Elena Rusu', email: 'elena@email.com', phone: '069456789', rsvpStatus: 'confirmed' as const, attendees: 2, adults: 2, children: 0, notes: '', tableId: '2', withPartner: true, withChildren: false },
      { id: '5', name: 'Andrei Moraru', email: 'andrei@email.com', phone: '069567890', rsvpStatus: 'confirmed' as const, attendees: 1, adults: 1, children: 0, notes: '', tableId: '3', withPartner: false, withChildren: false },
      { id: '6', name: 'Natalia Popa', email: 'natalia@email.com', phone: '069678901', rsvpStatus: 'pending' as const, attendees: 2, adults: 2, children: 0, notes: 'Alergii la nuci', tableId: '3', withPartner: true, withChildren: false },
      { id: '7', name: 'Dumitru Ciobanu', email: 'dumitru@email.com', phone: '069789012', rsvpStatus: 'confirmed' as const, attendees: 4, adults: 2, children: 2, notes: '', tableId: '4', withPartner: true, withChildren: true },
      { id: '8', name: 'Cristina Lungu', email: 'cristina@email.com', phone: '069890123', rsvpStatus: 'confirmed' as const, attendees: 2, adults: 2, children: 0, notes: '', tableId: '4', withPartner: true, withChildren: false },
    ];

    const demoBudget = [
      { id: '1', category: '📸 Media & conținut', name: 'Studio Foto Premium', estimatedPrice: 3500, realPrice: 3500, paymentStatus: 'deposit' as const, supplierId: '8' },
      { id: '2', category: '📸 Media & conținut', name: 'Cinema Dreams', estimatedPrice: 4200, realPrice: 4000, paymentStatus: 'deposit' as const, supplierId: '10' },
      { id: '3', category: '🎤 Entertainment & atmosferă', name: 'Live Band Events', estimatedPrice: 3000, realPrice: 3000, paymentStatus: 'unpaid' as const, supplierId: '2' },
      { id: '4', category: '🍽️ Mâncare & băuturi', name: 'Restaurant Belvedere', estimatedPrice: 80000, realPrice: 75000, paymentStatus: 'deposit' as const, supplierId: '23' },
      { id: '5', category: '🌸 Decor & styling', name: 'Floral Paradise', estimatedPrice: 2500, realPrice: 2800, paymentStatus: 'unpaid' as const, supplierId: '16' },
      { id: '6', category: '🍽️ Mâncare & băuturi', name: 'Sweet Delights', estimatedPrice: 800, realPrice: 800, paymentStatus: 'paid' as const, supplierId: '27' },
      { id: '7', category: '💡 Tehnic & logistic', name: 'Sound Pro Systems', estimatedPrice: 2000, realPrice: 2000, paymentStatus: 'unpaid' as const, supplierId: '31' },
    ];

    const demoChecklist = [
      { id: '1', task: '⭐ Caută opțiuni pentru Mâncare & băuturi', category: '🍽️ Mâncare & băuturi', completed: true, dueDate: '2025-02-15' },
      { id: '2', task: '⭐ Compară prețuri Mâncare & băuturi', category: '🍽️ Mâncare & băuturi', completed: true, dueDate: '2025-03-01' },
      { id: '3', task: '⭐ Rezervă Media & conținut', category: '📸 Media & conținut', completed: true, dueDate: '2025-03-15' },
      { id: '4', task: '⭐ Confirmă detalii finale Media & conținut', category: '📸 Media & conținut', completed: false, dueDate: '2025-04-01' },
      { id: '5', task: 'Caută opțiuni pentru Decor & styling', category: '🌸 Decor & styling', completed: false, dueDate: '2025-04-15' },
      { id: '6', task: 'Compară prețuri Decor & styling', category: '🌸 Decor & styling', completed: false, dueDate: '2025-05-01' },
      { id: '7', task: 'Rezervă Entertainment & atmosferă', category: '🎤 Entertainment & atmosferă', completed: false, dueDate: '2025-06-01' },
      { id: '8', task: 'Trimite invitațiile', category: '📋 General task', completed: false, dueDate: '2025-06-15' },
    ];

    const demoSuppliers = defaultSuppliers;

    const demoTables = [
      { id: '1', name: 'Masa 1', totalSeats: 8, occupiedSeats: 3 },
      { id: '2', name: 'Masa 2', totalSeats: 8, occupiedSeats: 5 },
      { id: '3', name: 'Masa 3', totalSeats: 10, occupiedSeats: 3 },
      { id: '4', name: 'Masa 4', totalSeats: 10, occupiedSeats: 6 },
      { id: '5', name: 'Masa 5', totalSeats: 6, occupiedSeats: 0 },
    ];

    // Save to localStorage
    localStorage.setItem('event', JSON.stringify(demoEvent));
    localStorage.setItem('guests', JSON.stringify(demoGuests));
    localStorage.setItem('budgetItems', JSON.stringify(demoBudget));
    localStorage.setItem('checklist', JSON.stringify(demoChecklist));
    localStorage.setItem('suppliers', JSON.stringify(demoSuppliers));
    localStorage.setItem('tables', JSON.stringify(demoTables));
    localStorage.setItem('currentView', 'dashboard');
    localStorage.setItem('isAuthenticated', 'true');

    // Set in state
    setEvent(demoEvent);
    setGuests(demoGuests);
    setBudgetItems(demoBudget);
    setChecklist(demoChecklist);
    setSuppliers(demoSuppliers);
    setTables(demoTables);
    setCurrentView('dashboard');
    setIsAuthenticated(true);
  };

  return (
    <>
      {/* MOBILE VERSION -Visible on small screens */}
      <div className="lg:hidden min-h-screen bg-white relative">
        {/* Nav */}
        <div className="bg-white relative w-full border-b border-[#f5f5f5]">
          <div className="flex items-center justify-between pb-[20px] pt-[22px] px-[16px]">
            <img src={imgLogoPolubvi} alt="POLUBVI" className="h-[24px] w-[96px]" />
            <div className="size-[28px]">
              <svg className="block size-full" fill="none" viewBox="0 0 28 28">
                <path d={svgPathsMobile.p3067a680} fill="black" />
                <path d={svgPathsMobile.p2c5d6280} fill="black" />
                <path d={svgPathsMobile.p24ae58c0} fill="black" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content with Autolayout */}
        <div className="px-[16px] pt-[44px]">
          {/* Back Button */}
          <div className="mb-[44px]">
            <button 
              type="button"
              onClick={() => setShowLogin(false)}
              className="flex items-center gap-2"
            >
              <div className="size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 15.9943 15.9943">
                  <path d={svgPathsMobile.p24f45e00} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
                  <path d="M12.6622 7.99715H3.33214" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
                </svg>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.15px]">
                Înapoi la site
              </p>
            </button>
          </div>

          {/* Title with Autolayout */}
          <div className="mb-[16px]">
            <h1 className="font-['Inter:Medium',sans-serif] font-medium leading-[43px] text-[#960010] text-[43px] tracking-[-2.58px] uppercase">
              {isSignUp ? 'ÎNREGISTREAZĂ-TE' : 'LOGHEAZĂ-TE'}
            </h1>
          </div>

          {/* Subtitle with Autolayout */}
          <div className="mb-[56px]">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] text-[#4a5565] text-[15px] tracking-[-0.23px]">
              <span className="underline cursor-pointer hover:text-[#960010]" onClick={toggleMode}>
                Creează un cont gratuit
              </span>
              {' '}sau autentifică-te pentru a începe
            </p>
          </div>

          {/* Form with Autolayout */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-[24px]">
            {isSignUp && (
              <div className="space-y-[8px]">
                <label className="block font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#364153] text-[14px] tracking-[-0.15px]">
                  Nume
                </label>
                <div className="relative h-[52px] rounded-[52px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-full px-[16px] rounded-[inherit] border border-[#d1d5dc] font-['Inter:Regular',sans-serif] text-[16px] tracking-[-0.31px] text-black placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-black hover:border-black"
                    placeholder="Numele tău"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-[8px]">
              <label className="block font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#364153] text-[14px] tracking-[-0.15px]">
                Email
              </label>
              <div className="relative h-[52px] rounded-[52px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full px-[16px] rounded-[inherit] border border-[#d1d5dc] font-['Inter:Regular',sans-serif] text-[16px] tracking-[-0.31px] text-black placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-black hover:border-black"
                  placeholder="exemplu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-[8px]">
              <label className="block font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#364153] text-[14px] tracking-[-0.15px]">
                Parolă
              </label>
              <div className="relative h-[52px] rounded-[52px]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full px-[16px] pr-[48px] rounded-[inherit] border border-[#d1d5dc] font-['Inter:Regular',sans-serif] text-[16px] tracking-[-0.31px] text-black placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-black hover:border-black"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[16px] top-1/2 -translate-y-1/2"
                >
                  <div className="h-[20px] w-[20px] overflow-clip relative">
                    <div className="absolute inset-[20.84%_8.33%]">
                      <div className="absolute inset-[-7.14%_-5%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3342 13.3323">
                          <path d={svgPathsMobile.pcb0000} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[37.5%]">
                      <div className="absolute inset-[-16.67%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                          <path d={svgPathsMobile.p2314a170} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-[8px]">
                <label className="block font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#364153] text-[14px] tracking-[-0.15px]">
                  Confirmă parola
                </label>
                <div className="relative h-[52px] rounded-[52px]">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-full px-[16px] pr-[48px] rounded-[inherit] border border-[#d1d5dc] font-['Inter:Regular',sans-serif] text-[16px] tracking-[-0.31px] text-black placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-black hover:border-black"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-[16px] top-1/2 -translate-y-1/2"
                  >
                    <div className="h-[20px] w-[20px] overflow-clip relative">
                      <div className="absolute inset-[20.84%_8.33%]">
                        <div className="absolute inset-[-7.14%_-5%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3342 13.3323">
                            <path d={svgPathsMobile.pcb0000} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[37.5%]">
                        <div className="absolute inset-[-16.67%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                            <path d={svgPathsMobile.p2314a170} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-full text-sm">
                {error}
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.15px] underline hover:text-[#960010]">
                  Ai uitat parola?
                </a>
              </div>
            )}

            {/* Buttons Group */}
            <div className="space-y-[14px] pt-[20px]">
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[48px] bg-black hover:bg-[#960010] text-white rounded-[48px] transition-all"
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] text-[15px] text-center tracking-[-0.16px]">
                  {isSignUp ? 'Înregistrează-te' : 'Autentifică-te'}
                </p>
              </button>

              {/* Demo Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full h-[48px] bg-white hover:bg-gray-50 text-black rounded-[48px] border border-[#e7e7e7] transition-all hover:border-black hover:text-black"
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] text-[15px] text-center tracking-[-0.16px]">
                  Cont demo
                </p>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-[48px] pt-[24px] border-t border-[#e5e7eb]">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#6a7282] text-[12px] text-center mb-[8px]">
              Demo: folosește orice email și o parolă cu cel puțin 6 caractere
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#6a7282] text-[12px] text-center">
              sau apasă "Cont Demo" pentru acces instant
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP VERSION - Hidden on small screens */}
      <div className="hidden lg:flex min-h-screen flex-col lg:flex-row relative bg-[#fff8f3]">
        {/* Left side - Carousel - EXACT 50% */}
        <div className="lg:w-1/2 relative overflow-hidden bg-black min-h-screen">
          <div className="absolute inset-0">
            {/* Carousel Images */}
            {eventSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.type}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] via-50% via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.7)]"></div>
              </div>
            ))}

            {/* Content */}
            <div className="absolute inset-0">
              {/* Logo POLUBVI - top: 60px, left: 60.37px */}
              <div 
                className="absolute left-[60.37px] top-[60px] shadow-[0px_6px_27.7px_0px_rgba(0,0,0,0.25)]"
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.78] text-[88px] text-center text-white tracking-[-5.28px] uppercase w-[343px]">
                  POLUBVI
                </p>
              </div>
              
              {/* Description - bottom: 71.82px, left: 60.37px */}
              <div className="absolute bottom-[71.82px] left-[60.37px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] text-[18px] text-[rgba(255,255,255,0.9)] tracking-[-0.4395px] whitespace-nowrap">
                  {eventSlides[currentSlide].description}
                </p>
              </div>
              
              {/* Event Type - 20px ABOVE description, aligned LEFT */}
              <div className="absolute bottom-[111.82px] left-[60.37px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.8] text-[50px] text-white tracking-[-3px] uppercase whitespace-nowrap">
                  {eventSlides[currentSlide].type}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-[24px] top-[437px] w-[48px] h-[48px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-[24px] top-[437px] w-[48px] h-[48px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d="M9 18L15 12L9 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex gap-[8px] h-[8px] z-10">
              {eventSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-[32px] h-[8px]' 
                      : 'bg-[rgba(255,255,255,0.5)] w-[8px] h-[8px] hover:bg-[rgba(255,255,255,0.7)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Login Form - EXACT 50% */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-0 bg-white min-h-screen">
          <div className="w-full max-w-[480px] px-8">
            {/* Back Button */}
            <div className="mb-12">
              <button 
                type="button"
                onClick={() => setShowLogin(false)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path d={svgPathsEye.p203476e0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M12.6667 8H3.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
                <span className="text-sm">Înapoi la site</span>
              </button>
            </div>

            {/* Title */}
            <div className="mb-3">
              <h1 className="text-[60px] leading-[1] text-[#960010] uppercase font-medium tracking-tight">
                {isSignUp ? 'ÎNREGISTREAZĂ-TE' : 'LOGHEAZĂ-TE'}
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="mb-12">
              <p className="text-gray-600 text-[15px]">
                {isSignUp ? (
                  <>
                    <span className="underline cursor-pointer hover:text-[#960010]" onClick={toggleMode}>
                      Creează un cont gratuit
                    </span>
                    {' '}sau autentifică-te pentru a începe
                  </>
                ) : (
                  <>
                    <span className="underline cursor-pointer hover:text-[#960010]" onClick={toggleMode}>
                      Creează un cont gratuit
                    </span>
                    {' '}sau autentifică-te pentru a începe
                  </>
                )}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">
                    Nume
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[52px] px-4 border border-gray-300 rounded-full focus:border-black hover:border-black focus:outline-none transition-colors"
                    placeholder="Numele tău"
                  />
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[52px] px-4 border border-gray-300 rounded-full focus:border-black hover:border-black focus:outline-none transition-colors"
                  placeholder="exemplu@email.com"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-700 font-medium">
                  Parolă
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[52px] px-4 pr-12 border border-gray-300 rounded-full focus:border-black hover:border-black focus:outline-none transition-colors"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <div className="h-[20px] w-[20px] overflow-clip relative">
                      <div className="absolute inset-[20.84%_8.33%]">
                        <div className="absolute inset-[-7.14%_-5%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3342 13.3323">
                            <path d={svgPathsEye.pcb0000} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[37.5%]">
                        <div className="absolute inset-[-16.67%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                            <path d={svgPathsEye.p2314a170} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">
                    Confirmă parola
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-[52px] px-4 pr-12 border border-gray-300 rounded-full focus:border-black hover:border-black focus:outline-none transition-colors"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <div className="h-[20px] w-[20px] overflow-clip relative">
                        <div className="absolute inset-[20.84%_8.33%]">
                          <div className="absolute inset-[-7.14%_-5%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3342 13.3323">
                              <path d={svgPathsEye.pcb0000} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute inset-[37.5%]">
                          <div className="absolute inset-[-16.67%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                              <path d={svgPathsEye.p2314a170} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-full text-sm">
                  {error}
                </div>
              )}

              {!isSignUp && (
                <div className="text-right">
                  <a href="#" className="text-sm text-gray-600 underline hover:text-[#960010] transition-colors">
                    Ai uitat parola?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[52px] bg-black hover:bg-[#960010] text-white rounded-full transition-all font-medium"
              >
                {isSignUp ? 'Înregistrează-te' : 'Loghează-te'}
              </button>
              
              {/* Demo Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full h-[52px] bg-white hover:bg-gray-50 text-black rounded-full transition-all border border-gray-200 font-medium hover:border-black focus:border-black"
              >
                Cont demo
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>Demo: folosește orice email și o parolă cu cel puțin 6 caractere</p>
              <p>sau apasă "Cont Demo" pentru acces instant</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
