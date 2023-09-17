import './About.scss';

import imageToAddRS from '../../assets/logo rs.png';
import { DeveloperCard } from '../../components/about/DeveloperCard';
import { DEVELOPERS } from '../../util';
import { ABOUT_IMAGE } from '../../util/constants';
import { InfiniteLoop } from '../infiniteScroll/InfiniteScroll';

export const About = () => {
  return (
    <div className="about">
      <div className="about__header">
        <div className="about__header_content">
          <div className="about__header_typography">
            <h2>
              Team: <span>BeeFront Developers</span>
            </h2>
            <p>
              {`Our team, part of the `}
              <a
                href="https://rs.school/js/"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School FE course
              </a>
              {`, proudly presents this online store for holiday goods. We've
            designed it with passion and dedication, and you can learn more
            about the project `}
              <a
                href="https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
            <p>
              {`
            Our team lead devised a detailed sprint plan for efficient task
            tracking, managed through GitHub Project. Discord served as our
            communication hub, allowing for daily calls and mutual support.
            `}
            </p>
            <p>
              {`Each team member actively contributed to this remarkable product's
              creation.`}
            </p>
          </div>
          <div className="about__header_image">
            <img src={ABOUT_IMAGE} alt="about image" />
          </div>
        </div>
        <p className="about__technologies">
          Technologies we used in the project:
        </p>
        <InfiniteLoop />
      </div>

      <div className="about__members">
        <div className="about__members_wrapper">
          {DEVELOPERS.map((el) => (
            <DeveloperCard key={el.name} {...el} />
          ))}
        </div>
        <div className="about__rslogo">
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
        </div>
      </div>
    </div>
  );
};
