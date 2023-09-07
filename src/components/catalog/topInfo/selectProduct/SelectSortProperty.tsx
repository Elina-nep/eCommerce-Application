import './SelectSortProperty.scss';

import React, { useState } from 'react';

import {
  AVAILABLE_SORT_OPTIONS,
  FilterStandardComponent,
} from '../../../../types';

export const SelectSortProperty: React.FC<FilterStandardComponent> = ({
  searchParams,
  setSearchParams,
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const currentSort = AVAILABLE_SORT_OPTIONS.filter(
    (el: { value: string; label: string }) =>
      searchParams.get('sort') === el.value,
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
          {AVAILABLE_SORT_OPTIONS.map((option) => (
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
