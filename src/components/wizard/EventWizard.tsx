import React, { useState, useEffect } from "react";
import { useAppContext } from "../../App";
import {
  ArrowLeft,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import logo from "figma:asset/ba043d98652388ce721c6928ea9c49588aadc2f4.png";
import corporateImg from "figma:asset/4e815f4fc6dfedf9044f5dfd67d3d094851e0b8a.png";
import anniversaryImg from "figma:asset/8ef9e5a6b81c2de01053c4b39beb1fa17e08453a.png";
import weddingImg from "figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png";
import babyShowerImg from "figma:asset/66cb4c28a8c243d16a3e3664d6f82e019cdb3394.png";
import otherEventImg from "figma:asset/df9c3e29e618246d377d0e2a4c1857c9d744d483.png";
import christeningImg from "figma:asset/e25e65a1d04953d1ddbc8fa6671ec1ad7e344c13.png";
import birthdayImg from "figma:asset/c62f1af1fab83475a987c6e8c4446613340ebfcb.png";
import step3DateImg from "figma:asset/025f8384aa9612d786bcaac59d739f90b70396e8.png";
import step2StatusImg from "figma:asset/63a844a262b376c77d55db66d02dd219f7120c1e.png";
import step4VenueImg from "figma:asset/dd77f38d8f658b2a94eb26814cb6c1a472a5eea4.png";
import step5GuestsImg from "figma:asset/87b3d65caff488e66a0cd6ebab715781fc2616bd.png";
import step6ServicesImg from "figma:asset/79fe1bccae682c7d2543e93a7759f0ab4776bfd4.png";
import step7BudgetImg from "figma:asset/19ed1eb23208ef596bfbc884d82d733549a3f260.png";
import step8PackagesImg from "figma:asset/c5eab9c61fef49ee6906f4a39a16396a28cfc887.png";
import {
  wizardService,
  type WizardSupplier,
  type Package,
} from "../../services/wizardService";
import { mapEventFromApi } from "../../utils/mapEventFromApi";

export function EventWizard() {
  const {
    setEvent,
    setEvents,
    activeEventId,
    setActiveEventId,
    setCurrentView,
    setChecklist,
    suppliers,
    setSuppliers,
    setBudgetItems,
  } = useAppContext();
  const [step, setStep] = useState(1);
  const [initializing, setInitializing] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [selectedEventImage, setSelectedEventImage] = useState(
    "https://images.unsplash.com/photo-1766164416026-1a823688d106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbnQlMjBwbGFubmluZ3xlbnwxfHx8fDE3NjY3NzA4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  );
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    customType: "",
    status: "",
    dateType: "", // 'exact', 'month', 'not-sure'
    exactDate: "",
    monthYear: "",
    selectedMonth: "",
    selectedYear: "",
    venue: "",
    venueUnknown: false,
    venuePricePerGuest: 0,
    guestRange: "",
    services: [] as string[],
    budget: 0,
    hasBudget: true,
  });

  // create draft on mount
  React.useEffect(() => {
    const createDraft = async () => {
      // Don't create a new draft if we already have an activeEventId
      if (activeEventId) {
        console.log(
          "DEBUG WIZARD: Using existing activeEventId:",
          activeEventId
        );
        setInitializing(false);
        return;
      }

      try {
        const draft = await wizardService.startWizard({
          title: "Eveniment nou",
        });
        console.log("DEBUG WIZARD: Created draft with ID:", draft.id);
        setActiveEventId(draft.id.toString());
        console.log("DEBUG WIZARD: Set activeEventId to:", draft.id.toString());
      } catch (err) {
        setSaveError("Nu am putut crea draft-ul evenimentului.");
      } finally {
        setInitializing(false);
      }
    };
    createDraft();
  }, [activeEventId, setActiveEventId]);

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Service categories collapse state
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Venue state
  const [customVenues, setCustomVenues] = useState<
    Array<{ name: string; pricePerGuest: number }>
  >([]);
  const [showAddVenueForm, setShowAddVenueForm] = useState(false);
  const [newVenueName, setNewVenueName] = useState("");
  const [newVenuePrice, setNewVenuePrice] = useState("");
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [venueSearchTerm, setVenueSearchTerm] = useState("");

  const totalSteps = 8;

  // Helper to get event ID as number
  const getEventId = (): number | null => {
    return activeEventId ? parseInt(activeEventId) : null;
  };

  // Images for each step
  const stepImages = [
    "https://images.unsplash.com/photo-1766164416026-1a823688d106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbnQlMjBwbGFubmluZ3xlbnwxfHx8fDE3NjY3NzA4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    step2StatusImg,
    step3DateImg,
    step4VenueImg,
    step5GuestsImg,
    step6ServicesImg,
    step7BudgetImg,
    step8PackagesImg,
  ];

  const eventTypes = [
    { value: "wedding", label: "Nuntă", icon: "💒", image: weddingImg },
    {
      value: "birthday",
      label: "Zi de naștere",
      icon: "🎂",
      image: birthdayImg,
    },
    { value: "christening", label: "Botez", icon: "👶", image: christeningImg },
    {
      value: "corporate",
      label: "Eveniment corporate",
      icon: "💼",
      image: corporateImg,
    },
    {
      value: "anniversary",
      label: "Aniversare",
      icon: "💝",
      image: anniversaryImg,
    },
    {
      value: "baby-shower",
      label: "Baby shower",
      icon: "🍼",
      image: babyShowerImg,
    },
    { value: "other", label: "Altele", icon: "🎉", image: otherEventImg },
  ];

  const statuses = [
    "Abia începem planificarea",
    "Avem o dată stabilită",
    "Avem locația rezervată",
    "Am planificat deja unele părți",
  ];

  const guestRanges = ["0-20", "20-50", "50-100", "100-150", "150-200", "200+"];

  // Predefined venues with realistic prices for Moldova
  const predefinedVenues = [
    { name: "Restaurant Belvedere", pricePerGuest: 450 },
    { name: "Nobil Event Hall", pricePerGuest: 520 },
    { name: "Vila Roz", pricePerGuest: 380 },
    { name: "La Taifas Restaurant", pricePerGuest: 420 },
    { name: "Phoenix Grand Hall", pricePerGuest: 550 },
    { name: "Château Vartely", pricePerGuest: 600 },
    { name: "Restaurant Symposium", pricePerGuest: 410 },
    { name: "Salina Resort", pricePerGuest: 480 },
  ];

  // Function to add custom venue
  const handleAddCustomVenue = () => {
    if (newVenueName.trim() && newVenuePrice) {
      const price = parseInt(newVenuePrice);
      if (price > 0 && price <= 1000000) {
        setCustomVenues([
          ...customVenues,
          { name: newVenueName.trim(), pricePerGuest: price },
        ]);
        setFormData({
          ...formData,
          venue: newVenueName.trim(),
          venuePricePerGuest: price,
          venueUnknown: false,
        });
        setVenueSearchTerm(newVenueName.trim());
        setNewVenueName("");
        setNewVenuePrice("");
        setShowAddVenueForm(false);
      }
    }
  };

  // Function to select venue
  const handleSelectVenue = (venueName: string, pricePerGuest: number) => {
    setFormData({
      ...formData,
      venue: venueName,
      venuePricePerGuest: pricePerGuest,
      venueUnknown: false,
    });
    setVenueSearchTerm(venueName);
    setShowVenueDropdown(false);
  };

  // Get all venues (predefined + custom)
  const allVenues = [...predefinedVenues, ...customVenues];

  // Filter venues based on search term
  const filteredVenues = allVenues.filter((venue) =>
    venue.name.toLowerCase().includes(venueSearchTerm.toLowerCase())
  );

  const serviceCategories = [
    {
      name: "🎤 Entertainment & atmosferă",
      services: [
        "Muzică / DJ",
        "Formație live",
        "MC / Moderator",
        "Animatori (copii / adulți)",
        "Dansatori / show artistic",
        "Artiști invitați",
        "Karaoke",
        "Momente speciale (ursitoare, magician, focuri reci)",
      ],
    },
    {
      name: "📸 Media & conținut",
      services: [
        "Fotografie",
        "Videografie",
        "Dronă",
        "Photo Booth",
        "Video Booth 360°",
        "Cabină foto instant",
        "Live streaming",
      ],
    },
    {
      name: "🌸 Decor & styling",
      services: [
        "Decor eveniment (general)",
        "Decor floral",
        "Aranjamente mese",
        "Panou foto / backdrop",
        "Balonistică",
        "Lumânări / sfeșnice",
        "Tematică personalizată",
      ],
    },
    {
      name: "🍽️ Mâncare & băuturi",
      services: [
        "Restaurant",
        "Catering",
        "Candy bar",
        "Tort",
        "Prăjituri / deserturi",
        "Cocktail bar",
        "Bar mobil",
        "Degustări (vin)",
      ],
    },
    {
      name: "💡 Tehnic & logistic",
      services: [
        "Sonorizare",
        "Lumini",
        "Ecrane LED / proiector",
        "Scenă",
        "Generatoare",
        "Echipamente speciale",
      ],
    },
    {
      name: "💄 Beauty & pregătire",
      services: [
        "Makeup",
        "Hairstyling",
        "Styling vestimentar",
        "Rochii / costume (închiriere)",
        "Accesorii",
      ],
    },
    {
      name: "🚗 Logistică & suport",
      services: [
        "Transport invitați",
        "Transport artiști",
        "Transfer VIP",
        "Cazare invitați",
        "Coordonare ziua evenimentului",
        "Hostess / personal eveniment",
      ],
    },
    {
      name: "🧠 Organizare & planificare",
      services: [
        "Organizator eveniment",
        "Wedding planner",
        "Event manager",
        "Coordonator ziua evenimentului",
        "Consultanță eveniment",
        "Scenariu eveniment (timeline)",
      ],
    },
    {
      name: "🧾 Print & invitații",
      services: [
        "Invitații digitale",
        "Invitații tipărite",
        "Meniuri",
        "Place cards",
        "Numere de masă",
        "Panou welcome",
        "Mărturii invitați",
      ],
    },
  ];

  const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  );

  // Calendar functions
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateForInput = (day: number, month: number, year: number) => {
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${monthStr}-${dayStr}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
    const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(calendarMonth - 1, calendarYear);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const selectDate = (day: number) => {
    const dateString = formatDateForInput(day, calendarMonth, calendarYear);
    setFormData({ ...formData, exactDate: dateString });
    setShowCalendar(false);
  };

  const persistStep = async (currentStep: number) => {
    const eventId = getEventId();
    if (!eventId) return;

    if (currentStep === 1) {
      // Step 1: Tip eveniment + Titlu
      await wizardService.updateStep1(eventId, {
        title: formData.customType || formData.type || "Eveniment",
        event_type: formData.type,
      });
    } else if (currentStep === 2) {
      // Step 2: Stadiu planificare
      await wizardService.updateStep2(eventId, {
        planning_stage: formData.status,
      });
    } else if (currentStep === 3) {
      // Step 3: Data evenimentului
      const resolvedDate =
        formData.dateType === "exact" && formData.exactDate
          ? formData.exactDate
          : formData.dateType === "month" && formData.selectedMonth
          ? `${formData.selectedYear || new Date().getFullYear()}-${String(
              (months.indexOf(formData.selectedMonth) >= 0
                ? months.indexOf(formData.selectedMonth)
                : 0) + 1
            ).padStart(2, "0")}-01`
          : null;

      await wizardService.updateStep3(eventId, {
        date: resolvedDate,
        date_mode: formData.dateType,
        event_month: formData.selectedMonth
          ? months.indexOf(formData.selectedMonth) + 1
          : null,
        event_year: formData.selectedYear
          ? parseInt(formData.selectedYear)
          : null,
        time: null,
      });
    } else if (currentStep === 4) {
      // Step 4: Locația
      await wizardService.updateStep4(eventId, {
        city: formData.venue || "Not specified",
        venue_city: formData.venue,
        venue_name: formData.venue,
        address: formData.venue,
        location_mode: formData.venueUnknown ? "unknown" : "known",
        venue_price_per_guest: formData.venuePricePerGuest || undefined,
      });
    } else if (currentStep === 5) {
      // Step 5: Număr invitați (fără buget)
      const getGuestCount = (range: string) => {
        if (range === "200+") return 250;
        if (!range) return 0;
        const [min, max] = range.split("-").map(Number);
        return Math.round((min + max) / 2);
      };
      const guestCount = getGuestCount(formData.guestRange);
      await wizardService.updateStep5(eventId, {
        guest_count_estimated: guestCount,
        guest_count_min: guestCount,
        guest_count_max: guestCount,
        default_adults: 1,
        default_children: 0,
        budget_currency: "MDL",
      });
    } else if (currentStep === 6) {
      // Step 6: Servicii dorite
      await wizardService.updateStep6(eventId, {
        package_id:
          selectedPackage === "manual"
            ? undefined
            : selectedPackage || undefined,
        services: formData.services,
      });
    } else if (currentStep === 7) {
      // Step 7: Buget estimat (opțional)
      await wizardService.updateStep5(eventId, {
        has_budget: formData.hasBudget,
        budget_total_estimated: formData.hasBudget
          ? formData.budget
          : undefined,
        budget_currency: "MDL",
      });
    } else if (currentStep === 8) {
      // Step 8: Pachete / Finalizare
      await wizardService.updateStep8(eventId, {
        content_json: {},
        published: false,
      });
    }
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      await persistStep(step); // persist current step before moving
      setStep(step + 1);
    } else {
      completeWizard(selectedPackage || "manual");
    }
  };

  const handleGeneratePackages = async () => {
    const eventId = getEventId();
    if (!eventId) return;
    console.log("DEBUG WIZARD: Generating packages for eventId:", eventId);
    setPackagesLoading(true);
    try {
      await persistStep(6); // Persist step 6 (services) before generating packages
      const generated = await wizardService.generatePackages(eventId);
      setPackages(generated);
    } catch (err) {
      setSaveError("Nu am putut genera pachetele.");
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleSelectPackage = async (packageId: number) => {
    const eventId = getEventId();
    if (!eventId) return;
    try {
      const ev = await wizardService.selectPackage(eventId, packageId);
      setSelectedPackage(packageId.toString());
    } catch (err) {
      setSaveError("Nu am putut selecta pachetul.");
    }
  };

  const handleManualMode = async () => {
    const eventId = getEventId();
    if (!eventId) return;
    try {
      await wizardService.selectManual(eventId);
      setSelectedPackage("manual");
    } catch (err) {
      setSaveError("Nu am putut seta modul manual.");
    }
  };

  // Load or generate packages when we arrive at step 8
  useEffect(() => {
    const fetchOrGeneratePackages = async () => {
      const eventId = getEventId();
      if (!eventId || step !== 8) return;
      setPackagesLoading(true);
      try {
        // First try to load existing packages
        const existing = await wizardService.listPackages(eventId);
        if (existing && existing.length > 0) {
          setPackages(existing);
          const selected = existing.find((p) => p.is_selected);
          if (selected) {
            setSelectedPackage(selected.id.toString());
          }
        } else {
          // No packages exist, generate them automatically
          await persistStep(6); // Ensure services are saved
          const generated = await wizardService.generatePackages(eventId);
          setPackages(generated);
        }
      } catch (err) {
        setSaveError("Nu am putut încărca pachetele.");
      } finally {
        setPackagesLoading(false);
      }
    };
    fetchOrGeneratePackages();
  }, [activeEventId, step]);

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const completeWizard = async (packageId: string) => {
    if (saving) return;
    setSaveError("");
    setSaving(true);
    const eventId = getEventId();
    if (!eventId) {
      setSaveError("Draft-ul nu există. Reîncearcă.");
      setSaving(false);
      return;
    }

    try {
      await persistStep(8);
      const result = await wizardService.finalizeWizard(eventId);
      const mapped = mapEventFromApi(result.event);
      setEvents((prevEvents: any[]) => [...prevEvents, mapped]);
      setActiveEventId(mapped.id);
      setCurrentView("dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Nu am putut salva evenimentul. Încearcă din nou.";
      setSaveError(message);
      setSaving(false);
      return;
    }

    setSaving(false);
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  // create draft when wizard mounts - REMOVED, using activeEventId from context
  // Auto-select Restaurant service when venue is chosen
  React.useEffect(() => {
    if (
      step === 6 &&
      formData.venue &&
      !formData.venueUnknown &&
      !formData.services.includes("Restaurant")
    ) {
      setFormData((prev) => ({
        ...prev,
        services: ["Restaurant", ...prev.services],
      }));
    }
  }, [step, formData.venue, formData.venueUnknown]);

  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Se încarcă wizard-ul...
      </div>
    );
  }

  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Se încarcă wizard-ul...
      </div>
    );
  }

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <img
          src={step === 1 ? selectedEventImage : stepImages[step - 1]}
          alt={`Step ${step}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Top left - Logo */}
          <div className="text-white">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.78] text-[88px] text-white tracking-[-5.28px] uppercase">
              POLUBVI
            </p>
          </div>

          {/* Bottom - Step Info */}
          <div className="text-white">
            <p className="text-white/90 text-lg mb-4 font-['Inter:Regular',sans-serif]">
              Pasul {step} din {totalSteps}
            </p>
            <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white h-screen">
        {/* Header - Logo & Progress (Fixed Top) */}
        <div className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-gray-100">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-6 text-center">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[32px] text-[#960010] tracking-[-1.92px] uppercase">
              POLUBVI
            </p>
          </div>

          {/* Progress bar for mobile */}
          <div className="lg:hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600 font-['Inter:Regular',sans-serif]">
                Pasul {step} din {totalSteps}
              </span>
              <span className="text-sm text-gray-600 font-['Inter:Medium',sans-serif]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#960010] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8">
          <div className="w-full max-w-[480px] mx-auto py-8">
            {step === 1 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  CE TIP DE EVENIMENT ORGANIZEZI?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Selectează tipul evenimentului pentru recomandări
                  personalizate
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setFormData({ ...formData, type: type.value });
                        setSelectedEventImage(type.image);
                      }}
                      className={`relative p-6 rounded-[2px] border transition-all text-left group overflow-hidden ${
                        formData.type === type.value
                          ? "border-black bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Small event image */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={type.image}
                            alt={type.label}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-900 font-['Inter:Medium',sans-serif] text-[15px]">
                            {type.label}
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            formData.type === type.value
                              ? "border-black bg-black"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.type === type.value && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {formData.type === "other" && (
                  <div className="mt-6">
                    <input
                      type="text"
                      value={formData.customType}
                      onChange={(e) =>
                        setFormData({ ...formData, customType: e.target.value })
                      }
                      placeholder="Specifică tipul evenimentului..."
                      className="w-full h-[52px] px-4 border border-gray-300 rounded-full focus:border-[#960010] focus:outline-none font-['Inter:Regular',sans-serif] text-[16px]"
                    />
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  ÎN CE STADIU EȘTI CU PLANIFICAREA?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Statusul actual al organizării
                </p>
                <div className="space-y-3">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setFormData({ ...formData, status })}
                      className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                        formData.status === status
                          ? "border-black bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <p className="text-gray-900 font-['Inter:Medium',sans-serif] text-[15px]">
                        {status}
                      </p>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.status === status
                            ? "border-black bg-black"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.status === status && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  CÂND VA AVEA LOC EVENIMENTUL?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Selectează cum vrei să specifici data
                </p>

                <div className="space-y-4">
                  {/* Dată exactă */}
                  <div>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, dateType: "exact" })
                      }
                      className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                        formData.dateType === "exact"
                          ? "border-black bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <p className="text-gray-900 font-['Inter:Medium',sans-serif] text-[15px]">
                        Dată exactă
                      </p>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.dateType === "exact"
                            ? "border-black bg-black"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.dateType === "exact" && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>

                    {formData.dateType === "exact" && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={
                            formData.exactDate
                              ? new Date(formData.exactDate).toLocaleDateString(
                                  "en-US"
                                )
                              : ""
                          }
                          readOnly
                          onClick={() => setShowCalendar(!showCalendar)}
                          placeholder="Selectează data"
                          className="w-full p-4 border border-gray-200 rounded-[24px] hover:border-black focus:border-black focus:outline-none text-lg cursor-pointer"
                        />

                        {showCalendar && (
                          <div className="mt-4 bg-white border border-gray-200 rounded-[24px] shadow-lg p-4 relative">
                            <button
                              onClick={() => setShowCalendar(false)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                              <div className="relative flex-1">
                                <button
                                  onClick={() =>
                                    setShowMonthDropdown(!showMonthDropdown)
                                  }
                                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-black"
                                >
                                  <span className="text-lg">
                                    {months[calendarMonth]}
                                  </span>
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                </button>
                                {showMonthDropdown && (
                                  <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                                    {months.map((month, index) => (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          setCalendarMonth(index);
                                          setShowMonthDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-amber-50 ${
                                          index === calendarMonth
                                            ? "bg-amber-50"
                                            : ""
                                        }`}
                                      >
                                        {month}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="relative flex-1">
                                <button
                                  onClick={() =>
                                    setShowYearDropdown(!showYearDropdown)
                                  }
                                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-black"
                                >
                                  <span className="text-lg">
                                    {calendarYear}
                                  </span>
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                </button>
                                {showYearDropdown && (
                                  <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                                    {years.map((year) => (
                                      <button
                                        key={year}
                                        onClick={() => {
                                          setCalendarYear(year);
                                          setShowYearDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-amber-50 ${
                                          year === calendarYear
                                            ? "bg-amber-50"
                                            : ""
                                        }`}
                                      >
                                        {year}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map(
                                (day) => (
                                  <div
                                    key={day}
                                    className="text-center py-2 text-sm text-gray-500"
                                  >
                                    {day}
                                  </div>
                                )
                              )}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {renderCalendar().map((dayObj, index) => {
                                const isSelected =
                                  formData.exactDate &&
                                  dayObj.isCurrentMonth &&
                                  dayObj.day ===
                                    parseInt(
                                      formData.exactDate.split("-")[2]
                                    ) &&
                                  calendarMonth ===
                                    parseInt(formData.exactDate.split("-")[1]) -
                                      1 &&
                                  calendarYear ===
                                    parseInt(formData.exactDate.split("-")[0]);

                                return (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      dayObj.isCurrentMonth &&
                                      selectDate(dayObj.day)
                                    }
                                    disabled={!dayObj.isCurrentMonth}
                                    className={`p-3 text-center rounded-lg transition-all ${
                                      dayObj.isCurrentMonth
                                        ? isSelected
                                          ? "bg-gray-900 text-white"
                                          : "text-gray-900 hover:bg-gray-100"
                                        : "text-gray-300 cursor-not-allowed"
                                    }`}
                                  >
                                    {dayObj.day}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Luna și anul */}
                  <div>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, dateType: "month" })
                      }
                      className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                        formData.dateType === "month"
                          ? "border-black bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <p className="text-gray-900">Luna și anul</p>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.dateType === "month"
                            ? "border-black bg-black"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.dateType === "month" && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>

                    {formData.dateType === "month" && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowMonthDropdown(!showMonthDropdown)
                            }
                            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-[24px] hover:border-black focus:border-black"
                          >
                            <span className="text-gray-900">
                              {formData.selectedMonth || "Alege luna"}
                            </span>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </button>
                          {showMonthDropdown && (
                            <div className="absolute top-16 left-0 w-full bg-white border border-gray-200 rounded-[24px] shadow-lg z-20 max-h-60 overflow-y-auto">
                              {months.map((month) => (
                                <button
                                  key={month}
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      selectedMonth: month,
                                    });
                                    setShowMonthDropdown(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 hover:bg-amber-50 ${
                                    month === formData.selectedMonth
                                      ? "bg-amber-50"
                                      : ""
                                  }`}
                                >
                                  {month}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowYearDropdown(!showYearDropdown)
                            }
                            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-[24px] hover:border-black focus:border-black"
                          >
                            <span className="text-gray-900">
                              {formData.selectedYear || "Alege anul"}
                            </span>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </button>
                          {showYearDropdown && (
                            <div className="absolute top-16 left-0 w-full bg-white border border-gray-200 rounded-[24px] shadow-lg z-20 max-h-60 overflow-y-auto">
                              {years.map((year) => (
                                <button
                                  key={year}
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      selectedYear: year.toString(),
                                    });
                                    setShowYearDropdown(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 hover:bg-amber-50 ${
                                    year.toString() === formData.selectedYear
                                      ? "bg-amber-50"
                                      : ""
                                  }`}
                                >
                                  {year}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nu sunt sigur încă */}
                  <button
                    onClick={() =>
                      setFormData({ ...formData, dateType: "not-sure" })
                    }
                    className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                      formData.dateType === "not-sure"
                        ? "border-black bg-white shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <p className="text-gray-900">Nu sunt sigur încă</p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.dateType === "not-sure"
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.dateType === "not-sure" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  CARE ESTE LOCAȚIA EVENIMENTULUI?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Alege restaurant din baza noastră sau adaugă locația ta
                </p>

                <div className="space-y-4">
                  {/* Dropdown input pentru selectare restaurant */}
                  <div className="relative">
                    <input
                      type="text"
                      value={venueSearchTerm}
                      onChange={(e) => {
                        setVenueSearchTerm(e.target.value);
                        setShowVenueDropdown(true);
                        setFormData({ ...formData, venueUnknown: false });
                      }}
                      onFocus={() => setShowVenueDropdown(true)}
                      placeholder="Caută restaurant / venue..."
                      disabled={formData.venueUnknown}
                      className="w-full p-4 border border-gray-200 rounded-[2px] hover:border-black focus:border-black focus:outline-none text-lg disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                    {/* Dropdown menu */}
                    {showVenueDropdown && !formData.venueUnknown && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-[2px] shadow-lg max-h-80 overflow-y-auto">
                        {filteredVenues.length > 0 ? (
                          filteredVenues.map((venue) => (
                            <button
                              key={venue.name}
                              onClick={() =>
                                handleSelectVenue(
                                  venue.name,
                                  venue.pricePerGuest
                                )
                              }
                              className="w-full p-4 hover:bg-gray-50 flex items-center justify-between text-left border-b border-gray-100 last:border-b-0 transition-all"
                            >
                              <span className="text-gray-900">
                                {venue.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {venue.pricePerGuest} MDL/invitat
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-gray-500 text-center">
                            Nicio locație găsită
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Locația selectată */}
                  {formData.venue && !formData.venueUnknown && (
                    <div className="p-4 bg-gray-50 rounded-[2px] border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Locație selectată:
                        </p>
                        <p className="text-gray-900">{formData.venue}</p>
                      </div>
                      <span className="text-gray-900">
                        {formData.venuePricePerGuest} MDL/invitat
                      </span>
                    </div>
                  )}

                  {/* Buton pentru adăugare locație custom */}
                  {!showAddVenueForm && (
                    <button
                      onClick={() => {
                        setShowAddVenueForm(true);
                        setShowVenueDropdown(false);
                      }}
                      className="w-full p-4 rounded-[2px] border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 transition-all text-gray-600 hover:text-gray-900"
                    >
                      + Adaugă locație custom
                    </button>
                  )}

                  {/* Form pentru adăugare locație custom */}
                  {showAddVenueForm && (
                    <div className="p-6 rounded-[2px] border-2 border-gray-300 bg-gray-50 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">Adaugă locație custom</h4>
                        <button
                          onClick={() => {
                            setShowAddVenueForm(false);
                            setNewVenueName("");
                            setNewVenuePrice("");
                          }}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newVenueName}
                        onChange={(e) => setNewVenueName(e.target.value)}
                        placeholder="Nume locație..."
                        className="w-full p-3 border border-gray-200 rounded-[24px] hover:border-black focus:border-black focus:outline-none bg-white"
                      />
                      <input
                        type="number"
                        value={newVenuePrice}
                        onChange={(e) => setNewVenuePrice(e.target.value)}
                        placeholder="Preț per invitat (MDL)..."
                        className="w-full p-3 border border-gray-200 rounded-[24px] hover:border-black focus:border-black focus:outline-none bg-white"
                      />
                      <button
                        onClick={handleAddCustomVenue}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-[2px] transition-all"
                      >
                        Adaugă locația
                      </button>
                    </div>
                  )}

                  {/* Opțiune "Nu sunt sigur de locație" */}
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        venueUnknown: !formData.venueUnknown,
                        venue: "",
                        venuePricePerGuest: 0,
                      });
                      setVenueSearchTerm("");
                      setShowVenueDropdown(false);
                    }}
                    className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                      formData.venueUnknown
                        ? "border-black bg-white shadow-md"
                        : "border-gray-200 bg-white hover:border-black hover:shadow-md"
                    }`}
                  >
                    <p className="text-gray-900">Nu sunt sigur de locație</p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.venueUnknown
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.venueUnknown && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  CÂȚI INVITAȚI ESTIMEZI?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Selectează intervalul de invitați
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {guestRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() =>
                        setFormData({ ...formData, guestRange: range })
                      }
                      className={`p-6 rounded-[2px] border transition-all ${
                        formData.guestRange === range
                          ? "border-black bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-black hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900 text-lg">{range}</p>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            formData.guestRange === range
                              ? "border-black bg-black"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.guestRange === range && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-[40px] text-[#960010] font-['Inter:Medium',sans-serif] font-medium leading-[60px] tracking-[-1px] uppercase mb-3">
                  CE SERVICII VEI AVEA NEVOIE?
                </h3>
                <p className="text-gray-600 mb-2 font-['Inter:Regular',sans-serif] text-[15px]">
                  Selectează serviciile necesare
                </p>
                <p className="text-gray-600 font-['Inter:Regular',sans-serif] text-[15px] mb-10">
                  Primele 3 servicii selectate devin prioritare și vor primi ⭐
                </p>

                <div className="space-y-3 text-left">
                  {serviceCategories.map((category) => {
                    const isExpanded = expandedCategories.includes(
                      category.name
                    );
                    const categoryServicesCount = category.services.filter(
                      (s) => formData.services.includes(s)
                    ).length;

                    return (
                      <div
                        key={category.name}
                        className="border border-[#e5e7eb] rounded-[2px] overflow-hidden bg-white"
                      >
                        {/* Category Header */}
                        <button
                          onClick={() => {
                            setExpandedCategories((prev) =>
                              prev.includes(category.name)
                                ? prev.filter((c) => c !== category.name)
                                : [...prev, category.name]
                            );
                          }}
                          className="w-full h-[60px] px-[16px] flex items-center justify-between transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[#0a0a0a] font-['Inter:Medium',sans-serif] font-medium text-[18px] leading-[28px] tracking-[-0.4395px] uppercase">
                              {category.name}
                            </span>
                            {categoryServicesCount > 0 && (
                              <span className="flex items-center justify-center bg-[#faf2f3] text-[#960010] font-['Inter:Regular',sans-serif] text-[12px] leading-[16px] rounded-full w-[22px] h-[22px]">
                                {categoryServicesCount}
                              </span>
                            )}
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-[#99a1af]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#99a1af]" />
                          )}
                        </button>

                        {/* Category Services */}
                        {isExpanded && (
                          <div className="border-t border-[#e5e7eb] pt-[13px] pb-[13px] px-[12px] space-y-[8px]">
                            {category.services.map((service) => {
                              const serviceIndex =
                                formData.services.indexOf(service);
                              const isPriority =
                                serviceIndex >= 0 && serviceIndex < 3;

                              return (
                                <button
                                  key={service}
                                  onClick={() => toggleService(service)}
                                  className={`w-full h-[46px] px-[13px] rounded-full border transition-all flex items-center justify-between ${
                                    formData.services.includes(service)
                                      ? isPriority
                                        ? "border-[#960010] bg-[rgba(150,0,16,0.05)]"
                                        : "border-black bg-white"
                                      : "border-[#e5e7eb] bg-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isPriority && (
                                      <Star className="w-4 h-4 fill-[#960010] text-[#960010]" />
                                    )}
                                    <span
                                      className={`text-[#101828] text-[14px] leading-[20px] tracking-[-0.1504px] ${
                                        formData.services.includes(service)
                                          ? 'font-["Inter:Medium",sans-serif] font-medium'
                                          : 'font-["Inter:Regular",sans-serif] font-normal'
                                      }`}
                                    >
                                      {service}
                                    </span>
                                  </div>
                                  <div
                                    className={`w-[20px] h-[20px] rounded-full flex items-center justify-center transition-all ${
                                      formData.services.includes(service)
                                        ? isPriority
                                          ? "border-2 border-[#960010] bg-[#960010]"
                                          : "border-2 border-black bg-black"
                                        : "border-2 border-[#d1d5dc] bg-transparent"
                                    }`}
                                  >
                                    {formData.services.includes(service) && (
                                      <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selected services counter */}
                {formData.services.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-[2px]">
                    <p className="text-green-800 text-sm">
                      ✓ {formData.services.length} servicii selectate
                      {formData.services.length >= 3 && (
                        <span className="ml-2">
                          | {formData.services.slice(0, 3).length} prioritare ⭐
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-3 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                  CARE ESTE BUGETUL TĂU?
                </h3>
                <p className="text-gray-600 mb-10 font-['Inter:Regular',sans-serif] text-[15px]">
                  Vom recomanda furnizori în acest interval de preț
                </p>

                <div className="space-y-6">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        hasBudget: !formData.hasBudget,
                      })
                    }
                    className={`w-full p-5 rounded-[2px] border transition-all flex items-center justify-between ${
                      !formData.hasBudget
                        ? "border-black bg-white shadow-md"
                        : "border-gray-200 bg-white hover:border-black hover:shadow-md"
                    }`}
                  >
                    <p className="text-gray-900">Nu am un buget încă</p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        !formData.hasBudget
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }`}
                    >
                      {!formData.hasBudget && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </button>

                  {formData.hasBudget && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">Buget estimat:</span>
                        <span className="text-3xl text-gray-900">
                          {formData.budget.toLocaleString()} MDL
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="1000000"
                        step="5000"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>5,000</span>
                        <span>500,000</span>
                        <span>1,000,000</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {step === 8 && (
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-[32px] lg:text-[40px] text-[#960010] mb-2 font-['Inter:Medium',sans-serif] font-medium tracking-tight uppercase">
                      Alege pachetul
                    </h3>
                    <p className="text-[#414c5a] font-['Inter:Regular',sans-serif] text-[15px] leading-[21px] tracking-[-0.16px]">
                      Selectează varianta potrivită sau treci în modul manual.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleManualMode}
                      className={`px-5 py-3 rounded-full border transition-all text-[14px] font-['Inter:Medium',sans-serif] font-medium ${
                        selectedPackage === "manual"
                          ? "bg-[#960010] text-white border-[#960010]"
                          : "bg-white text-[#960010] border-[#960010] hover:bg-[#faf2f3]"
                      }`}
                    >
                      Modul manual
                    </button>
                  </div>
                </div>

                {packagesLoading && (
                  <div className="p-4 border border-[#e5e7eb] rounded-[2px] bg-white text-[#414c5a]">
                    Calculăm pachetele pe baza serviciilor selectate...
                  </div>
                )}

                {packages.length > 0 && (
                  <div className="grid grid-cols-1 gap-6">
                    {packages.map((pkg) => {
                      const isSelected = selectedPackage === pkg.id.toString();
                      const isEconomic = pkg.name === "Pachet Economic";
                      const isStandard = pkg.name === "Pachet Standard";
                      const isPremium = pkg.name === "Pachet Premium";

                      return (
                        <div
                          key={pkg.id}
                          className={`bg-white border-2 rounded-lg p-6 flex flex-col transition-all ${
                            isSelected
                              ? "border-[#960010] shadow-xl"
                              : "border-[#e5e7eb] hover:border-[#960010] hover:shadow-lg"
                          }`}
                        >
                          {/* Header with seal */}
                          <div className="text-center mb-6">
                            {/* Wax seal icon */}
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#960010] rounded-full flex items-center justify-center">
                              <div className="w-12 h-12 bg-[#7a000d] rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-[#960010] rounded-full"></div>
                              </div>
                            </div>

                            {/* Package name */}
                            <h3 className="text-[32px] font-bold text-[#960010] uppercase tracking-wide mb-2">
                              {isEconomic && "ECONOMIC"}
                              {isStandard && "STANDARD"}
                              {isPremium && "PREMIUM"}
                            </h3>

                            {/* Description */}
                            <p className="text-[14px] text-[#6a7282] mb-4">
                              {isEconomic &&
                                "Cele mai accesibile opțiuni cu calitate garantată"}
                              {isStandard &&
                                "Echilibrul perfect între calitate și preț"}
                              {isPremium &&
                                "Servicii premium pentru evenimente de lux"}
                            </p>

                            {pkg.is_recommended && (
                              <span className="inline-block px-3 py-1 rounded-full bg-[#faf2f3] text-[#960010] text-[11px] font-semibold uppercase tracking-wide">
                                Recomandat
                              </span>
                            )}
                          </div>

                          {/* Services list */}
                          <div className="flex-1 space-y-4 mb-6">
                            {pkg.items.map((item) => {
                              // Calculate guest count from formData
                              const getGuestCount = (range: string) => {
                                if (range === "200+") return 250;
                                if (!range) return 0;
                                const [min, max] = range.split("-").map(Number);
                                return Math.round((min + max) / 2);
                              };
                              const guestCount = getGuestCount(
                                formData.guestRange
                              );

                              // Check if pricing is per person/guest
                              const isPerPerson =
                                item.pricing_model === "PER_PERSON" ||
                                item.pricing_model === "PER_INVITAT";

                              return (
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center"
                                >
                                  <div className="flex-1">
                                    <p className="text-[16px] font-medium text-[#101828] mb-1">
                                      {item.supplier_name_snapshot}
                                    </p>
                                    <p className="text-[12px] text-[#6a7282]">
                                      {item.matrix_position === "existing"
                                        ? "Deja selectat"
                                        : isPerPerson &&
                                          item.base_price_per_unit
                                        ? `${item.base_price_per_unit.toLocaleString()} MDL × ${guestCount} invitați`
                                        : "Preț fix eveniment"}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[18px] font-semibold text-[#101828]">
                                      {item.estimated_cost.toLocaleString()} MDL
                                    </p>
                                    {item.supplier_rating_snapshot && (
                                      <div className="flex items-center justify-end gap-1 mt-1">
                                        <span className="text-[#960010]">
                                          ★
                                        </span>
                                        <span className="text-[12px] text-[#6a7282]">
                                          {item.supplier_rating_snapshot.toFixed(
                                            1
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Divider */}
                          <div className="border-t border-[#e5e7eb] pt-4 mb-6">
                            {/* Total */}
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[14px] text-[#6a7282] uppercase tracking-wide">
                                TOTAL PACHET
                              </span>
                              <span className="text-[28px] font-bold text-[#960010]">
                                {pkg.total_estimated_cost.toLocaleString()} MDL
                              </span>
                            </div>

                            {/* Savings indicator */}
                            <div className="flex items-center justify-end gap-1 text-[#960010]">
                              <span className="text-[12px]">📈</span>
                              <span className="text-[12px] font-medium">
                                Economisești{" "}
                                {Math.round(
                                  pkg.total_estimated_cost * 0.1
                                ).toLocaleString()}{" "}
                                MDL
                              </span>
                            </div>
                          </div>

                          {/* Select button */}
                          <button
                            onClick={() => handleSelectPackage(pkg.id)}
                            className={`w-full py-4 rounded-full text-[16px] font-semibold uppercase tracking-wide transition-all ${
                              isSelected
                                ? "bg-[#960010] text-white"
                                : "bg-[#101828] text-white hover:bg-[#960010]"
                            }`}
                          >
                            {isSelected ? "SELECTAT" : "ALEGE PACHETUL"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 p-4 bg-[#faf2f3] border border-[#f3d9de] rounded-[2px] text-[#960010] text-[14px]">
                  Pachetul selectat va crea automat furnizorii, bugetul și
                  checklist-ul pentru acest eveniment. În modul manual nu se
                  creează nimic automat.
                </div>
              </div>
            )}
          </div>

          {/* Footer - Buttons (Fixed Bottom) */}
          <div className="flex-shrink-0 p-8 pt-4 bg-white">
            <div className="w-full max-w-[480px] mx-auto border-t border-gray-100 pt-4">
              <div className="flex gap-4 justify-between">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 h-[52px] px-8 bg-white border border-[#e7e7e7] hover:bg-gray-50 hover:border-black text-black rounded-full transition-all font-['Inter:Medium',sans-serif] font-medium text-[15px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go back
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !formData.type) ||
                    (step === 1 &&
                      formData.type === "other" &&
                      !formData.customType) ||
                    (step === 2 && !formData.status) ||
                    (step === 3 && !formData.dateType) ||
                    (step === 3 &&
                      formData.dateType === "exact" &&
                      !formData.exactDate) ||
                    (step === 3 &&
                      formData.dateType === "month" &&
                      (!formData.selectedMonth || !formData.selectedYear)) ||
                    (step === 4 && !formData.venue && !formData.venueUnknown) ||
                    (step === 5 && !formData.guestRange) ||
                    (step === 6 && formData.services.length === 0) ||
                    (step === 8 && !selectedPackage)
                  }
                  className="h-[52px] px-8 bg-black hover:bg-[#960010] text-white rounded-full transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[15px]"
                >
                  {step === totalSteps ? "Finalizare" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
