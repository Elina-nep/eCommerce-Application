import imageToAddGit from '../../assets/logo git.png';
import { IDeveloper } from '../../types';

export const DeveloperCard = (developer: IDeveloper) => {
  return (
    <div className="about-us-card ">
      <div
        className="about-us-photo"
        style={{ backgroundImage: `url(${developer.photo})` }}
      ></div>
      <div>
        <h2 className="name">
          <a
            href={developer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="about-us-git-link"
          >
            {developer.name}{' '}
            <img
              src={imageToAddGit}
              alt="git logo"
              className="about-us-git-logo"
            ></img>
          </a>
        </h2>
        <div className="about-us-description">
          <p>{developer.role}</p>
          <div>
            <p className="about-us-description-title">
              Responsibilities include:
            </p>
            <ul>
              {developer.done.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
