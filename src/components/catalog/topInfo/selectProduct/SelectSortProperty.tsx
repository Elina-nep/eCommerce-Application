import './SelectSortProperty.scss';

import React, { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

const options = [
  { value: '', label: 'default' },
  { value: 'price asc', label: 'price: low to high' },
  { value: 'price desc', label: 'price: high to low' },
  { value: 'name.en asc', label: 'name: a to z' },
  { value: 'name.en desc', label: 'name: z to a' },
];

type SelectSortPropertyT = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const SelectSortProperty: React.FC<SelectSortPropertyT> = ({
  searchParams,
  setSearchParams,
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const currentSort = options.filter(
    (el) => searchParams.get('sort') === el.value,
  );

  return (
    <div className="sort-select">
      <div
        className="sort-select-title"
        onClick={() => {
          setShowSelect(!showSelect);
        }}
      >
        Sorting properties{' '}
        <span className="current-sort">
          {currentSort[0]?.label || 'default'}
        </span>
      </div>
      {showSelect && (
        <div className="sort-select-container">
          {options.map((option) => (
            <div
              className="sort-select-item"
              key={option.value}
              onClick={() => {
                searchParams.set('sort', option.value);
                setSearchParams(searchParams);
                setShowSelect(false);
              }}
            >
              Sort by {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
