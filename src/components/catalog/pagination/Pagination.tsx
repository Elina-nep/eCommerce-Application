import './Pagination.scss';

import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import Button from '../../buttons/Button';

type PaginationProps = {
  totalPages: number | undefined;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalPages = 1,
  searchParams,
  setSearchParams,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const currentPage = Number(searchParams.get('page') || 1);

  return (
    <div className="pagination">
      <Button
        className="pagination-button"
        disabled={currentPage <= 1}
        onClick={() => {
          searchParams.set('page', `${currentPage - 1}`);
          setSearchParams(searchParams);
        }}
      >
        &#8592;
      </Button>

      <div className="pagination-button-container-number">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            className={`pagination-button-number ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => {
              searchParams.set('page', `${page}`);
              setSearchParams(searchParams);
            }}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        className="pagination-button"
        disabled={currentPage >= totalPages}
        onClick={() => {
          searchParams.set('page', `${currentPage + 1}`);
          setSearchParams(searchParams);
        }}
      >
        &#8594;
      </Button>
    </div>
  );
};
