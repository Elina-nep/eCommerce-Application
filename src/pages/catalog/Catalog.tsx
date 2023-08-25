import { useEffect, useState } from 'react';
import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import Button from '../../components/buttons/Button';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { getCategoriesFunc, getProductsFunc } from '../../util';
import { ProductQueryParams } from '../../types';
import './Catalog.scss';
import { Select } from '../../components/productselect/productselect';

const defaultResponse = {
  limit: 0,
  offset: 0,
  count: 0,
  results: [],
};

export const CatalogPage = () => {
  const [products, setProducts] =
    useState<ProductProjectionPagedQueryResponse>(defaultResponse);
  const [categories, setCategories] =
    useState<CategoryPagedQueryResponse>(defaultResponse);
  const [loading, setLoading] = useState(false);

  const handleGetProducts = (queryParams?: ProductQueryParams) => {
    getProductsFunc(setLoading, queryParams)
      .then((body) => {
        console.log(body);
        setProducts(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    handleGetProducts();
    getCategoriesFunc()
      .then((body) => {
        setCategories(body);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formProducts = () => {
    return products.results.map((el) => {
      const name = el.name['en'];
      const category = categories.results.find(
        (category) => category.id === el.categories[0].id,
      );
      const categoryName = category ? category.name['en'] : '';
      const image = el.masterVariant.images?.[0]?.url ?? '';
      const { centAmount, currencyCode } = el.masterVariant.prices?.[0]
        ?.value || { centAmount: 0, currencyCode: '' };
      const priceValue = centAmount / 100;

      return (
        <div className="product-card" key={el.id}>
          <div className="product-card-image">
            {image && <img src={image} alt={name} />}
          </div>
          <p className="product-card-category">{categoryName}</p>
          <p className="product-card-name">{name}</p>
          {priceValue && (
            <p className="product-card-price">
              {priceValue} {currencyCode}
            </p>
          )}
        </div>
      );
    });
  };

  const formCategories = () => {
    return categories.results.map((el) => {
      const name = el.name['en'];
      return (
        <li
          key={el.id}
          onClick={() => handleGetProducts({ categoryId: el.id })}
        >
          {name}
        </li>
      );
    });
  };

  return (
    <main className="main-container-catalog">
      <div className="catalog-container">
        <div className="catalog-container-sorting">
          <div className="product-item-number">
            Showing all {products.total} results
          </div>
          <Select />
        </div>
        <div className="catalog-container-product">
          <aside>
            <p>Categories</p>
            <ul>{formCategories()}</ul>
            <Button onClick={handleGetProducts}>get products</Button>
          </aside>
          <section className="product-card-wrapper">
            {loading && <LoadingSpinner />}
            {!loading && !!products.count && formProducts()}
          </section>
        </div>
      </div>
    </main>
  );
};
