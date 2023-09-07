import './About.scss';

import imageToAddElina from '../../assets/Elina.jpg';
import imageToAddGalina from '../../assets/Galina.jpg';
import imageToAddGarland from '../../assets/garland.png';
import imageToAddIrina from '../../assets/Irina.jpg';
import imageToAddGit from '../../assets/logo git.png';
import imageToAddRS from '../../assets/logo rs.png';
export const AboutPage = () => {
  return (
    <main className="about-us-main-container">
      <div>
        <img
          src={imageToAddGarland}
          alt="Garland"
          className="about-us-garland"
        ></img>
      </div>
      <div className="about-us-team">
        <h2>
          Team: <span>BeeFront Developers</span>
        </h2>
        <p>
          Our team worked on developing a website for an online store that sells
          holiday goods. The development was carried out as part of the task of
          the{' '}
          <a
            href="https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application"
            target="_blank"
            rel="noopener noreferrer"
          >
            eCommerce-Application{' '}
          </a>
          from RS School. We implemented all the functionalities specified in
          the task.
        </p>

        <p>Technologies and libraries we used: </p>
        <ul>
          <li>Create-react-app;</li>
          <li>Typescript;</li>
          <li>React-router-dom library;</li>
          <li>Eslint and prettier;</li>
          <li>Husky;</li>
          <li>Jest.</li>
        </ul>

        <p>
          Our team leader developed a work plan for each sprint, which was very
          convenient for tracking tasks.We tracked the completion of tasks in
          GitHub:
          <a
            href="https://github.com/users/Elina-nep/projects/2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Project planning for developers.
          </a>
        </p>
        <p>
          Communication was conducted through Discord. Almost daily calls and
          mutual assistance helped us fully immerse ourselves in the development
          process.
        </p>
        <p>
          Each team member participated in the development and contributed to
          the creation of this amazing product.
        </p>
        <p className="about-us-team-last-paragraph">Worked on the project:</p>
      </div>

      <div className="about-us-card-wrapper">
        <div className="about-us-card elina">
          <div>
            <img
              src={imageToAddElina}
              alt="Elina"
              className="about-us-photo"
            ></img>
          </div>
          <p>Elina</p>
          <div className="about-us-description">
            <h2>Team Lead</h2>
            <div>
              <p className="about-us-description-title">
                Responsibilities include:
              </p>
              <ul>
                <li>organizing work,</li>
                <li>checking task completion,</li>
                <li>
                  configuring the project and the entire development
                  environment,
                </li>
                <li>setting up the API for working with the server,</li>
                <li>obtaining tokens,</li>
                <li>routing,</li>
                <li>setting up navigation, </li>
                <li>website search,</li>
                <li>filtering,</li>
                <li>sorting,</li>
                <li>work with cart page functionality, </li>
                <li>setting up product database in commercetools,</li>
                <li>writing tests,</li>
                <li>design,</li>
                <li>responsive layout.</li>
              </ul>
            </div>
          </div>
          <div className="about-us-git-link">
            <a
              href="https://github.com/Elina-nep"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageToAddGit}
                alt="git logo"
                className="about-us-git-logo"
              ></img>
            </a>
          </div>
        </div>
        <div className="about-us-card irina">
          <div>
            <img
              src={imageToAddIrina}
              alt="Irina"
              className="about-us-photo"
            ></img>
          </div>
          <p>Irina</p>
          <div className="about-us-description">
            <h2>Middle</h2>
            <div>
              <p className="about-us-description-title">
                Responsibilities include:
              </p>
              <ul>
                <li>setting up registration on the register page,</li>
                <li>working with addresses and tokens,</li>
                <li>authorization forms on the login page,</li>
                <li>implementing functionality on user pages,</li>
                <li>
                  integrating promocodes from commercetools into the project,
                </li>
                <li>creating a shopping cart page,</li>
                <li>writing tests,</li>
                <li>design,</li>
                <li>responsive layout.</li>
              </ul>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
          <div className="about-us-git-link">
            <a
              href="https://github.com/iradzh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageToAddGit}
                alt="git logo"
                className="about-us-git-logo"
              ></img>
            </a>
          </div>
        </div>
        <div className="about-us-card galina">
          <div>
            <img
              src={imageToAddGalina}
              alt="Galina"
              className="about-us-photo"
            ></img>
          </div>
          <p>Galina</p>
          <div className="about-us-description">
            <h2>Junior</h2>
            <div>
              <p className="about-us-description-title">
                Responsibilities include:
              </p>
              <ul>
                <li>project design,</li>
                <li>catalog page setup with product cards,</li>
                <li>sorting,</li>
                <li>filtering, </li>
                <li>pagination,</li>
                <li>creating a 404 page,</li>
                <li>creating an about us page,</li>
                <li>header and footer setup,</li>
                <li>creating a slider on the main page,</li>
                <li>setting up a product database,</li>
                <li>design,</li>
                <li>responsive layout.</li>
              </ul>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
          <div className="about-us-git-link">
            <a
              href="https://github.com/HalinaD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageToAddGit}
                alt="git logo"
                className="about-us-git-logo"
              ></img>
            </a>
          </div>
        </div>
      </div>
      <div className="about-us-rs">
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img
            src={imageToAddRS}
            alt="RSSchool logo"
            className="about-us-rs-logo"
          ></img>
        </a>
        <p>Learn more about RS School</p>
      </div>
      <div>
        <img
          src={imageToAddGarland}
          alt="Garland"
          className="about-us-garland-rotate"
        ></img>
      </div>
    </main>
  );
};
