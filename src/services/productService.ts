import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';
import { PaginatedResponse } from '@/types/paginatedResponse';

//function to get all products from the simulated database
export const getProducts = (): PaginatedResponse<Product> => {
  return {
    data: products,
    totalCount: products.length,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
  };
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
    ? getProducts().data
    : products.filter((p) => categories.includes(p.category));
};
