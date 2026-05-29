import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';
import { PaginatedResponse } from '@/types/paginatedResponse';

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getFilteredProducts = (
  categories: string[] = [],
  priceOrder: 'min-max' | 'max-min' | null = null,
  nameOrder: 'a-z' | 'z-a' | null = null,
  page: number = 1,
  pageSize: number = 4
): PaginatedResponse<Product> => {
  // 1. Filter
  const filtered =
    categories.length === 0
      ? [...products]
      : products.filter((p) => categories.includes(p.category));

  // 2. Price Order
  if (priceOrder === 'min-max') filtered.sort((a, b) => a.price - b.price);
  if (priceOrder === 'max-min') filtered.sort((a, b) => b.price - a.price);

  //3. Alphabetic order
  if (nameOrder === 'a-z') {
    filtered.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
  if (nameOrder === 'z-a') {
    filtered.sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }

  //4. Pagination
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    totalCount,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    pageSize,
  };
};
