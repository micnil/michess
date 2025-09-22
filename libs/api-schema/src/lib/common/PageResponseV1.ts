export type PageResponseV1<T> = {
  items: T[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
