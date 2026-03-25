import { create } from 'zustand';

export type Category = 'electronics' | 'clothing' | 'home' | 'accessories';
export type PriceOrder = 'min-max' | 'max-min';
export type NameOrder = 'a-z' | 'z-a';

interface FilterStore {
  selectedCategory: Category | null;
  priceOrder: PriceOrder | null;
  nameOrder: NameOrder | null;

  setSelectedCategory: (category: Category) => void;
  setPriceOrder: (order: PriceOrder) => void;
  setNameOrder: (order: NameOrder) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: null,
  priceOrder: null,
  nameOrder: null,

  setSelectedCategory: (category) =>
    set({
      selectedCategory: category,
    }),
  setPriceOrder: (order) =>
    set({
      priceOrder: order,
    }),
  setNameOrder: (order) =>
    set({
      nameOrder: order,
    }),
}));
