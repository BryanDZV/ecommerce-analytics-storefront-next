export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}
