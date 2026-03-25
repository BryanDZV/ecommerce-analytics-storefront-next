import { DiscountCode } from '@/types/discount';

const rowDiscounts = [
  { code: 'PRUEBA10', type: 'percentage', value: 10 },
  { code: 'WELCOME20', type: 'percentage', value: 20 },
  { code: 'SALE5', type: 'percentage', value: 5 },
  { code: 'SUMMER15', type: 'percentage', value: 15 },
  { code: 'WINTER25', type: 'percentage', value: 25 },
  { code: 'BLACK30', type: 'percentage', value: 30 },
  { code: 'CYBER40', type: 'percentage', value: 40 },
  { code: 'SPRING12', type: 'percentage', value: 12 },
  { code: 'FLASH8', type: 'percentage', value: 8 },
  { code: 'VIP50', type: 'percentage', value: 50 },

  { code: 'FIXED5', type: 'fixed', value: 5 },
  { code: 'FIXED10', type: 'fixed', value: 10 },
  { code: 'SAVE15', type: 'fixed', value: 15 },
  { code: 'BONUS20', type: 'fixed', value: 20 },
  { code: 'FLAT25', type: 'fixed', value: 25 },
  { code: 'DEAL30', type: 'fixed', value: 30 },
  { code: 'CART7', type: 'fixed', value: 7 },
  { code: 'OFF12', type: 'fixed', value: 12 },
  { code: 'LESS18', type: 'fixed', value: 18 },
  { code: 'MINUS22', type: 'fixed', value: 22 },
];

// normalization
export const discountCodes: DiscountCode[] = rowDiscounts.map((discount) => ({
  code: String(discount.code).trim(),
  type: discount.type as DiscountCode['type'],
  value: Number(discount.value),
}));
