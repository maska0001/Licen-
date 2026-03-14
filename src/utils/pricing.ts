// Pricing calculation utilities

export type PriceType = 'FIX_EVENT' | 'PER_INVITAT';

interface PricingContext {
  guestCount: number;
}

interface Supplier {
  price: number;
  priceType: PriceType;
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

    case 'PER_INVITAT':
      total = supplier.price * context.guestCount;
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
    
    case 'PER_INVITAT':
      return 'per invitat';
    
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
  return `${total.toLocaleString()} MDL`;
}
