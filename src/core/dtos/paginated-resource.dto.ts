export type PaginatedResource<T> = {
  total: number;
  data: T[];
};
