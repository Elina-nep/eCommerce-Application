import './Pagination.scss';

import React, { useEffect, useState } from 'react';
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {pageNumbers.map((page) => {
          if (windowWidth < 484 || windowWidth > 768) {
            return (
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
            );
          } else {
            const isFirstPage = page === 1;
            const isLastPage = page === totalPages;
            const isCurrentPage = page === currentPage;
            const isAdjacentPage =
              windowWidth <= 768 && (isFirstPage || isLastPage);
            const shouldShowLeftEllipsis = isCurrentPage && currentPage > 2;
            const shouldShowRightEllipsis =
              isCurrentPage && currentPage < totalPages - 1;

            const shouldShowButton =
              isFirstPage || isLastPage || isCurrentPage || isAdjacentPage;

            return shouldShowButton ? (
              <React.Fragment key={page}>
                {shouldShowLeftEllipsis && (
                  <span className="pagination-button-ellipsis">...</span>
                )}
                <Button
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
                {shouldShowRightEllipsis && (
                  <span className="pagination-button-ellipsis">...</span>
                )}
              </React.Fragment>
            ) : null;
          }
        })}
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
