import React from 'react';
import './Pagination.scss';

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
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        PREV
      </button>
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
        NEXT
      </button>
    </div>
  );
};

export default Pagination;