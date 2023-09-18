import './DeveloperCard.scss';

import imageToAddGit from '../../assets/logo git.png';
import { IDeveloper } from '../../types';

export const DeveloperCard = (developer: IDeveloper) => {
  return (
    <div className="about_card">
      <div className="about_card__header">
        <img
          src={developer.photo}
          alt={developer.name}
          className="about_card__photo"
        />
        <h2 className="about_card__title">
          <a
            href={developer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="about_card__link"
          >
            <img
              src={imageToAddGit}
              alt="git logo"
              className="about_card__git_logo"
            />
            {developer.name}{' '}
          </a>
          <p>{developer.role}</p>
        </h2>
      </div>
      <div className="about__description">
        <p className="about__bio">{developer.bio}</p>
        <div>
          <p className="about__resp">Responsibilities:</p>
          <ul className="about_card__ul">
            {developer.done.map((el, index) => (
              <li key={index} className="about_card__li">
                {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
