import { create } from 'zustand'
import type { CartItem } from '../types/cart'

interface CartStore {
    cart: CartItem[]
}

export const useCartStore = create<CartStore>(() => ({
    cart: [],
}))