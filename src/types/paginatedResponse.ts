// Generic shape for paginated API responses.
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}
