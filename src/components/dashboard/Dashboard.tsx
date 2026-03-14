import React, { useState, useEffect } from "react";
import { useAppContext } from "../../App";
import { CheckSquare, ArrowRight, X, Upload } from "lucide-react";
import { eventService, Event } from "../../services/eventService";
import { guestService, Guest } from "../../services/guestService";
import { supplierService, Supplier } from "../../services/supplierService";
import { budgetService, BudgetItem } from "../../services/budgetService";
import {
  checklistService,
  ChecklistItem,
} from "../../services/checklistService";
// Placeholder images - replace with your actual assets
const polubviLogo =
  "https://via.placeholder.com/200x80/960010/FFFFFF?text=POLUBVI";
const corporateImg =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80";
const anniversaryImg =
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80";
const weddingImg =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80";
const babyShowerImg =
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80";
const otherEventImg =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80";
const christeningImg =
  "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80";
const birthdayImg =
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80";

// SVG paths placeholder
const svgPaths = {
  p1e3da380: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
};
import { StatsCard } from "./StatsCard";
import { calculateSupplierPrice } from "../../utils/pricing";
import { formatEventDate } from "../../utils/eventDate";

export function Dashboard() {
  const { setCurrentView, activeEventId } = useAppContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    type: "",
    eventName: "",
    city: "",
    date: "",
    guestCount: 0,
    customImage: "",
  });

  // Load all data from services
  useEffect(() => {
    const loadAllData = async () => {
      if (!activeEventId) {
        setEvent(null);
        setGuests([]);
        setSuppliers([]);
        setBudgetItems([]);
        setChecklist([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventId = parseInt(activeEventId);

        // Load all data in parallel
        const [
          eventData,
          guestsData,
          suppliersData,
          budgetData,
          checklistData,
        ] = await Promise.all([
          eventService.getEvent(eventId),
          guestService.getGuests(eventId),
          supplierService.getSuppliers(eventId),
          budgetService.getBudgetItems(eventId),
          checklistService.getChecklistItems(eventId),
        ]);

        setEvent(eventData);
        setGuests(guestsData);
        setSuppliers(suppliersData);
        setBudgetItems(budgetData);
        setChecklist(checklistData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setEvent(null);
        setGuests([]);
        setSuppliers([]);
        setBudgetItems([]);
        setChecklist([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [activeEventId]);

  const confirmedGuests = guests.filter((g) => g.status === "confirmed").length;
  const pendingGuests = guests.filter((g) => g.status === "pending").length;

  // Use budget_total_estimated from event (set during wizard or updated when budget items change)
  const totalBudget = event?.budget_total_estimated || 0;

  const realBudget = budgetItems.reduce(
    (sum, item) => sum + (item.actual_cost || 0),
    0
  );

  const completedTasks = checklist.filter((item) => item.completed).length;
  const selectedSuppliers = suppliers.filter((s) => s.selected).length;
  const budgetProgress = totalBudget > 0 ? (realBudget / totalBudget) * 100 : 0;
  const taskProgress =
    checklist.length > 0 ? (completedTasks / checklist.length) * 100 : 0;
  const guestProgress =
    guests.length > 0 ? (confirmedGuests / guests.length) * 100 : 0;

  // Open edit modal with current event data
  const openEditModal = () => {
    setEditData({
      type: event?.event_type || "",
      eventName: event?.title || "",
      city: event?.city || "",
      date: event?.date || "",
      guestCount: event?.guest_count || 0,
      customImage: "", // Custom image nu este în Event interface, poate fi adăugat mai târziu
    });
    setShowEditModal(true);
  };

  // Save edited event data and recalculate supplier prices
  const saveEventData = async () => {
    if (!editData.type || !editData.date || editData.guestCount <= 0) {
      alert("Te rog completează toate câmpurile obligatorii!");
      return;
    }

    if (!event) return;

    const oldGuestCount = event.guest_count || 0;
    const newGuestCount = editData.guestCount;

    try {
      // Update event using eventService
      const updatedEvent = await eventService.updateEvent(event.id, {
        title: editData.eventName,
        event_type: editData.type,
        date: editData.date,
        city: editData.city,
        guest_count: newGuestCount,
      });

      // Update local state
      setEvent(updatedEvent);

      // If guest count changed, recalculate prices for suppliers with PER_INVITAT pricing
      if (oldGuestCount !== newGuestCount) {
        // Reload budget items to get updated prices
        // Note: The backend should handle price recalculation
        const eventId = parseInt(activeEventId!);
        const updatedBudgetItems = await budgetService.getBudgetItems(eventId);
        setBudgetItems(updatedBudgetItems);
      }

      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update event:", error);
      alert("Eroare la actualizarea evenimentului. Te rog încearcă din nou.");
    }
  };

  // Get event type image
  const getEventImage = (eventType: string) => {
    const typeMap: { [key: string]: string } = {
      Nuntă: weddingImg,
      wedding: weddingImg,
      "Zi de naștere": birthdayImg,
      birthday: birthdayImg,
      Botez: christeningImg,
      christening: christeningImg,
      "Eveniment corporate": corporateImg,
      Corporate: corporateImg,
      corporate: corporateImg,
      Aniversare: anniversaryImg,
      anniversary: anniversaryImg,
      "Baby shower": babyShowerImg,
      "Baby Shower": babyShowerImg,
      "baby-shower": babyShowerImg,
    };
    return typeMap[eventType] || otherEventImg;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="text-center">
          <div className="text-2xl mb-4">Se încarcă evenimentul...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="text-center max-w-2xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e7e7e7] p-12">
          <div className="mb-6 flex justify-center">
            <img src={polubviLogo} alt="POLUBVI" className="h-16" />
          </div>
          <div className="text-5xl mb-6 text-[#960010]">✦</div>
          <h2 className="text-3xl text-gray-900 mb-4">Bine ai venit!</h2>
          <p className="text-[#4a5565] text-[16px] tracking-[-0.3125px] mb-8 max-w-md mx-auto">
            Începe prin a crea un eveniment nou. Te vom ghida pas cu pas pentru
            a organiza evenimentul perfect.
          </p>
          <button
            onClick={() => setCurrentView("wizard")}
            className="inline-flex items-center gap-2 bg-[#960010] hover:bg-[#7a000d] text-white px-8 py-3 rounded-full transition-all"
          >
            Creează eveniment nou
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title with 50px top spacing */}
      <div className="mb-8" style={{ marginTop: "50px" }}>
        <h2 className="text-[80px] leading-[1] font-medium text-[#960010] uppercase tracking-[-2px] mb-2">
          DASHBOARD
        </h2>
        <p className="text-[16px] text-[#6a7282] tracking-[-0.3125px]">
          Privire de ansamblu asupra evenimentului tău
        </p>
      </div>

      {/* Event Details Card - EXACT ca în Figma */}
      <div className="bg-[#960010] p-[40px] mb-8">
        <div className="bg-white">
          <div className="flex gap-[24px] items-start p-[32px]">
            {/* Award Block - Event Image with Upload Overlay */}
            <div className="overflow-clip relative shrink-0 w-[343px] h-[343px] group">
              <img
                alt={event.event_type || "Event"}
                className="absolute inset-0 w-full h-full object-center object-cover pointer-events-none"
                src={getEventImage(event.event_type || "")}
              />
              <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" />
              <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />

              {/* Upload Overlay - Appears on Hover */}
              <label
                htmlFor="dashboardImageUpload"
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <Upload className="w-12 h-12 text-white" />
                <p className="text-white font-medium text-lg">
                  Alege fotografie
                </p>
                <input
                  type="file"
                  accept="image/*"
                  id="dashboardImageUpload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        // Pentru moment, nu salvăm imaginea personalizată în Event
                        // Aceasta poate fi implementată mai târziu
                        console.log("Custom image selected:", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Content Frame */}
            <div className="basis-0 flex flex-col gap-[24px] grow min-h-px min-w-px">
              {/* Header */}
              <div className="flex items-center justify-between h-[43px] w-full">
                <div className="h-[43px] flex-1">
                  <p className="font-medium leading-[43px] not-italic text-[#960010] text-[43px] tracking-[-1.8452px] uppercase truncate">
                    {event.title || "EVENIMENT"}
                  </p>
                </div>
                <button
                  onClick={openEditModal}
                  className="relative rounded-[16px] shrink-0 size-[36px] flex items-center justify-center hover:bg-gray-50 transition-all ml-4"
                  title="Modifică eveniment"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 18.3332 18.333"
                  >
                    <path
                      d={svgPaths.p1e3da380}
                      stroke="#6A7282"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </button>
              </div>

              {/* Value & Text Grid - 2x2 */}
              <div className="grid grid-cols-2 grid-rows-2 relative w-full border border-[#e7e7e7]">
                {/* Top Left - Tip eveniment */}
                <div className="flex flex-col gap-[8px] items-start px-[32px] py-[40px] border-r border-b border-[#e7e7e7]">
                  <p className="font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">
                    {event.event_type || "N/A"}
                  </p>
                  <p className="font-medium leading-[1.08] not-italic text-[20px] text-black tracking-[-0.2px] uppercase w-full">
                    TIP EVENIMENT
                  </p>
                </div>

                {/* Top Right - Locație */}
                <div className="flex flex-col gap-[8px] items-start px-[32px] py-[40px] border-b border-[#e7e7e7]">
                  <p className="font-medium leading-none not-italic text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">
                    {event.city || "N/A"}
                  </p>
                  <p className="font-medium leading-[1.08] not-italic text-[20px] text-black tracking-[-0.2px] uppercase w-full">
                    LOCAȚIE
                  </p>
                </div>

                {/* Bottom Left - Data evenimentului */}
                <div className="flex flex-col gap-[8px] items-start px-[32px] py-[40px] border-r border-[#e7e7e7]">
                  <p className="font-medium leading-none not-italic text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">
                    {formatEventDate({
                      date: event.date,
                      dateMode: event.date_mode,
                      eventMonth: event.event_month,
                      eventYear: event.event_year,
                    })}
                  </p>
                  <p className="font-medium leading-[1.08] not-italic text-[20px] text-black tracking-[-0.2px] uppercase w-full">
                    DATA EVENIMENTULUI
                  </p>
                </div>

                {/* Bottom Right - Număr invitați */}
                <div className="flex flex-col gap-[8px] items-start px-[32px] py-[40px]">
                  <p className="font-medium leading-none not-italic text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">
                    {event.guest_count}
                  </p>
                  <p className="font-medium leading-[1.08] not-italic text-[20px] text-black tracking-[-0.2px] uppercase w-full">
                    NUMĂR INVITAȚI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-8">
        {/* Guests Card */}
        <StatsCard
          onClick={() => setCurrentView("guests")}
          title="Lista de invitați"
          mainValue={guests.length}
          progressLabel="Progres confirmări"
          progressPercent={guestProgress}
          bottomContent={
            <div className="content-stretch flex gap-[6px] items-start">
              <div className="bg-[#f0fdf4] h-[19px] relative rounded-[1.67772e+07px] shrink-0 px-[8px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic text-[#008236] text-[10px] text-nowrap tracking-[0.1172px] uppercase">
                  {confirmedGuests} confirmați
                </p>
              </div>
              <div className="bg-[rgba(254,252,232,0.99)] h-[19px] relative rounded-[1.67772e+07px] shrink-0 px-[8px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic text-[#a65f00] text-[10px] text-nowrap tracking-[0.1172px] uppercase">
                  {pendingGuests} în așteptare
                </p>
              </div>
            </div>
          }
        />

        {/* Budget Card */}
        <StatsCard
          onClick={() => setCurrentView("budget")}
          title="Buget total"
          mainValue={totalBudget.toLocaleString()}
          subtitle="MDL"
          progressLabel="Cheltuieli reale"
          progressPercent={budgetProgress}
          bottomContent={
            <div className="h-[18px] relative w-full">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic text-[#6a7282] text-[12px] text-nowrap">
                Buget real:{" "}
                <span className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic text-[#101828] text-[12px]">
                  {realBudget.toLocaleString()} MDL
                </span>
              </p>
            </div>
          }
        />

        {/* Checklist Card */}
        <StatsCard
          onClick={() => setCurrentView("checklist")}
          title="Sarcini completate"
          mainValue={completedTasks}
          secondaryValue={checklist.length}
          subtitle="task-uri"
          progressLabel="Progres total"
          progressPercent={taskProgress}
          bottomContent={
            <div className="h-[18px] relative w-full">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic text-[#6a7282] text-[12px]">
                {checklist.length - completedTasks} sarcini rămase
              </p>
            </div>
          }
        />

        {/* Suppliers Card */}
        <StatsCard
          onClick={() => setCurrentView("suppliers")}
          title="Furnizori selectați"
          mainValue={selectedSuppliers}
          secondaryValue={suppliers.length}
          subtitle="furnizori"
          progressLabel="Progres selecție"
          progressPercent={
            suppliers.length > 0
              ? (selectedSuppliers / suppliers.length) * 100
              : 0
          }
          bottomContent={
            <div className="h-[18px] relative w-full">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic text-[#6a7282] text-[12px]">
                {suppliers.length - selectedSuppliers} furnizori disponibili
              </p>
            </div>
          }
        />
      </div>

      {/* Upcoming Tasks Section */}
      <div className="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-[#e7e7e7] p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[20px] font-medium text-[#101828] mb-1">
              Sarcini urgente
            </h3>
            <p className="text-[14px] text-[#6a7282]">
              Sarcini care necesită atenție imediată
            </p>
          </div>
          <button
            onClick={() => setCurrentView("checklist")}
            className="text-[14px] px-4 py-2 bg-white hover:bg-[rgba(150,0,16,0.05)] hover:text-[#960010] text-gray-700 border border-[#e7e7e7] rounded-full transition-all"
          >
            Vezi toate
          </button>
        </div>

        {checklist.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-2">Nu există sarcini încă</p>
            <p className="text-sm text-gray-400">
              Completează wizard-ul pentru a genera checklist-ul
            </p>
          </div>
        ) : checklist.filter((item) => !item.completed).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-900 mb-2">
              Excelent! Toate sarcinile sunt completate! 🎉
            </p>
            <p className="text-sm text-gray-400">Evenimentul tău este gata!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {checklist
              .filter((item) => !item.completed)
              .slice(0, 5)
              .map((item) => {
                // Calculate readable deadline text
                let timeText = "";
                let dateText = "";
                let urgencyColor = "";

                if (item.due_date) {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const dueDate = new Date(item.due_date);
                  dueDate.setHours(0, 0, 0, 0);
                  const diffTime = dueDate.getTime() - today.getTime();
                  const daysRemaining = Math.ceil(
                    diffTime / (1000 * 60 * 60 * 24)
                  );

                  // Format date: "10 Ian"
                  const months = [
                    "Ian",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mai",
                    "Iun",
                    "Iul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Noi",
                    "Dec",
                  ];
                  const day = dueDate.getDate();
                  const month = months[dueDate.getMonth()];
                  dateText = `${day} ${month}`;

                  // Determine color based on urgency
                  if (daysRemaining < 0) {
                    urgencyColor = "bg-red-100 text-red-700 border-red-200";
                  } else if (daysRemaining === 0) {
                    urgencyColor =
                      "bg-orange-100 text-orange-700 border-orange-200";
                  } else if (daysRemaining <= 7) {
                    urgencyColor =
                      "bg-yellow-100 text-yellow-700 border-yellow-200";
                  } else if (daysRemaining <= 30) {
                    urgencyColor =
                      "bg-[rgba(150,0,16,0.1)] text-[#960010] border-[rgba(150,0,16,0.2)]";
                  } else {
                    urgencyColor =
                      "bg-green-100 text-green-700 border-green-200";
                  }

                  // Readable text
                  if (daysRemaining < 0) {
                    const daysLate = Math.abs(daysRemaining);
                    if (daysLate === 1) timeText = "1 zi întârziere";
                    else if (daysLate < 7)
                      timeText = `${daysLate} zile întârziere`;
                    else if (daysLate < 14) timeText = "1 săptămână întârziere";
                    else if (daysLate < 30)
                      timeText = `${Math.floor(
                        daysLate / 7
                      )} săptămâni întârziere`;
                    else if (daysLate < 60) timeText = "1 lună întârziere";
                    else
                      timeText = `${Math.floor(daysLate / 30)} luni întârziere`;
                  } else if (daysRemaining === 0) {
                    timeText = "Astăzi";
                  } else if (daysRemaining === 1) {
                    timeText = "Mâine";
                  } else if (daysRemaining < 7) {
                    timeText = `${daysRemaining} zile`;
                  } else if (daysRemaining < 14) {
                    timeText = "1 săptămână";
                  } else if (daysRemaining < 21) {
                    timeText = "2 săptămâni";
                  } else if (daysRemaining < 28) {
                    timeText = "3 săptămâni";
                  } else if (daysRemaining < 60) {
                    timeText = "1 lună";
                  } else if (daysRemaining < 90) {
                    timeText = "2 luni";
                  } else if (daysRemaining < 120) {
                    timeText = "3 luni";
                  } else {
                    timeText = `${Math.floor(daysRemaining / 30)} luni`;
                  }
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentView("checklist")}
                    className="flex items-center gap-4 px-6 py-4 rounded-full cursor-pointer transition-all border bg-white border-gray-200 hover:border-[#960010]"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all border-gray-300 hover:border-[#960010]"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{item.task}</p>
                    </div>
                    {item.due_date && (
                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${urgencyColor}`}
                      >
                        {timeText} ({dateText})
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-900">
                Modifică detaliile evenimentului
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Tip eveniment *
                </label>
                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({ ...editData, type: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                >
                  <option value="">Selectează tipul</option>
                  <option value="Nuntă">Nuntă</option>
                  <option value="Zi de naștere">Zi de naștere</option>
                  <option value="Botez">Botez</option>
                  <option value="Aniversare">Aniversare</option>
                  <option value="Eveniment corporate">
                    Eveniment corporate
                  </option>
                  <option value="Baby shower">Baby shower</option>
                  <option value="Altceva">Altceva</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Nume eveniment
                </label>
                <input
                  type="text"
                  value={editData.eventName}
                  onChange={(e) =>
                    setEditData({ ...editData, eventName: e.target.value })
                  }
                  placeholder="Ex: Nunta cu Ana si George"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Locație
                </label>
                <input
                  type="text"
                  value={editData.city}
                  onChange={(e) =>
                    setEditData({ ...editData, city: e.target.value })
                  }
                  placeholder="Ex: Chișinău"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Data evenimentului *
                </label>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Număr invitați *
                </label>
                <input
                  type="number"
                  value={editData.guestCount || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      guestCount: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Ex: 100"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
                {editData.guestCount !== event?.guest_count &&
                  editData.guestCount > 0 && (
                    <p className="text-xs text-[#960010] mt-2">
                      ⚠️ Modificarea numărului de invitați va actualiza automat
                      prețurile furnizorilor care au tarif per invitat.
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Imagine personalizată
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditData({
                            ...editData,
                            customImage: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="customImageUpload"
                  />
                  <label
                    htmlFor="customImageUpload"
                    className="bg-[#960010] hover:bg-[#7a000d] text-white px-4 py-2 rounded-full cursor-pointer transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    Încarcă imagine
                  </label>
                </div>
                {editData.customImage && (
                  <div className="mt-2">
                    <img
                      src={editData.customImage}
                      alt="Custom Event Image"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={saveEventData}
                disabled={
                  !editData.type || !editData.date || editData.guestCount <= 0
                }
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Salvează modificările
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-full transition-all"
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
