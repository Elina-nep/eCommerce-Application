import { getProducts } from '../../services/products/getProducts';

export const MainPage = () => {
  return (
    <main>
      <p>This is Main page</p>
      <button onClick={getProducts}>GET PRODUCTS</button>
    </main>
  );
};
