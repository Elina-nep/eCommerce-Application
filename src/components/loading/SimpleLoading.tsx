import './LoadingSpinner.scss';

export const SimpleLoading = () => {
  return (
    <div className="surround">
      <ul className="loading">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
