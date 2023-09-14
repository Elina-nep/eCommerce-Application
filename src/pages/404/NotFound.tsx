import './NotFound.scss';

import { Link } from 'react-router-dom';

import imageToAddError from '../../assets/swinging.gif';

export const NotFound = () => {
  return (
    <>
      <div className="not-found-page">
        <div>
          <img
            src={imageToAddError}
            alt="404 Image"
            className="not-found-page-img"
          ></img>
        </div>
        <div className="not-found-page-text">
          <h3>
            Something‘s wrong here... We can‘t find page you‘re looking for.
            Check it out or head back to home
          </h3>
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
};
