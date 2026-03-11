import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Gaming Laptop',
    description: 'High performance laptop',
    price: 1500,
    category: 'electronics',
    image: '/laptop.jpg',
    stock: 10,
    rating: 4.5,
    createdAt: '2024-05-01',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise cancelling headphones',
    price: 200,
    category: 'electronics',
    image: '/headphones.jpg',
    stock: 20,
    rating: 4.2,
    createdAt: '2024-05-02',
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    description: 'Basic cotton shirt',
    price: 25,
    category: 'clothing',
    image: '/shirt.jpg',
    stock: 50,
    rating: 4.1,
    createdAt: '2024-05-03',
  },
];
