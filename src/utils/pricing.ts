// Pricing calculation utilities

export type PriceType = 'FIX_EVENT' | 'PER_PERSON' | 'PER_HOUR' | 'PER_INVITAT' | 'PER_ORA' | 'PER_UNITATE' | 'PACHET' | 'ESTIMATIV';

interface PricingContext {
  guestCount: number;
  durationHours?: number;
  eventType?: string;
}

interface Supplier {
  price: number;
  priceType: PriceType;
  unitLabel?: string;
  minUnits?: number;
}

// Calculate final price based on pricing type and context
export function calculateSupplierPrice(
  supplier: Supplier,
  context: PricingContext
): number {
  let total = 0;

  switch (supplier.priceType) {
    case 'FIX_EVENT':
      total = supplier.price;
      break;

    case 'PER_PERSON':
    case 'PER_INVITAT':
      total = supplier.price * context.guestCount;
      break;

    case 'PER_UNITATE':
      // Usually same as guest count for invitations, menus, etc.
      total = supplier.price * context.guestCount;
      break;

    case 'PER_HOUR':
    case 'PER_ORA':
      const hours = Math.max(
        context.durationHours || 4,
        supplier.minUnits || 1
      );
      total = supplier.price * hours;
      break;

    case 'PACHET':
      total = supplier.price;
      break;

    case 'ESTIMATIV':
      total = supplier.price;
      
      // Apply guest count multiplier for estimative pricing
      if (context.guestCount > 100) {
        total *= 1.2;
      }
      
      // Apply event type multiplier
      if (context.eventType === 'Nuntă') {
        total *= 1.2;
      }
      break;

    default:
      total = supplier.price;
  }

  return total;
}

// Format price display for UI
export function formatPriceDisplay(supplier: Supplier): string {
  switch (supplier.priceType) {
    case 'FIX_EVENT':
      return 'per eveniment';
    
    case 'PER_PERSON':
    case 'PER_INVITAT':
      return 'per persoană';
    
    case 'PER_UNITATE':
      return `per ${supplier.unitLabel || 'unitate'}`;
    
    case 'PER_HOUR':
    case 'PER_ORA':
      const minText = supplier.minUnits ? ` (min. ${supplier.minUnits} ore)` : '';
      return `per oră${minText}`;
    
    case 'PACHET':
      return 'pachet';
    
    case 'ESTIMATIV':
      return 'estimativ';
    
    default:
      return '';
  }
}

// Format estimated total for UI
export function formatEstimatedTotal(
  supplier: Supplier,
  context: PricingContext
): string {
  const total = calculateSupplierPrice(supplier, context);
  
  if (supplier.priceType === 'ESTIMATIV') {
    return `~${total.toLocaleString()} MDL`;
  }
  
  return `${total.toLocaleString()} MDL`;
}