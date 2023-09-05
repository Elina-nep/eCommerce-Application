import './ProductPage.scss';

import {
  CategoryPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { ProductComponent } from '../../components/product/ProductComponent';
import {
  defaultCatalogeResponse,
  defaultProductData,
  getCategories,
  getOneProduct,
} from '../../util';

export const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>(defaultProductData);
  const [categories, setCategories] = useState<CategoryPagedQueryResponse>(
    defaultCatalogeResponse,
  );
  const [loading, setLoading] = useState(false);

  const getCategoriesForProduct = () => {
    getCategories()
      .then((body) => {
        setCategories(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getCategoriesForProduct();
      getOneProduct(params.id)
        .then((res) => {
          setProduct(res);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id]);
  return (
    <main className="main-container product-page">
      {loading && <LoadingSpinner />}
      {!loading && (
        <ProductComponent
          product={product.masterData}
          categories={categories}
          id={product.id}
        />
      )}
    </main>
  );
};
