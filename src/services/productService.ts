import { products } from '@/mocks/mockProducts';

//function to get all products from the simulated database
export const getProducts = () => {
  return products;
};

//function to get a product and view its details
export const getProductById = (id: string) => {
  return products.find((p) => {
    return p.id === id;
  });
};

//function that gives an array with the products of a specific category
export const getProductsByCategory = (category: string) => {
  return products.filter((p) => {
    return p.category === category;
  });
};
