import { PaginatedResponse } from '@/types/paginatedResponse';
import { Product } from '@/types/product';
import { products } from './mockProducts';

export const productsResponse: PaginatedResponse<Product> = {
  data: products,
  totalCount: products.length,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
};
