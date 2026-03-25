import { useQuery } from '@tanstack/react-query';
import {
  getProducts,
  getProductById,
  getFilteredProducts,
} from '@/services/productService';
import { Product } from '@/types/product';
import { PaginatedResponse } from '@/types/paginatedResponse';
import { useFilterStore } from '@/store/useFilterStore';

const withQueryDefaults = () => ({
  staleTime: 1000 * 60 * 5, //5 minutes: Data is considered "fresh" for 5 min.
  retry: 1,
});

// Hook for general list
export const useListProducts = () => {
  return useQuery<PaginatedResponse<Product>>({
    //Structure: [Domain, Action]
    queryKey: ['products', 'list'],
    queryFn: () => getProducts(),
    ...withQueryDefaults(),
  });
};

// Hook for detail (DYNAMIC)
export const useProduct = (id: string) => {
  return useQuery<Product | undefined>({
    //Structure: [Domain, Action, ID]
    queryKey: ['products', 'detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id, //<---Only executed if the id has content
    ...withQueryDefaults(),
  });
};

export const useFilteredProducts = () => {
  //We read Zustand filters
  const { selectedCategory, priceOrder, nameOrder } = useFilterStore();

  return useQuery({
    // The key identifies the search. If you change a filter in Zustand, React Query detects it.
    queryKey: ['products', 'list', { selectedCategory, priceOrder, nameOrder }],
    queryFn: () =>
      getFilteredProducts(
        selectedCategory ? [selectedCategory] : [],
        priceOrder,
        nameOrder
      ),

    staleTime: 1000 * 60 * 60,
  });
};
