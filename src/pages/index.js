import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation("common");

  const navPressed = (e) => {
    const button = e.target;
    const clickHandler = (e) => {
      switch (e.target.id) {
        case "About":
          const homeSection = document.querySelector(
            "#Home_aboutSection__hyofv"
          );
          homeSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "Contact":
          const aboutSection = document.querySelector(
            "#Footer_footerContainer__L4ecT"
          );
          aboutSection.scrollIntoView({ behaviour: "smooth" });
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
            {t("home.me.normal")}
            <span className={styles.myName}>{t("home.me.highlight")}</span>
          </h1>
          <h2>
            <span className={styles.fullstack}>
              {t("home.whatIAm.highlight")}
            </span>
            {t("home.whatIAm.normal")}
          </h2>
          <h3>{t("home.moreAbout")}</h3>
        </div>
        <div id={styles.homeButtons}>
          <button
            id="About"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("home.firstButton")}
          </button>
          <button
            id="Contact"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("home.secondButton")}
          </button>
        </div>
      </section>
      <section data-splitting id={styles.aboutSection}>
        <video id={styles.aboutBackground} autoPlay loop muted>
          <source src="/backgrounds/background-about.mp4" type="video/mp4" />
        </video>
        <article id={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>{t("about.whoAmI")}</h2>
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
            {t("about.whoIAm.1")}
            <br />
            <br />
            {t("about.whoIAm.2")}
            <br />
            <br />
            {t("about.whoIAm.3")}
          </p>
        </article>
      </section>
      <section id={styles.portfolioSection}>
        <h2 className={styles.sectionTitle}>{t("portfolio.title")}</h2>
        <article id={styles.coursesContainer}>
          <h3>{t("portfolio.web3.title")}</h3>
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
                    {t("portfolio.web3.patrick.title")}
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
                <p>{t("portfolio.web3.patrick.description")}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://ethernaut.openzeppelin.com/"
                    target="_blank"
                  >
                    {t("portfolio.web3.ethernaut.title")}
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
                <p>{t("portfolio.web3.ethernaut.description")}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link href="https://cryptozombies.io/" target="_blank">
                    {t("portfolio.web3.cryptozombies.title")}
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
                <p>{t("portfolio.web3.ethernaut.description")}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://www.udemy.com/course/solidity-a-z/"
                    target="_blank"
                  >
                    {t("portfolio.web3.az.title")}
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
                <p>{t("portfolio.web3.az.description")}</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <h3>{t("portfolio.web2.title")}</h3>
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
                    {t("portfolio.web2.nextjs.title")}
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
                  {t("portfolio.web2.nextjs.description.1")}
                  <br />
                  <br />
                  {t("portfolio.web2.nextjs.description.2")}
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
                    {t("portfolio.web2.zach.title")}
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
                <p>{t("portfolio.web2.zach.description")}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link
                    href="https://university.alchemy.com/home"
                    target="_blank"
                  >
                    {t("portfolio.web2.alchemy.title")}
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
                <p>{t("portfolio.web2.alchemy.description")}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.swiperItem}>
                <h4>
                  <Link href="https://cryptozombies.io/" target="_blank">
                    {t("portfolio.web2.freecode.title")}
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
                <p>{t("portfolio.web2.freecode.description")}</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </article>
        <article id={styles.projectsMade}>
          <h3>{t("portfolio.projectsMade.title")}</h3>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>{t("portfolio.projectsMade.defiContribute.title")}</h4>
              <p>{t("portfolio.projectsMade.defiContribute.skill")}</p>
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
                {t("portfolio.projectsMade.defiContribute.description.1")}
                <br />
                <br />
                {t("portfolio.projectsMade.defiContribute.description.2")}
              </p>
              <div className={styles.projectButtons}>
                <Link
                  href="https://defi-contribute.vercel.app/"
                  target="_blank"
                >
                  <button>
                    {t("portfolio.projectsMade.defiContribute.siteButton")}
                  </button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/hardhat-defi-contribute"
                  target="_blank"
                >
                  <button>
                    {t("portfolio.projectsMade.defiContribute.codeButton")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>{t("portfolio.projectsMade.mutantBeers.title")}</h4>
              <p>{t("portfolio.projectsMade.mutantBeers.skill")}</p>
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
                {t("portfolio.projectsMade.mutantBeers.description.1")}
                <br />
                <br />
                {t("portfolio.projectsMade.mutantBeers.description.2")}
              </p>
              <div className={styles.projectButtons}>
                <Link href="https://mutantsbeer.io/" target="_blank">
                  <button>
                    {t("portfolio.projectsMade.mutantBeers.siteButton")}
                  </button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/mutant-beers-landing-page  "
                  target="_blank"
                >
                  <button>
                    {t("portfolio.projectsMade.mutantBeers.codeButton")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <h4>{t("portfolio.projectsMade.nftMarketplace.title")}</h4>
              <p>{t("portfolio.projectsMade.nftMarketplace.skill")}</p>
            </div>
            <div className={styles.projectImages}>
              <Image
                className={styles.projectImage}
                src="/projects/nft-marketplace.png"
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
                {t("portfolio.projectsMade.nftMarketplace.description.1")}
                <br />
                <br />
                {t("portfolio.projectsMade.nftMarketplace.description.2")}
              </p>
              <div className={styles.projectButtons}>
                <Link
                  href="https://nextjs-nft-marketplace-fcc-three.vercel.app/"
                  target="_blank"
                >
                  <button>
                    {t("portfolio.projectsMade.nftMarketplace.siteButton")}
                  </button>
                </Link>
                <Link
                  href="https://github.com/SebasAran16/hardhat-nft-marketplace-fcc"
                  target="_blank"
                >
                  <button>
                    {t("portfolio.projectsMade.nftMarketplace.codeButton")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <h5>{t("portfolio.projectsMade.moreProjects")}</h5>
        </article>
        <article id={styles.languagesAndToolsContainer}>
          <h3 className={styles.sectionTitle}>{t("portfolio.languages")}</h3>
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
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/learnweb3-io-foiprs6gz"
            width="100%"
            height="700"
            frameBorder="0"
          ></iframe>
          <script
            src="https://cdn.jsdelivr.net/gh/yasserelsaid/chatbot@v0.1.3/index.min.js"
            data-chatbotId="learnweb3-io-foiprs6gz"
          ></script>
        </article>
      </section>
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "footer",
      "header",
      "thanks",
    ])),
  },
});
