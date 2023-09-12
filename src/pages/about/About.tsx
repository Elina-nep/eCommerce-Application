import './About.scss';

import imageToAddRS from '../../assets/logo rs.png';
import { DeveloperCard } from '../../components/about/DeveloperCard';
import { DEVELOPERS } from '../../util';
export const AboutPage = () => {
  return (
    <main className="about-us-main-container">
      <div className="about-us-content-wrapper">
        <div className="about-us-team">
          <h2>
            Team: <span>BeeFront Developers</span>
          </h2>
          <p>
            Our team designed this nice online store for holiday goods as a part
            of{' '}
            <a
              href="https://rs.school/js/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RS School frontend course
            </a>
            . More information about the task you can find on{' '}
            <a
              href="https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application"
              target="_blank"
              rel="noopener noreferrer"
            >
              eCommerce-Application page{' '}
            </a>
            from RS School. We hope you will have a pleasant experience while
            using the app.
          </p>

          <p>Main technologies and libraries we used: </p>
          <ul>
            <li>Create-react-app;</li>
            <li>Typescript;</li>
            <li>React-router-dom;</li>
            <li>Eslint and prettier;</li>
            <li>Husky;</li>
            <li>Jest;</li>
            <li>Redux;</li>
            <li>GitHub actions for deploy;</li>
          </ul>

          <p>
            Our team leader developed a work plan for each sprint, which was
            very convenient for tracking tasks.We tracked the completion of
            tasks in GitHub Project planning for developers.
          </p>
          <p>
            Communication was conducted through Discord. Almost daily calls and
            mutual assistance helped us fully immerse ourselves in the
            development process.
          </p>
          <p>
            Each team member participated in the development and contributed to
            the creation of this amazing product.
          </p>
          <p className="about-us-team-last-paragraph">Worked on the project:</p>
        </div>

        <div className="about-us-card-wrapper">
          {DEVELOPERS.map((el) => (
            <DeveloperCard key={el.name} {...el} />
          ))}
        </div>
        <div className="about-us-rs">
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imageToAddRS}
              alt="RSSchool logo"
              className="about-us-rs-logo"
            ></img>
          </a>
          <p>Learn more about RS School</p>
        </div>
      </div>
    </main>
  );
};
