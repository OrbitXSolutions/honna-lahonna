// Pagination result interface
export interface PaginatedResult<T> {
  data: Partial<T>[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
