import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';

//function to get all products from the simulated database
export const getProducts = (): Product[] => {
  return products;
};

//function to get a product and view its details
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => {
    return p.id === id;
  });
};
//function that gives an array with the products that belong to the categories selected by the user.

export const getProductsByCategory = (categories: string[]): Product[] => {
  return !categories || categories.length === 0
    ? getProducts()
    : products.filter((p) => categories.includes(p.category));
};
