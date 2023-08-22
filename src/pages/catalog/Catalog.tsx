import Button from '../../components/buttons/Button';
import { getProducts } from '../../services/products/getProducts';

export const CatalogPage = () => {
  return (
    <main className="main-container">
      <p>This is catalog page</p>
      <Button onClick={getProducts}>get products</Button>
    </main>
  );
};
