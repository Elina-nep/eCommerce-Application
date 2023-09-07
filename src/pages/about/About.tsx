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
          holiday goods. We implemented all the functionalities specified in the
          task. Communication was conducted through Discord. Our team leader
          developed a work plan for each sprint, which was very convenient for
          tracking tasks. Almost daily calls and mutual assistance helped us
          fully immerse ourselves in the development process. Each team member
          participated in the development and contributed to the creation of
          this amazing product. Worked on the project:
        </p>
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
            <p>
              Responsibilities include: organizing work, checking task
              completion, configuring the project and the entire development
              environment, setting up the API for working with the server,
              obtaining tokens, routing, setting up navigation, website search,
              filtering, and sorting, work with cart page functionality, setting
              up product database in commercetools, writing tests, design,
              responsive layout.
            </p>
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
            <p>
              Responsibilities include: setting up registration and
              authorization forms on the login page, including working with
              addresses and tokens, implementing functionality on user pages,
              integrating promo codes into the project, creating a shopping cart
              page, writing tests, design, responsive layout.
              <br></br>
              <br></br>
              <br></br>
            </p>
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
            <p>
              Responsibilities include: project design, creating a slider on the
              main page, header and footer setup, catalog page setup with
              product cards, sorting, filtering, pagination, creating a 404
              page, creating an about us page, setting up a product database,
              design, responsive layout.
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </p>
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
