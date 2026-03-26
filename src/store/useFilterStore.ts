import { create } from 'zustand';

export type Category = 'electronics' | 'clothing' | 'home' | 'accessories';
export type PriceOrder = 'min-max' | 'max-min';
export type NameOrder = 'a-z' | 'z-a';

interface FilterStore {
  selectedCategory: Category | null;
  priceOrder: PriceOrder | null;
  nameOrder: NameOrder | null;
  currentPage: number;
  pageSize: number;

  setSelectedCategory: (category: Category) => void;
  setPriceOrder: (order: PriceOrder) => void;
  setNameOrder: (order: NameOrder) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: null,
  priceOrder: null,
  nameOrder: null,
  currentPage: 1,
  pageSize: 8,

  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setCurrentPage: (page) =>
    set({
      currentPage: page,
    }),

  setSelectedCategory: (category) =>
    set({
      selectedCategory: category,
      currentPage: 1,
    }),
  setPriceOrder: (order) =>
    set({
      priceOrder: order,
      currentPage: 1,
    }),
  setNameOrder: (order) =>
    set({
      nameOrder: order,
      currentPage: 1,
    }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      priceOrder: null,
      nameOrder: null,
    }),
}));
