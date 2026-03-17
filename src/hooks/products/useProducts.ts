import { getProducts } from '@/services/productService';
import { PaginatedResponse } from '@/types/paginatedResponse';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });
};
