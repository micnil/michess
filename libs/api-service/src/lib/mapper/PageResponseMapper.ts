import { PageResponseV1 } from '@michess/api-schema';

export const PageResponseMapper = {
  toPageResponse: <T>({
    data,
    totalItems,
    page,
    limit,
  }: {
    data: T[];
    totalItems: number;
    page: number;
    limit: number;
  }): PageResponseV1<T> => {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      items: data,
      totalPages,
      currentPage: page,
      pageSize: data.length,
    };
  },
};
