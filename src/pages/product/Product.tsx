import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProductFunc } from '../../util';
import LoadingSpinner from '../../components/loading/LoadingSpinner';

const defaultData: Product = {
  id: '',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  productType: { typeId: 'product-type', id: '' },
  masterData: {
    published: true,
    current: {
      name: { en: '' },
      categories: [],

      slug: { en: '' },

      masterVariant: { id: 0 },
      variants: [],

      searchKeywords: {},
    },
    staged: {
      name: { en: '' },
      categories: [],

      slug: { en: '' },

      masterVariant: { id: 0 },
      variants: [],

      searchKeywords: {},
    },
    hasStagedChanges: false,
  },
};

export const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>(defaultData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getOneProductFunc(params.id)
        .then((res) => {
          console.log(res);
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
    <main className="main-container">
      This is product page {params.id}
      {loading && <LoadingSpinner />}
      {!loading && (
        <div>Product information {product.masterData.current.name['en']}</div>
      )}
    </main>
  );
};
