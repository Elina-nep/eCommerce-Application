import './ProductTopInfo.scss';

import { SetURLSearchParams } from 'react-router-dom';

import { SelectSortProperty } from './selectProduct/SelectSortProperty';

type ProductTopInfoT = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  productsTotal?: number;
};

export const ProductTopInfo = ({
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

      <div className="product-item-number">
        Found <span className="product-count"> {productsTotal} </span>
        {productsTotal && productsTotal > 1 ? 'products' : 'product'}
      </div>
    </div>
  );
};
