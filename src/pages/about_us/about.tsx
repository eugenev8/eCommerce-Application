import Wrapper from '../../components/wrapper/Wrapper';
import styles from './about.module.scss';
import github from '../../common/icons/github.svg';

function AboutPage() {
  return (
    <Wrapper>
      <h2>About us</h2>
      <section>
        <p className={styles.description}>
          Syberian is a talented team of developers who specialize in building e-commerce web applications. They have
          recently developed an innovative e-commerce platform specifically tailored for the sale and purchase of
          laptops. With their expertise in web development and e-commerce, the Syberian team has created a seamless
          online shopping experience for laptop enthusiasts. Their application allows users to browse through a wide
          range of laptop models, compare specifications, and make informed purchase decisions. The Syberian team has
          used commerce-tools backend systems to handle inventory management, order processing, and secure payment
          transactions. They have also designed a user-friendly frontend interface that ensures a smooth and intuitive
          shopping journey for customers. In addition to the core functionality, the Syberian team has integrated
          various features such as user authentication to enhance the overall user experience. They have prioritized
          performance optimization and responsive design to ensure the application is accessible across different
          devices and screen sizes. Syberia&apos;s dedication to delivering a high-quality e-commerce solution is
          evident in their attention to detail and commitment to meeting client requirements. Their expertise in web
          development, coupled with their understanding of the laptop market, has enabled them to create a powerful and
          efficient e-commerce web application for the laptop industry. Overall, the Syberian team&apos;s e-commerce web
          application for laptops showcases their technical prowess, user-centric design approach, and commitment to
          creating exceptional digital experiences.
        </p>
        <p>Team members</p>
        <div className={styles.team}>
          <div className={styles.teamMember}>
            <a href="http://github.com">
              <img src={github} alt="github" />
            </a>
            <p>Viktor TWA</p>
            <p>description</p>
          </div>
          <div className={styles.teamMember}>
            <a href="http://github.com">
              <img src={github} alt="github" />
            </a>
            <p>Zhenya V8</p>
            <p>description</p>
          </div>
          <div className={styles.teamMember}>
            <a href="http://github.com">
              <img src={github} alt="github" />
            </a>
            <p>Artem TS enjoer</p>
            <p>description</p>
          </div>
        </div>
      </section>
      <section>
        <p>Contributions</p>
      </section>
      <section>
        <p>Collaboration</p>
      </section>
      <section>
        <p>RS school logo</p>
      </section>
    </Wrapper>
  );
}

export default AboutPage;
