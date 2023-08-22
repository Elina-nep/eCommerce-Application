import { useContext, useState } from 'react';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import Button from '../../components/buttons/Button';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { AuthContext } from '../../context/AuthProvider';

export const CatalogPage = () => {
  const { loading, getProducts } = useContext(AuthContext);
  const [products, setProducts] = useState<ProductPagedQueryResponse>({
    limit: 0,
    offset: 0,
    count: 0,
    results: [],
  });

  const handleGetProducts = () => {
    getProducts()
      .then((body) => {
        setProducts(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formProducts = () => {
    return products.results.map((el) => {
      const name = el.masterData.current.name['en'];
      return <p key={el.id}>{name}</p>;
    });
  };

  return (
    <main className="main-container">
      <p>This is catalog page</p>
      <Button onClick={handleGetProducts}>get products</Button>
      {loading && <LoadingSpinner />}
      {!loading && !!products.count && formProducts()}
    </main>
  );
};
