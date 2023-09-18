import Wrapper from '../../components/wrapper/Wrapper';
import styles from './about.module.scss';
import viktor from '../../common/images/Viktor.png';
import eugene from '../../common/images/Eugene.jpeg';
import artem from '../../common/images/Artem.jpeg';
import andrei from '../../common/images/Andrei.jpeg';
import kirill from '../../common/images/Kirill.jpeg';
import rsschool from '../../common/icons/rsschool.png';

function AboutPage() {
  return (
    <Wrapper>
      <h2>About us</h2>
      <section>
        <p>Team members</p>
        <div className={styles.team}>
          <div className={styles.team__member}>
            <div>
              <a href="https://github.com/TvaExperts" target="_blank">
                <img src={viktor} alt="Viktor" />
              </a>
              <p>Viktor Trachenko </p>
              <p>role: Software Developer</p>
              <a className={styles.a} href="https://github.com/TvaExperts">
                Github
              </a>
              <p>
                I am 34 years old, At one time, in addition to the institute, I completed postgraduate studies (without
                defending a dissertation). During my studies, I acquired additional skills in teaching, organizing work
                and managing people. I gained a little development experience - I wrote desktop applications in C# for
                my educational purposes. Then I even managed to work as a project manager in a number of companies, but
                there was a lack of knowledge and qualifications for further growth. Then, I became an individual
                entrepreneur. However, today it has become not so easy in my field - circumstances have changed. And so
                I decided to return to the IT direction. To begin with, look at and study the frontend. Now it is
                necessary to adapt to the challenges of the time, and I am ready for this.
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, ab! Veniam possimus natus rem dicta culpa
              molestias nemo explicabo necessitatibus ratione laborum! Illo facere maiores qui odio, sunt cupiditate
              totam. Assumenda quod exercitationem quasi quas? Delectus animi blanditiis eius sapiente, aliquam error ex
              ullam! Porro earum velit soluta corrupti repudiandae nulla doloribus asperiores, numquam qui aliquid ex
              eligendi culpa animi non, maiores architecto eos sapiente sequi deserunt laboriosam ipsam! Ipsam, laborum
              labore. Ex quod magni nesciunt exercitationem, numquam mollitia ab quisquam ipsa laborum vitae reiciendis,
              alias perspiciatis quidem necessitatibus minus soluta est culpa nostrum amet eligendi ipsam officiis qui
              iure quae. Laborum, illum! Debitis, earum quibusdam exercitationem, laudantium excepturi voluptatum
              dolores saepe vitae autem, similique sed consequuntur recusandae voluptate eligendi quidem dolorem quos
              corporis aliquam amet! Natus ab, neque reprehenderit maiores, exercitationem omnis praesentium ad dolores
              a ex architecto voluptas ea inventore! Pariatur quod saepe beatae porro, dignissimos aut. Possimus.
            </p>
          </div>
          <div className={styles.team__member}>
            <div>
              <a href="https://github.com/eugenev8" target="_blank">
                <img src={eugene} alt="Eugene" />
              </a>
              <p>Zhenya Vasilev</p>
              <p>role: Software Developer</p>
              <a className={styles.a} href="https://github.com/eugenev8">
                Github
              </a>
              <p>I am 25. Previously studied in the oil and gas industry. Now I am learning programming</p>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis minus inventore qui quo incidunt eveniet
              ad necessitatibus excepturi corporis at error amet ab officia repellendus assumenda, quod ipsum. Quasi
              possimus eveniet totam corrupti dolor unde delectus error minima illo excepturi rem reiciendis explicabo
              nemo placeat a, neque ad nostrum iure aut commodi eos nam nesciunt voluptates! Nihil nesciunt expedita,
              aut sed quos tempore, dolorem officia modi eos commodi voluptate voluptas, eum ullam omnis quae? Iure
              labore animi natus libero odit sunt, corporis fugiat culpa. Nobis voluptatem facilis quasi quibusdam
              recusandae nam harum earum in nemo molestiae odio repellendus fuga doloribus voluptate dicta, esse
              explicabo ullam nisi quam quo voluptates alias! Aliquid, suscipit dignissimos commodi repellat sed aperiam
              earum deleniti ut totam quos assumenda reprehenderit. Distinctio dignissimos, cupiditate aspernatur
              deserunt commodi voluptatum tempore dolorum rerum sed itaque laborum ducimus doloremque earum nisi id.
              Autem quidem libero recusandae impedit quisquam quo rerum?
            </p>
          </div>
          <div className={styles.team__member}>
            <div>
              <a href="https://github.com/mgg43err" target="_blank">
                <img src={artem} alt="Artem" />
              </a>
              <p>Artem Pleskunou</p>
              <p>role: Software Developer</p>
              <a className={styles.a} href="https://github.com/mgg43err">
                Github
              </a>
              <p>
                Hi there! I&apos;m 23 years old and a Frontend Developer. I have dedicated approximately 2 years to
                intensive studying of JavaScript, HTML, and CSS. Throughout this period, I have gained proficiency in
                using SCSS/SASS for implementing semantic layouts and applying BEM notation. Additionally, I actively
                solve algorithms on Codewars.
              </p>
            </div>
            <p>Join to team at the end of 3th sprint. Implement basket and about us page</p>
          </div>
          <div className={`${styles.team__mentor} ${styles.team__member}`}>
            <div>
              <a href="https://github.com/moskkir" target="_blank" rel="noopener noreferrer">
                <img src={kirill} alt="Kirill Mosk" />
              </a>
              <p>Kirill Mosk</p>
              <p>role: Mentor</p>
              <a className={styles.a} href="https://github.com/moskkir">
                Github
              </a>
            </div>
            <div>
              <a href="http://github.com/andreyamelchenia" target="_blank" >
                <img src={andrei} alt="Andrei" />
              </a>
              <p>Andrei Amelchenia</p>
              <p>role: Mentor</p>
              <a className={styles.a} href="https://github.com/andreyamelchenia">
                Github
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className={styles.description}>
          Collaboration 🤝: Our team effectively collaborated through Discord and Telegram Messenger, ensuring seamless
          communication and achieving a successful outcome. We utilized real-time discussions, file sharing, and clear
          roles to stay organized and accountable. The result: a high-quality project delivered remotely. 🎉
        </p>
      </section>
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
      </section>
      <footer>
        <a className={styles.a} href="https://rs.school/">
          <img src={rsschool} alt="rsschool logo" />
        </a>
        <a className={styles.a} href="https://docs.app.rs.school/#/">
          Learn more about RS School
        </a>
        <p>© 2023 Syberian</p>
      </footer>
    </Wrapper>
  );
}

export default AboutPage;
