import './CatalogFilters.scss';

import {
  ALL_COLORS,
  ALL_MATERIALS,
  ALL_OCCASIONS,
  FiltersT,
} from '../../../types';
import { Categories } from './categories/Categories';
import { PriceFilter } from './priceFilter/PriceFilter';
import { QueryFilter } from './queryFilter/QueryFilter';

export const CatalogFilters = ({
  categories,
  searchParams,
  setSearchParams,
}: FiltersT) => {
  const queryFilterVariants = [
    { allItems: ALL_OCCASIONS, queryType: 'occasions' },
    { allItems: ALL_COLORS, queryType: 'color' },
    { allItems: ALL_MATERIALS, queryType: 'material' },
  ];
  return (
    <aside className="catalog-container-sidebar">
      <Categories
        categories={categories}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <PriceFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {queryFilterVariants.map((queryFilterVariant) => (
        <QueryFilter
          key={queryFilterVariant.queryType}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          allItems={queryFilterVariant.allItems}
          queryType={queryFilterVariant.queryType}
        />
      ))}
    </aside>
  );
};
