import { Product } from '@/types/product'
import { create } from 'zustand'

interface ProductStore {
    products: Product[]
    setProducts: (items: Product[]) => void
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],

    setProducts: (items) =>
        set({
            products: items,
        }),
}))

