import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const navPressed = (e) => {
    const button = e.target;
    const clickHandler = (e) => {
      switch (e.target.innerHTML) {
        case "Home":
          const homeSection = document.querySelector(
            "#Home_homeSection__A1suR"
          );
          homeSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "About Me":
          const aboutSection = document.querySelector(
            "#Home_aboutSection__hyofv"
          );
          aboutSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "Portfolio":
          const portfolioSection = document.querySelector(
            "#Home_portfolioSection__yENuo"
          );
          portfolioSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "Contact Me":
          const contactSection = document.querySelector(
            "#Footer_footerContainer__L4ecT"
          );
          contactSection.scrollIntoView({ behavior: "smooth" });
          break;
      }
    };
    button.addEventListener("click", clickHandler(e));
  };

  return (
    <>
      <section id={styles.homeSection}>
        <div id={styles.homeContent}>
          <h1>
            I am <span className={styles.myName}>Sebastian Arango</span>,
          </h1>
          <h2>
            <span className={styles.fullstack}>Web3 Fullstack</span> Apprentice
            and
          </h2>
          <h3>Blockchain Lover</h3>
        </div>
        <div id={styles.homeButtons}>
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            About Me
          </button>
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            Contact Me
          </button>
        </div>
      </section>
      <section data-splitting id={styles.aboutSection}>
        <video id={styles.aboutBackground} autoPlay loop muted>
          <source src="/backgrounds/background-about.mp4" type="video/mp4" />
        </video>
        <article id={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>Who am I?</h2>
          <div className={styles.picContainer}>
            <Image
              id={styles.myPic}
              src="/my-pic.jpeg"
              alt="Picture of me"
              width="200"
              height="280"
            />
          </div>
          <p>
            {`I am Sebastian Zambrano Arango, I have always been very curious and
            an enthusiast about technology. That lead me to discover Blockchain
            on 2021 and since then start learning about how the technology
            works, and as I loved it's capabilities and functionalities, I
            decided I will dedicate to it.`}
            <br />
            <br />
            {`With an school background of C language, I started learning Solidity
            on my own with all the resources that there are out there, completed
            several courses and realized I needed to learn more than Solidity if
            I wanted to dedicate to it, it was there when I learned about
            security and optimization in Solidity and more Languages and tools
            for being a Web3 Fullstack Developer such as Javascript and React
            with NextJs. And for testing all what I have learned I am building a
            protocol on my own which is in it's MVP phase right now.`}
            <br />
            <br />
            Lately I have been paying attention to AIs and figuring out how to
            use them in my daily study and coding sessions to improve my
            efficiency.
          </p>
        </article>
      </section>
      <section id={styles.portfolioSection}>
        <h2 className={styles.sectionTitle}>Portfolio</h2>
        <article id={styles.coursesContainer}>
          <h3>Web3 Courses done:</h3>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            modules={[Navigation]}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://www.youtube.com/watch?v=gyMwXuJrbJQ"
                    target="_blank"
                  >
                    Learn Blockchain, Solidity, and Full Stack Web3 Development
                    with JavaScript (32-Hour Course)
                  </Link>
                </h4>
                <div>
                  <img
                    className={styles.slideImages}
                    src="/teachers/freecodecamp.png"
                    alt="FreeCodeCamp Logo"
                    width="50"
                    height="50"
                  />
                  <img
                    className={styles.slideImages}
                    src="/teachers/patrick-froggy.jpg"
                    alt="Patrick Collins Twitter Picture"
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  This was the greatest, longest and most advanced course I have
                  done on Solidity so far, this covered every aspect needed to
                  be a Web3Fullstack, from Solidity Syntax to be able to code
                  our own NFT Marketplace and deploy on a website! Also covered
                  important topics as secuity, proxies and governance tokens.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://ethernaut.openzeppelin.com/"
                    target="_blank"
                  >
                    Ethernaut - Openzeppelin
                  </Link>
                </h4>
                <div>
                  <img
                    src="/teachers/ethernaut.svg"
                    alt="Openzeppelin Logo"
                    className={styles.slideImages}
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  {` Kind of a game, where you have to hack several contracts in
                  order to pass to the next level, some levels simulate hacks
                  that have happen in the Blockchain ecosystem and each of them
                  gives you the opportunity to learn about Smart Contract's
                  functionality, security or optimization.`}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link href="https://cryptozombies.io/" target="_blank">
                    CryptoZombies
                  </Link>
                </h4>
                <div>
                  <img
                    src="/teachers/cryptozombies.png"
                    alt="Cryptozombies Logo"
                    className={styles.slideImages}
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  {`Great tool to consolidate Solidity's syntax, did it after my
                  first Solidity course and it really help me to gain confidence
                  with the language for being really intereactive as you learn
                  coding a Crypto Zombies game!`}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://www.udemy.com/course/solidity-a-z/"
                    target="_blank"
                  >
                    Solidity de la A a la Z - Udemy
                  </Link>
                </h4>
                <div>
                  <img
                    src="/teachers/udemy.png"
                    alt="Udemy Logo"
                    className={styles.slideImages}
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  {`This was the first course that I took from Solidity, it was
                  very clear at explaning each of Solidity's functionalities,
                  and at the end we ended up building several projects to
                  consolidate what we learned.`}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
          <h3>Web2 Courses done:</h3>
          <Swiper
            className={styles.swiper}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            modules={[Navigation]}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://www.youtube.com/watch?v=KjY94sAKLlw"
                    target="_blank"
                  >
                    Next.js React Framework Course
                  </Link>
                </h4>
                <div>
                  <img
                    className={styles.slideImages}
                    src="/teachers/freecodecamp.png"
                    alt="FreeCodeCampo Logo"
                    width="50"
                    height="50"
                  />
                  <img
                    className={styles.slideImages}
                    src="/teachers/alicia.jpg"
                    alt="Patricia Rodriguez Twitter Picture"
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  Helped me get how to build a NextJs app, and to know all the
                  features and advantages that we have when building a project
                  with this amazing framework.
                  <br />
                  <br />
                  We do this by building a whole website project going through
                  each of the NextJs functionalities and uses.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://www.youtube.com/watch?v=zJSY8tbf_ys"
                    target="_blank"
                  >
                    Frontend Web Development Bootcamp Course (JavaScript, HTML,
                    CSS)
                  </Link>
                </h4>
                <div>
                  <img
                    className={styles.slideImages}
                    src="/teachers/freecodecamp.png"
                    alt="FreeCodeCampo Logo"
                    width="50"
                    height="50"
                  />
                  <img
                    className={styles.slideImages}
                    src="/teachers/zach.jpg"
                    alt="Zach Gollwitzer Twitter Picture"
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  This course was the one that gave me the confidence with
                  Frontend, being able, after it, to build my own websites and
                  keep learning about UI and UX building own projects and
                  challenges in Frontend Mentor.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://university.alchemy.com/home"
                    target="_blank"
                  >
                    JavaScript Fundamentals
                  </Link>
                </h4>
                <div>
                  <img
                    className={styles.slideImages}
                    src="/teachers/alchemy-university.jpg"
                    alt="Alchemy University"
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  I had used and learned JavaScript before, but I lacked some
                  knowledge to really understand all what we did with it on some
                  other courses, this made me really understand the Fundamentals
                  to get it and keep improving.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link href="https://cryptozombies.io/" target="_blank">
                    JavaScript Basics
                  </Link>
                </h4>
                <div>
                  <img
                    className={styles.slideImages}
                    src="/teachers/freecodecamp.png"
                    alt="FreeCodeCampo Logo"
                    width="50"
                    height="50"
                  />
                </div>
                <p>
                  {`First course I did when I started my journey for a Web3
                  Fullstack Dev, it was clear, helped me get and remember how
                  the logic of programming works and some of the basic
                  JavaScript functionalities, but as I had no background or
                  guidance, I did not get it's potential and went to learn
                  Solidity.`}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </article>
        <article id={styles.projectsMade}>
          <h3>Projects Made:</h3>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>DefiContribute Protocol (MVP)</h4>
              <p>Web3 Fullstack</p>
            </div>
            <div className={styles.projectImages}>
              <Image
                className={styles.projectImage}
                src="/projects/defi-home.png"
                alt="DefiContribute Home Page"
                width="200"
                height="80"
              />
              <div className={styles.toolForProject}>
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/solidity.svg"
                  alt="Solidity Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/nextjs.svg"
                  alt="NextJs Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/javascript.svg"
                  alt="Javascript Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/chai.svg"
                  alt="Chai Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/html.svg"
                  alt="HTML Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/css.svg"
                  alt="CSS Icon"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <div className={styles.projectContent}>
              <p>
                As coding is best way to learn, after studying all required to
                do a project on Blockchain, with the FrontEnd required, I
                decided to do a whole Web3 Protocol on myself from scratch!
                <br />
                <br />
                This helped me challenge myself and try out all what I have
                learned so far and see how I would work without any guidance as
                I had been doing so far.
              </p>
              <div className={styles.projectButtons}>
                <Link
                  href="https://defi-contribute.vercel.app/"
                  target="_blank"
                >
                  <button>See Site</button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/hardhat-defi-contribute"
                  target="_blank"
                >
                  <button>See Code</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>Mutant Apes Beer Landing Page</h4>
              <p>Frontend</p>
            </div>
            <div className={styles.projectImages}>
              <Image
                className={styles.projectImage}
                src="/projects/mutant-apes-home.png"
                alt="Mutant Apes Home Page"
                width="200"
                height="80"
              />
              <div className={styles.toolForProject}>
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/nextjs.svg"
                  alt="NextJs Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/javascript.svg"
                  alt="Javascript Icon"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <div className={styles.projectContent}>
              <p>
                First ever project where I have worked at in the IT sector.
                <br />
                <br />A really good way to see how teams on the sector work and
                fit in for trying to do a great end product!
              </p>
              <div className={styles.projectButtons}>
                <Link href="https://mutant-beers.vercel.app/" target="_blank">
                  <button>See Site</button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/mutant-beers-landing-page  "
                  target="_blank"
                >
                  <button>See Code</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>NFT Marketplace</h4>
              <p>Web3 Fullstack Project</p>
            </div>
            <div className={styles.projectImages}>
              <Image
                className={styles.projectImage}
                src="/projects/defi-home.png"
                alt="NFT Marketplace Home Page"
                width="200"
                height="80"
              />
              <div className={styles.toolForProject}>
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/solidity.svg"
                  alt="Solidity Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/nextjs.svg"
                  alt="NextJs Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/javascript.svg"
                  alt="Javascript Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/chai.svg"
                  alt="Chai Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/html.svg"
                  alt="HTML Icon"
                  width="20"
                  height="20"
                />
                <Image
                  className={styles.projectToolImage}
                  src="/languagesAndTools/css.svg"
                  alt="CSS Icon"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <div className={styles.projectContent}>
              <p>
                During course from Patrick Collins we created a whole NFT
                collection, uploading NFT metadata to NFT Storage and also
                created a whole Marketplace contract to see, list, buy and sell
                NFTs!
                <br />
                <br />A really complex project that help me familarize with
                tools, testing, blockchain usage (gas, costs, security...) and
                place it all into a great project!
              </p>
              <div className={styles.projectButtons}>
                <Link href="">
                  <button>See Site</button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/hardhat-nft-marketplace-fcc"
                  target="_blank"
                >
                  <button>See Code</button>
                </Link>
              </div>
            </div>
          </div>
          <h5>Many more coming...</h5>
        </article>
        <article id={styles.languagesAndToolsContainer}>
          <h3 className={styles.sectionTitle}>Languages</h3>
          <div id={styles.languagesContainer}>
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg"
            />
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            />
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg"
            />
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg"
            />
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
            />
            <img
              className={styles.codeLanguage}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain-wordmark.svg"
            />
          </div>
        </article>
      </section>
    </>
  );
}
