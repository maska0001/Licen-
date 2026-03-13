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