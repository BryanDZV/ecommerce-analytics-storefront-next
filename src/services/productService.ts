//src/services/productService.ts
import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';
import { PaginatedResponse } from '@/types/paginatedResponse';

/**
 *Gets all products from the mock database.
 *@returns An object with the products and pagination data.
 */
export const getProducts = (): PaginatedResponse<Product> => {
  return {
    data: products, //Complete list of products
    totalCount: products.length, //Total products
    page: 1, //Current page (simulated)
    totalPages: 1, //Total pages (simulated)
    hasNextPage: false, //No more pages (mock)
  };
};

/**
 *Search for a product by its ID.
 *@param id -ID of the product to search
 *@returns The product found or undefined if it does not exist
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

/**
 *Filter and sort products according to categories, price and name.
 *@param categories -Categories to filter by
 *@param priceOrder -Price order ('min-max' or 'max-min')
 *@param nameOrder -Alphabetical order ('a-z' or 'z-a')
 *@returns Filtered and sorted products with pagination data
 */
export const getFilteredProducts = (
  categories: string[],
  priceOrder: 'min-max' | 'max-min' | null,
  nameOrder: 'a-z' | 'z-a' | null
): PaginatedResponse<Product> => {
  //1. Filter by categories
  const filtered =
    categories.length === 0
      ? [...products]
      : products.filter((p) => categories.includes(p.category));

  //2. Sort by price
  if (priceOrder === 'min-max') filtered.sort((a, b) => a.price - b.price);
  if (priceOrder === 'max-min') filtered.sort((a, b) => b.price - a.price);

  //3. Sort alphabetically from A to Z
  if (nameOrder === 'a-z') {
    filtered.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }

  //4. Sort alphabetically from Z to A
  if (nameOrder === 'z-a') {
    filtered.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
    );
  }

  //Return filtered and sorted products with simulated pagination data
  return {
    data: filtered,
    totalCount: filtered.length,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
  };
};
