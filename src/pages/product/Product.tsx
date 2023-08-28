import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <main className="main-container"> This is product page {params.id}</main>
  );
};
