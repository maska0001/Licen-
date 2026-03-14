// Categorii unificate pentru întreaga aplicație
// Folosite în: Checklist, Suppliers, Budget, EventWizard

export const SUPPLIER_CATEGORIES = [
  'Toate',
  '🎤 Entertainment & atmosferă',
  '📸 Media & conținut',
  '🌸 Decor & styling',
  '🍽️ Mâncare & băuturi',
  '💡 Tehnic & logistic',
  '💄 Beauty & pregătire',
  '🚗 Logistică & suport',
  '🧠 Organizare & planificare',
  '🧾 Print & invitații'
] as const;

export const TASK_CATEGORIES = [
  '📋 General',
  '🎤 Entertainment & atmosferă',
  '📸 Media & conținut',
  '🌸 Decor & styling',
  '🍽️ Mâncare & băuturi',
  '💡 Tehnic & logistic',
  '💄 Beauty & pregătire',
  '🚗 Logistică & suport',
  '🧠 Organizare & planificare',
  '🧾 Print & invitații'
] as const;

const SERVICE_TO_GROUP_MAP: Record<string, string> = {
  'Muzică / DJ': '🎤 Entertainment & atmosferă',
  'Formație live': '🎤 Entertainment & atmosferă',
  'MC / Moderator': '🎤 Entertainment & atmosferă',
  'Animatori (copii / adulți)': '🎤 Entertainment & atmosferă',
  'Dansatori / show artistic': '🎤 Entertainment & atmosferă',
  'Artiști invitați': '🎤 Entertainment & atmosferă',
  'Karaoke': '🎤 Entertainment & atmosferă',
  'Momente speciale (ursitoare, magician, focuri reci)': '🎤 Entertainment & atmosferă',

  'Fotografie': '📸 Media & conținut',
  'Videografie': '📸 Media & conținut',
  'Dronă': '📸 Media & conținut',
  'Photo Booth': '📸 Media & conținut',
  'Video Booth 360°': '📸 Media & conținut',
  'Cabină foto instant': '📸 Media & conținut',
  'Live streaming': '📸 Media & conținut',

  'Decor eveniment (general)': '🌸 Decor & styling',
  'Decor floral': '🌸 Decor & styling',
  'Aranjamente mese': '🌸 Decor & styling',
  'Panou foto / backdrop': '🌸 Decor & styling',
  'Balonistică': '🌸 Decor & styling',
  'Lumânări / sfeșnice': '🌸 Decor & styling',
  'Tematică personalizată': '🌸 Decor & styling',

  'Restaurant': '🍽️ Mâncare & băuturi',
  'Catering': '🍽️ Mâncare & băuturi',
  'Candy bar': '🍽️ Mâncare & băuturi',
  'Tort': '🍽️ Mâncare & băuturi',
  'Prăjituri / deserturi': '🍽️ Mâncare & băuturi',
  'Cocktail bar': '🍽️ Mâncare & băuturi',
  'Bar mobil': '🍽️ Mâncare & băuturi',
  'Degustări (vin)': '🍽️ Mâncare & băuturi',

  'Sonorizare': '💡 Tehnic & logistic',
  'Lumini': '💡 Tehnic & logistic',
  'Ecrane LED / proiector': '💡 Tehnic & logistic',
  'Scenă': '💡 Tehnic & logistic',
  'Generatoare': '💡 Tehnic & logistic',
  'Echipamente speciale': '💡 Tehnic & logistic',

  'Makeup': '💄 Beauty & pregătire',
  'Hairstyling': '💄 Beauty & pregătire',
  'Styling vestimentar': '💄 Beauty & pregătire',
  'Rochii / costume (închiriere)': '💄 Beauty & pregătire',
  'Accesorii': '💄 Beauty & pregătire',

  'Transport invitați': '🚗 Logistică & suport',
  'Transport artiști': '🚗 Logistică & suport',
  'Transfer VIP': '🚗 Logistică & suport',
  'Cazare invitați': '🚗 Logistică & suport',
  'Coordonare ziua evenimentului': '🚗 Logistică & suport',
  'Hostess / personal eveniment': '🚗 Logistică & suport',

  'Organizator eveniment': '🧠 Organizare & planificare',
  'Wedding planner': '🧠 Organizare & planificare',
  'Event manager': '🧠 Organizare & planificare',
  'Coordonator ziua evenimentului': '🧠 Organizare & planificare',
  'Consultanță eveniment': '🧠 Organizare & planificare',
  'Scenariu eveniment (timeline)': '🧠 Organizare & planificare',

  'Invitații digitale': '🧾 Print & invitații',
  'Invitații tipărite': '🧾 Print & invitații',
  'Meniuri': '🧾 Print & invitații',
  'Place cards': '🧾 Print & invitații',
  'Numere de masă': '🧾 Print & invitații',
  'Panou welcome': '🧾 Print & invitații',
  'Mărturii invitați': '🧾 Print & invitații',
};

// Mapping de la categorie furnizor la categorie task (pentru generarea automată)
export function getTaskCategoryFromSupplier(supplierCategory: string): string {
  // Dacă categoria furnizorului e deja cu iconițe, o returnăm direct
  if (TASK_CATEGORIES.includes(supplierCategory as any)) {
    return supplierCategory;
  }
  
  // Fallback pentru categorii vechi fără iconițe
  const categoryMap: { [key: string]: string } = {
    'Entertainment & atmosferă': '🎤 Entertainment & atmosferă',
    'Media & conținut': '📸 Media & conținut',
    'Decor & styling': '🌸 Decor & styling',
    'Mâncare & băuturi': '🍽️ Mâncare & băuturi',
    'Tehnic & logistic': '💡 Tehnic & logistic',
    'Beauty & pregătire': '💄 Beauty & pregătire',
    'Logistică & suport': '🚗 Logistică & suport',
    'Organizare & planificare': '🧠 Organizare & planificare',
    'Print & invitații': '🧾 Print & invitații'
  };
  
  return categoryMap[supplierCategory] || '📋 General';
}

// Helper pentru a obține iconița din categorie
export function getCategoryIcon(category: string): string {
  const match = category.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u);
  return match ? match[0] : '📋';
}

// Helper pentru a obține numele categoriei fără iconițe
export function getCategoryName(category: string): string {
  return category.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, '').trim();
}

export function getSupplierGroup(categoryOrService: string): string {
  const migratedCategory = migrateCategoryToEmoji(categoryOrService);

  if (SUPPLIER_CATEGORIES.includes(migratedCategory as any)) {
    return migratedCategory;
  }

  return SERVICE_TO_GROUP_MAP[categoryOrService] || '📋 General';
}

export function getSupplierLabel(categoryOrService: string): string {
  const group = getSupplierGroup(categoryOrService);
  if (group === '📋 General') {
    return categoryOrService;
  }

  const migratedCategory = migrateCategoryToEmoji(categoryOrService);
  if (SUPPLIER_CATEGORIES.includes(migratedCategory as any)) {
    return getCategoryName(migratedCategory);
  }

  return categoryOrService;
}

// Helper pentru migrarea categoriilor vechi (fără emoji) la cele noi (cu emoji)
export function migrateCategoryToEmoji(category: string): string {
  // Dacă categoria deja are emoji, o returnăm așa cum este
  if (/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u.test(category)) {
    return category;
  }
  
  // Mapping de la categorii vechi la cele noi cu emoji
  const categoryMap: { [key: string]: string } = {
    'General': '📋 General',
    'GENERAL': '📋 General',
    'Entertainment & atmosferă': '🎤 Entertainment & atmosferă',
    'ENTERTAINMENT & ATMOSFERĂ': '🎤 Entertainment & atmosferă',
    'Media & conținut': '📸 Media & conținut',
    'MEDIA & CONȚINUT': '📸 Media & conținut',
    'Decor & styling': '🌸 Decor & styling',
    'DECOR & STYLING': '🌸 Decor & styling',
    'Mâncare & băuturi': '🍽️ Mâncare & băuturi',
    'MÂNCARE & BĂUTURI': '🍽️ Mâncare & băuturi',
    'Tehnic & logistic': '💡 Tehnic & logistic',
    'TEHNIC & LOGISTIC': '💡 Tehnic & logistic',
    'Beauty & pregătire': '💄 Beauty & pregătire',
    'BEAUTY & PREGĂTIRE': '💄 Beauty & pregătire',
    'Logistică & suport': '🚗 Logistică & suport',
    'LOGISTICĂ & SUPORT': '🚗 Logistică & suport',
    'Organizare & planificare': '🧠 Organizare & planificare',
    'ORGANIZARE & PLANIFICARE': '🧠 Organizare & planificare',
    'Print & invitații': '🧾 Print & invitații',
    'PRINT & INVITAȚII': '🧾 Print & invitații'
  };
  
  return categoryMap[category] || `📋 ${category}`;
}
