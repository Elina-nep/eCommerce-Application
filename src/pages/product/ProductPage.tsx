import React, { useState, useEffect } from 'react';
import { Product } from '../../components/product/Product';
import { useParams } from 'react-router-dom';

export const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('HERE');
    console.log(setProduct);
    // getProductInfo(id).then((data) => setProduct(data));
  }, [id]);

  return (
    <main className="main-container product-page">
      {product && <Product product={product} />}
    </main>
  );
};
