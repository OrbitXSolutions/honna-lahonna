// Pagination parameters interface
export interface PaginationParams<T> {
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
  filter?: Partial<T>;
  search?: string;
}
