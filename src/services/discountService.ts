import { discountCodes } from '@/mocks/mockDiscounts';
import { DiscountCode } from '@/types/discount';

// get all codes
export const getDiscounts = (): DiscountCode[] => {
  return discountCodes;
};

// get a specific code
export const getDiscountByCode = (code: string): DiscountCode | undefined => {
  return discountCodes.find((d) => d.code === code.trim());
};

// calculate discount
export const calculateDiscount = (
  discount: DiscountCode,
  subtotal: number
): number => {
  if (discount.type === 'percentage') {
    const percentage = discount.value / 100;
    const rawDiscount = subtotal * percentage;

    return Math.round(rawDiscount * 100) / 100;
  }

  return Math.min(discount.value, subtotal);
};
