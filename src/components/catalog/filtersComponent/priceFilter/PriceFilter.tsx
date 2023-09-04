import './PriceFilter.scss';

import { Slider, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';

import { FilterStandardComponent } from '../../../../types';
import { priceTheme } from './theme';

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
      <p className="sidebar-filter-material-title">Filter by price:</p>
      <div>
        <ThemeProvider theme={priceTheme}>
          <Slider
            className="price-range"
            getAriaLabel={() => 'Price range'}
            value={[priceFrom, priceTo]}
            max={200}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            onChangeCommitted={setPrices}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};
