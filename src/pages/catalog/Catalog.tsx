import { useEffect, useState } from 'react';
import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import Button from '../../components/buttons/Button';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { getCategoriesFunc, getProductsFunc } from '../../util';
import './Catalog.scss';

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

  const handleGetProducts = () => {
    getProductsFunc(setLoading)
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
      // const name = el.masterData.current.name['en'];
      return <p key={el.id}>{name}</p>;
    });
  };

  const formCategories = () => {
    return categories.results.map((el) => {
      const name = el.name['en'];
      return <li key={el.id}>{name}</li>;
    });
  };

  return (
    <main className="main-container catalog-container">
      <aside>
        <p>Categories</p>
        <ul>{formCategories()}</ul>
        <Button onClick={handleGetProducts}>get products</Button>
      </aside>
      <section>
        {loading && <LoadingSpinner />}
        {!loading && !!products.count && formProducts()}
      </section>
    </main>
  );
};
