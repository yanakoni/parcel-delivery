import { useCallback } from 'react';
import { CursorPaginationMeta, PagePaginationMeta } from '../api';

interface UsePaginationProps {
  responseMeta?: PagePaginationMeta | CursorPaginationMeta;
  page: number;
  setPaginationQuery: (value: Record<string, string>) => void;
}

export const usePagination = ({ responseMeta, page, setPaginationQuery }: UsePaginationProps) => {
  const next = useCallback(() => {
    if (!responseMeta) return;

    setPaginationQuery({
      'page[number]': (page + 1).toString(),
    });
  }, [page, responseMeta, setPaginationQuery]);

  const prev = useCallback(() => {
    if (!responseMeta) return;

    setPaginationQuery({
      'page[number]': (page - 1).toString(),
    });
  }, [page, responseMeta, setPaginationQuery]);

  return {
    next,
    prev,
  };
};
