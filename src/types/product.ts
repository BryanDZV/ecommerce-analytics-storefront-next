export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'clothing' | 'home' | 'accessories';
  image: string;
  stock: number;
  rating: number;
  createdAt: string;
}
