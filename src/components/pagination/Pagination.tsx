import React from 'react';
import { useSearchParams } from 'react-router-dom';

export type PaginationType = {
  limit?: number;
  offset?: number;
  total?: number;
};

export default function Pagination({ limit, offset, total }: PaginationType) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (limit === undefined || offset === undefined || total === undefined) {
    return <p>Invalid props</p>;
  }

  const pagesQuantity = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const visiblePagesCount = 5;
  const pageButtons = [];

  const startPage = Math.max(currentPage - Math.floor(visiblePagesCount / 2), 1);
  const endPage = Math.min(startPage + visiblePagesCount - 1, pagesQuantity);

  function handlePageChange(newOffset: number) {
    if (!limit) return;
    const params = new URLSearchParams(searchParams);
    params.set('offset', ((newOffset - 1) * limit).toString());
    setSearchParams(params);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageButtons.push(
      <button key={i} type="button" onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
        {i}
      </button>
    );
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button type="button" onClick={() => handlePageChange(prevPage)}>
          Previous
        </button>
      )}
      {pageButtons}
      {currentPage < pagesQuantity && (
        <button type="button" onClick={() => handlePageChange(nextPage)}>
          Next
        </button>
      )}
    </div>
  );
}

Pagination.defaultProps = {
  limit: 10,
  offset: 0,
  total: 0,
};
