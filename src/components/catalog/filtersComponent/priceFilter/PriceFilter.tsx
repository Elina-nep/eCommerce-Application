import './PriceFilter.scss';

import { Slider } from '@mui/material';
import React, { useState } from 'react';

import { FilterStandardComponent } from '../../../../types';

export const PriceFilter = ({
  searchParams,
  setSearchParams,
}: FilterStandardComponent) => {
  const [priceFrom, setPriceFrom] = useState<number>(
    searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : 0,
  );
  const [priceTo, setPriceTo] = useState<number>(
    searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : 200,
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceFrom(newValue[0]);
      setPriceTo(newValue[1]);
    }
  };

  const setPrices = () => {
    searchParams.set('priceFrom', `${priceFrom * 100}`);
    searchParams.set('priceTo', `${priceTo * 100}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="sidebar-filter-material">
      Filter by price:
      <div>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={[priceFrom, priceTo]}
          max={200}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          onChangeCommitted={setPrices}
        />
      </div>
    </div>
  );
};
