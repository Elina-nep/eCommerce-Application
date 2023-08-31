import './Catalog.scss';

import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CatalogFilters } from '../../components/catalog/filtersComponent/CatalogFilters';
import { Pagination } from '../../components/catalog/pagination/Pagination';
import { ProductCard } from '../../components/catalog/productCard/ProductCard';
import { ProductTopInfo } from '../../components/catalog/topInfo/ProductTopInfo';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { ProductQueryParams } from '../../types';
import {
  findCurrentCategoryId,
  getCategories,
  getProducts,
  PRODUCTS_ON_PAGE,
} from '../../util';

const defaultResponse = {
  limit: 0,
  offset: 0,
  count: 0,
  results: [],
};

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] =
    useState<ProductProjectionPagedQueryResponse>(defaultResponse);
  const [categories, setCategories] =
    useState<CategoryPagedQueryResponse>(defaultResponse);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [queryParams, setQueryParams] = useState<ProductQueryParams>({});

  const handleGetProducts = (queryParams: ProductQueryParams) => {
    getProducts(setLoading, queryParams)
      .then((body) => {
        setProducts(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (loaded) {
      handleGetProducts(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    getCategories()
      .then((body) => {
        setCategories(body);
        const currentCategoryId = findCurrentCategoryId(
          body,
          searchParams.get('category') || '',
        );
        setQueryParams({
          ...queryParams,
          sort: searchParams.get('sort') || undefined,
          pageNum: Number(searchParams.get('number')) || 1,
          colors: searchParams.getAll('color') || undefined,
          materials: searchParams.getAll('material') || undefined,
          occasions: searchParams.getAll('occasions') || undefined,
          categoryName: searchParams.get('category') || 'all',
          categoryId: currentCategoryId,
          filterPrice: {
            to: searchParams.get('priceTo') || undefined,
            from: searchParams.get('priceFrom') || undefined,
          },
        });
        setLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentCategoryId = findCurrentCategoryId(
      categories,
      searchParams.get('category') || '',
    );
    setQueryParams({
      ...queryParams,
      sort: searchParams.get('sort') || undefined,
      pageNum: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
      categoryName: searchParams.get('category') || 'all',
      categoryId: currentCategoryId,
      colors: searchParams.getAll('color'),
      materials: searchParams.getAll('material'),
      occasions: searchParams.getAll('occasions'),
      filterPrice: {
        to: searchParams.get('priceTo') || undefined,
        from: searchParams.get('priceFrom') || undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <main className="main-container main-container-catalog">
      <div className="catalog-container">
        <ProductTopInfo
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          productsTotal={products.total}
        />

        <div className="catalog-container-product">
          <CatalogFilters
            categories={categories}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <div className="catalog-container-right-side">
            <section className="product-card-wrapper">
              {loading && <LoadingSpinner />}
              {!loading &&
                !!products.total &&
                products.results.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </section>
            {!!products.total && !loading && (
              <Pagination
                totalPages={Math.ceil(products.total / PRODUCTS_ON_PAGE)}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
