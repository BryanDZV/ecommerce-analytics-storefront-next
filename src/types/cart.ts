import type { Product } from './product';

// Product stored in cart with selected quantity.
export interface CartItem extends Product {
  quantity: number;
}
