import { useContext } from 'react';

import { AuthContext } from '../../context/AuthProvider';

export const CartPage = () => {
  // const [ifLoading, setIfLoading] = useState(false);
  const { cart } = useContext(AuthContext);

  return (
    <main className="main-container">
      <div>
        <h2>This is cart page</h2>

        {cart.lineItems.map((el) => (
          <p key={el.id}>
            {el.name['en']} / {el.quantity}
          </p>
        ))}
      </div>

      {/* {ifLoading && <LoadingSpinner />} */}
    </main>
  );
};
