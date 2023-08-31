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
  return (
    <aside className="catalog-container-sidebar">
      <Categories
        categories={categories}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="sidebar-filter-price">Filter by Price:</div>
      <QueryFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        allItems={ALL_COLORS}
        queryType={'color'}
      />
      <QueryFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        allItems={ALL_MATERIALS}
        queryType={'material'}
      />
      <QueryFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        allItems={ALL_OCCASIONS}
        queryType={'occasions'}
      />
      <div className="sidebar-filter-occasion">Filter by Occasion:</div>
    </aside>
  );
};
