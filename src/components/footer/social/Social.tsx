import './Social.scss';

import React from 'react';
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from 'react-icons/ai';

export const Social: React.FC = () => {
  return (
    <ul className="social_wrapper">
      <a
        href="https://www.instagram.com/rollingscopes/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="social_link"
      >
        <li className="icon instagram">
          <AiOutlineInstagram />
        </li>
      </a>
      <a
        href="https://www.facebook.com/groups/TheRollingScopes/"
        target="_blank"
        rel="noopener noreferrer"
        className="social_link"
      >
        <li className="icon facebook">
          <AiOutlineFacebook />
        </li>
      </a>
      <a
        href="https://www.youtube.com/c/RollingScopesSchool"
        target="_blank"
        rel="noopener noreferrer"
        className="social_link"
      >
        <li className="icon twitter">
          <AiOutlineYoutube />
        </li>
      </a>
    </ul>
  );
};
