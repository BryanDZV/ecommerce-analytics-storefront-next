import { getProductsByCategory } from '@/services/productService';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const useProductByCategories = (categories: string[]) => {
  return useQuery<Product[]>({
    queryKey: ['products', categories],
    queryFn: () => getProductsByCategory(categories),
  });
};
