import { getProductById } from '@/services/productService';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (id: string) => {
  return useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });
};
