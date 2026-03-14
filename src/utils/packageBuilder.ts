// Package Builder - Crează pachete personalizate pentru evenimente
import { calculateSupplierPrice } from './pricing';

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
  isCustom?: boolean;
}

interface PackageSupplier extends Supplier {
  calculatedPrice: number;
  priceBreakdown: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  suppliers: PackageSupplier[];
  totalPrice: number;
  badge: string;
  badgeColor: string;
}

// Mapare servicii → categorii furnizori
const SERVICE_CATEGORY_MAP: { [key: string]: string } = {
  // Entertainment & atmosferă
  'Muzică / DJ': '🎤 Entertainment & atmosferă',
  'Formație live': '🎤 Entertainment & atmosferă',
  'MC / Moderator': '🎤 Entertainment & atmosferă',
  'Animatori (copii / adulți)': '🎤 Entertainment & atmosferă',
  'Dansatori / show artistic': '🎤 Entertainment & atmosferă',
  'Artiști invitați': '🎤 Entertainment & atmosferă',
  'Karaoke': '🎤 Entertainment & atmosferă',
  'Momente speciale (ursitoare, magician, focuri reci)': '🎤 Entertainment & atmosferă',
  
  // Media & conținut
  'Fotografie': '📸 Media & conținut',
  'Videografie': '📸 Media & conținut',
  'Dronă': '📸 Media & conținut',
  'Photo Booth': '📸 Media & conținut',
  'Video Booth 360°': '📸 Media & conținut',
  'Cabină foto instant': '📸 Media & conținut',
  'Live streaming': '📸 Media & conținut',
  
  // Decor & styling
  'Decor eveniment (general)': '🌸 Decor & styling',
  'Decor floral': '🌸 Decor & styling',
  'Aranjamente mese': '🌸 Decor & styling',
  'Panou foto / backdrop': '🌸 Decor & styling',
  'Balonistică': '🌸 Decor & styling',
  'Lumânări / sfeșnice': '🌸 Decor & styling',
  'Tematică personalizată': '🌸 Decor & styling',
  
  // Mâncare & băuturi
  'Restaurant': '🍽️ Mâncare & băuturi',
  'Catering': '🍽️ Mâncare & băuturi',
  'Candy bar': '🍽️ Mâncare & băuturi',
  'Tort': '🍽️ Mâncare & băuturi',
  'Prăjituri / deserturi': '🍽️ Mâncare & băuturi',
  'Cocktail bar': '🍽️ Mâncare & băuturi',
  'Bar mobil': '🍽️ Mâncare & băuturi',
  'Degustări (vin)': '🍽️ Mâncare & băuturi',
  
  // Tehnic & logistic
  'Sonorizare': '💡 Tehnic & logistic',
  'Lumini': '💡 Tehnic & logistic',
  'Ecrane LED / proiector': '💡 Tehnic & logistic',
  'Scenă': '💡 Tehnic & logistic',
  'Generatoare': '💡 Tehnic & logistic',
  'Echipamente speciale': '💡 Tehnic & logistic',
  
  // Beauty & pregătire
  'Makeup': '💄 Beauty & pregătire',
  'Hairstyling': '💄 Beauty & pregătire',
  'Styling vestimentar': '💄 Beauty & pregătire',
  'Rochii / costume (închiriere)': '💄 Beauty & pregătire',
  'Accesorii': '💄 Beauty & pregătire',
  
  // Logistică & suport
  'Transport invitați': '🚗 Logistică & suport',
  'Transport artiști': '🚗 Logistică & suport',
  'Transfer VIP': '🚗 Logistică & suport',
  'Cazare invitați': '🚗 Logistică & suport',
  'Coordonare ziua evenimentului': '🚗 Logistică & suport',
  'Hostess / personal eveniment': '🚗 Logistică & suport',
  
  // Organizare & planificare
  'Organizator eveniment': '🧠 Organizare & planificare',
  'Wedding planner': '🧠 Organizare & planificare',
  'Event manager': '🧠 Organizare & planificare',
  'Coordonator ziua evenimentului': '🧠 Organizare & planificare',
  'Consultanță eveniment': '🧠 Organizare & planificare',
  'Scenariu eveniment (timeline)': '🧠 Organizare & planificare',
  
  // Print & invitații
  'Invitații digitale': '🧾 Print & invitații',
  'Invitații tipărite': '🧾 Print & invitații',
  'Meniuri': '🧾 Print & invitații',
  'Place cards': '🧾 Print & invitații',
  'Numere de masă': '🧾 Print & invitații',
  'Panou welcome': '🧾 Print & invitații',
  'Mărturii invitați': '🧾 Print & invitații',
};

// Găsește furnizori potriviți pentru un serviciu
function findSuppliersForService(service: string): Supplier[] {
  const category = SERVICE_CATEGORY_MAP[service];
  if (!category) return [];

  return [];
}

// Creează pachete personalizate
export function buildPackages(
  selectedServices: string[],
  guestCount: number,
  eventType: string,
  venueInfo?: { venueName: string; venuePricePerGuest: number }
): Package[] {
  const packages: Package[] = [];
  
  // Calculăm furnizori pentru fiecare serviciu
  const serviceSuppliers: { [key: string]: PackageSupplier[] } = {};
  
  // Dacă avem locație custom, creăm un furnizor pentru Restaurant
  let customRestaurantSupplier: PackageSupplier | null = null;
  if (venueInfo) {
    const restaurantPrice = venueInfo.venuePricePerGuest * guestCount;
    customRestaurantSupplier = {
      id: `restaurant-${Date.now()}`,
      name: venueInfo.venueName,
      category: '🍽️ Mâncare & băuturi',
      price: venueInfo.venuePricePerGuest,
      priceType: 'PER_INVITAT' as const,
      rating: 4.8,
      contact: 'Contact din eveniment',
      location: venueInfo.venueName,
      selected: true,
      isCustom: true,
      calculatedPrice: restaurantPrice,
      priceBreakdown: `${venueInfo.venuePricePerGuest} MDL × ${guestCount} invitați`
    };
  }
  
  selectedServices.forEach(service => {
    const suppliers = findSuppliersForService(service);
    
    if (suppliers.length > 0) {
      // Calculăm prețul pentru fiecare furnizor
      const suppliersWithPrices = suppliers.map(supplier => {
        const calculatedPrice = calculateSupplierPrice(supplier, {
          guestCount,
          durationHours: 4,
          eventType
        });
        
        let priceBreakdown = '';
        switch (supplier.priceType) {
          case 'PER_INVITAT':
            priceBreakdown = `${supplier.price} MDL × ${guestCount} invitați`;
            break;
          case 'FIX_EVENT':
            priceBreakdown = 'Preț fix eveniment';
            break;
          default:
            priceBreakdown = 'Preț fix eveniment';
        }
        
        return {
          ...supplier,
          calculatedPrice,
          priceBreakdown
        };
      });
      
      // Sortăm după preț
      suppliersWithPrices.sort((a, b) => a.calculatedPrice - b.calculatedPrice);
      serviceSuppliers[service] = suppliersWithPrices;
    }
  });
  
  // PACHET 1: ECONOMIC (cei mai ieftini, rating minim 4.4)
  const economicSuppliers: PackageSupplier[] = [];
  const economicUsedIds = new Set<string>();
  let economicTotal = 0;
  
  // Adăugăm Restaurant-ul custom dacă există
  if (customRestaurantSupplier) {
    economicSuppliers.push(customRestaurantSupplier);
    economicTotal += customRestaurantSupplier.calculatedPrice;
  }
  
  selectedServices.forEach(service => {
    // Sărim peste Restaurant dacă avem deja locație custom
    if (service === 'Restaurant' && customRestaurantSupplier) return;
    
    const suppliers = serviceSuppliers[service];
    if (suppliers && suppliers.length > 0) {
      // Găsim cel mai ieftin cu rating decent care nu a fost deja adăugat
      const supplier = suppliers.find(s => s.rating >= 4.4 && !economicUsedIds.has(s.id)) || 
                       suppliers.find(s => !economicUsedIds.has(s.id)) ||
                       suppliers[0];
      if (!economicUsedIds.has(supplier.id)) {
        economicSuppliers.push(supplier);
        economicUsedIds.add(supplier.id);
        economicTotal += supplier.calculatedPrice;
      }
    }
  });
  
  packages.push({
    id: 'economic',
    name: 'Economic',
    description: 'Cele mai accesibile opțiuni cu calitate garantată',
    suppliers: economicSuppliers,
    totalPrice: economicTotal,
    badge: '💚 Buget prietenos',
    badgeColor: 'bg-green-100 text-green-700 border-green-300'
  });
  
  // PACHET 2: STANDARD (rating mediu-ridicat 4.6-4.7, preț mediu)
  const standardSuppliers: PackageSupplier[] = [];
  const standardUsedIds = new Set<string>();
  let standardTotal = 0;
  
  // Adăugăm Restaurant-ul custom dacă există
  if (customRestaurantSupplier) {
    standardSuppliers.push(customRestaurantSupplier);
    standardTotal += customRestaurantSupplier.calculatedPrice;
  }
  
  selectedServices.forEach(service => {
    // Sărim peste Restaurant dacă avem deja locație custom
    if (service === 'Restaurant' && customRestaurantSupplier) return;
    
    const suppliers = serviceSuppliers[service];
    if (suppliers && suppliers.length > 0) {
      // Căutăm furnizor cu rating între 4.6-4.7 care nu a fost deja adăugat
      const supplier = suppliers.find(s => s.rating >= 4.6 && s.rating <= 4.7 && !standardUsedIds.has(s.id)) ||
                       suppliers.find(s => !standardUsedIds.has(s.id)) ||
                       suppliers[Math.floor(suppliers.length / 2)] ||
                       suppliers[0];
      if (!standardUsedIds.has(supplier.id)) {
        standardSuppliers.push(supplier);
        standardUsedIds.add(supplier.id);
        standardTotal += supplier.calculatedPrice;
      }
    }
  });
  
  packages.push({
    id: 'standard',
    name: 'Standard',
    description: 'Echilibrul perfect între calitate și preț',
    suppliers: standardSuppliers,
    totalPrice: standardTotal,
    badge: '⭐ Recomandat',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-300'
  });
  
  // PACHET 3: PREMIUM (top rated 4.8+, prețuri mai mari)
  const premiumSuppliers: PackageSupplier[] = [];
  const premiumUsedIds = new Set<string>();
  let premiumTotal = 0;
  
  // Adăugăm Restaurant-ul custom dacă există
  if (customRestaurantSupplier) {
    premiumSuppliers.push(customRestaurantSupplier);
    premiumTotal += customRestaurantSupplier.calculatedPrice;
  }
  
  selectedServices.forEach(service => {
    // Sărim peste Restaurant dacă avem deja locație custom
    if (service === 'Restaurant' && customRestaurantSupplier) return;
    
    const suppliers = serviceSuppliers[service];
    if (suppliers && suppliers.length > 0) {
      // Căutăm furnizor cu rating 4.8+ care nu a fost deja adăugat, preferăm prețuri mai mari
      const topRated = suppliers.filter(s => s.rating >= 4.8 && !premiumUsedIds.has(s.id));
      const availableSuppliers = suppliers.filter(s => !premiumUsedIds.has(s.id));
      const supplier = topRated.length > 0 
        ? topRated[topRated.length - 1] // cel mai scump dintre cei top rated
        : availableSuppliers.length > 0
        ? availableSuppliers[availableSuppliers.length - 1] // sau cel mai scump disponibil
        : suppliers[suppliers.length - 1]; // sau cel mai scump în general
      if (!premiumUsedIds.has(supplier.id)) {
        premiumSuppliers.push(supplier);
        premiumUsedIds.add(supplier.id);
        premiumTotal += supplier.calculatedPrice;
      }
    }
  });
  
  packages.push({
    id: 'premium',
    name: 'Premium',
    description: 'Calitate maximă pentru o experiență de neuitat',
    suppliers: premiumSuppliers,
    totalPrice: premiumTotal,
    badge: '💎 Excelență',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-300'
  });
  
  return packages;
}

// Verifică dacă bugetul este suficient și returnează sugestii
export function checkBudgetAndSuggest(
  packages: Package[],
  budget: number,
  selectedServices: string[]
): {
  canAfford: boolean;
  affordablePackages: string[];
  suggestions: string[];
  mustKeepServices: string[];
  canRemoveServices: string[];
} {
  const economicPackage = packages.find(p => p.id === 'economic');
  const mustKeepServices = selectedServices.slice(0, 3); // Primele 3 cu ⭐
  const canRemoveServices = selectedServices.slice(3); // Restul
  
  if (!economicPackage) {
    return {
      canAfford: true,
      affordablePackages: [],
      suggestions: [],
      mustKeepServices,
      canRemoveServices
    };
  }
  
  const affordablePackages = packages
    .filter(p => p.totalPrice <= budget)
    .map(p => p.id);
  
  const canAfford = economicPackage.totalPrice <= budget;
  const suggestions: string[] = [];
  
  if (!canAfford) {
    // Buget insuficient chiar și pentru pachetul Economic
    const deficit = economicPackage.totalPrice - budget;
    suggestions.push(
      `Bugetul tău este cu ${deficit.toLocaleString()} MDL sub pachetul Economic.`
    );
    
    if (canRemoveServices.length > 0) {
      suggestions.push(
        `Recomandăm să păstrezi doar serviciile esențiale (${mustKeepServices.join(', ')}) și să elimini unele servicii opționale.`
      );
      
      // Sugerăm ce servicii să elimine
      const servicesToRemove = canRemoveServices.slice(0, Math.min(2, canRemoveServices.length));
      if (servicesToRemove.length > 0) {
        suggestions.push(
          `Sugestie: elimină ${servicesToRemove.join(' și ')} pentru a reduce costurile.`
        );
      }
    } else {
      suggestions.push(
        `Recomandăm să crești bugetul sau să revizuiești serviciile selectate.`
      );
    }
  } else if (affordablePackages.length === 1) {
    // Poate afford doar Economic
    suggestions.push(
      `Pachetul Economic se încadrează perfect în bugetul tău!`
    );
    suggestions.push(
      `Pentru pachete superioare, ai nevoie de un buget mai mare.`
    );
  } else if (affordablePackages.length === 2) {
    // Poate afford Economic și Standard
    suggestions.push(
      `Recomandăm pachetul Standard - echilibru perfect între calitate și preț!`
    );
  } else {
    // Poate afford toate
    suggestions.push(
      `Excelent! Toate pachetele se încadrează în bugetul tău.`
    );
    suggestions.push(
      `Recomandăm pachetul Premium pentru o experiență de excepție!`
    );
  }
  
  return {
    canAfford,
    affordablePackages,
    suggestions,
    mustKeepServices,
    canRemoveServices
  };
}
