import './ProductTopInfo.scss';

import { ProductTopInfoT } from '../../../types';
import { SelectSortProperty } from './selectProduct/SelectSortProperty';

export const ProductTopInfo = ({
  currentCategory,
  searchParams,
  setSearchParams,
  productsTotal,
}: ProductTopInfoT) => {
  return (
    <div className="product-info-top">
      <SelectSortProperty
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="product-item-category">
        Category: <span className="selected-category">{currentCategory}</span>
      </div>
      <div className="product-item-number">
        Found <span className="product-count">{productsTotal} </span>
        {productsTotal && productsTotal > 1 ? 'products' : 'product'}
      </div>
    </div>
  );
};
