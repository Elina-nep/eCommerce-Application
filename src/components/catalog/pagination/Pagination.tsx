import './Pagination.scss';

import { Button } from '@mui/material';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number | undefined;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 0,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <Button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &#60; PREV
      </Button>
      <div className="pagination-button-container-number">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`pagination-button-number ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        NEXT &#8594;
      </button>
    </div>
  );
};

export default Pagination;
