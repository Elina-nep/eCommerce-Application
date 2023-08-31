import {
  ALL_COLORS,
  ALL_MATERIALS,
  ALL_OCCASIONS,
  FiltersT,
} from '../../../types';
import { Categories } from './categories/Categories';
import { QueryFilter } from './queryFilter/QueryFilter';

export const CatalogFilters = ({
  categories,
  searchParams,
  setSearchParams,
}: FiltersT) => {
  const queryFilterVariants = [
    { allItems: ALL_COLORS, queryType: 'color' },
    { allItems: ALL_MATERIALS, queryType: 'material' },
    { allItems: ALL_OCCASIONS, queryType: 'occasions' },
  ];
  return (
    <aside className="catalog-container-sidebar">
      <Categories
        categories={categories}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="sidebar-filter-price">Filter by Price:</div>
      {queryFilterVariants.map((queryFilterVariant) => (
        <QueryFilter
          key={queryFilterVariant.queryType}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          allItems={queryFilterVariant.allItems}
          queryType={queryFilterVariant.queryType}
        />
      ))}

      <div className="sidebar-filter-occasion">Filter by Occasion:</div>
    </aside>
  );
};
