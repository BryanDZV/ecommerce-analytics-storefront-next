import { useQuery } from '@tanstack/react-query';
import { getDiscountByCode, getDiscounts } from '@/services/discountService';
import { DiscountCode } from '@/types/discount';

export const useDiscounts = () => {
  return useQuery<DiscountCode[]>({
    queryKey: ['discounts'],
    queryFn: getDiscounts,
  });
};

export const useDiscount = (code: string) => {
  return useQuery<DiscountCode | undefined>({
    queryKey: ['discount', code],
    queryFn: () => getDiscountByCode(code),
    enabled: !!code,
  });
};
