import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dates } from "@/constants/dates";
import { useRouter } from "next/router";

export default function Home() {
  const { t } = useTranslation("common");
  const currentDate = new Date();
  const router = useRouter();

  const timeDifferenceEthermail = (dates.ethermail.end || currentDate) - dates.ethermail.start;
  const timeDifferenceFiverr = (dates.fiverr.end || currentDate) - dates.fiverr.start;

  const formatExperienceTime = (timeDifference) => {
    const totalMonths = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24 * 30.44)
    );

    if (totalMonths < 12) {
      return totalMonths + " months";
    }

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    if (remainingMonths === 0) {
      return years + (years === 1 ? " year" : " years");
    }

    return (
      years +
      (years === 1 ? " year " : " years ") +
      remainingMonths +
      (remainingMonths === 1 ? " month" : " months")
    );
  };

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

  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const imgSmall = new window.Image();
    const imgMedium = new window.Image();
    const imgBig = new window.Image();

    imgSmall.src = "/backgrounds/background-small.png";
    imgMedium.src = "/backgrounds/background-medium.png";
    imgBig.src = "/backgrounds/background-big.png";

    const handleLoad = () => {
      if (
        (window.innerWidth < 768 && imgSmall.complete) ||
        (window.innerWidth >= 768 && window.innerWidth < 992 && imgMedium.complete) ||
        (window.innerWidth >= 992 && imgBig.complete)
      ) {
        setBgLoaded(true);
      }
    };

    imgSmall.onload = handleLoad;
    imgMedium.onload = handleLoad;
    imgBig.onload = handleLoad;

    // Check if already loaded from cache
    handleLoad();
  }, []);

  return (
    <>
      <section
        id={styles.homeSection}
        className={bgLoaded ? styles.bgLoaded : ""}
      >
        {!bgLoaded && <div className={styles.loadingSpinner}></div>}
        <div
          id={styles.homeContent}
          style={{
            opacity: bgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
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
        <article>
          <h3>Experience:</h3>
          <article id={styles.experienceContainer}>
            <div className={styles.experience}>
              <h4>EtherMail</h4>
              <Image
                src="/experience/ethermail.png"
                alt="EtherMail Logo"
                width="380"
                height="300"
              />
              <h5>
                {formatExperienceTime(timeDifferenceEthermail) +
                  " - Since: " +
                  dates.ethermail.start.toLocaleDateString(router.locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </h5>
              <div>
                <div>
                  <span>Required Skills: </span>
                  <div>
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/solidity.svg"
                      alt="Solidity Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/aws.svg"
                      alt="AWS Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/mongodb.svg"
                      alt="MongoDB Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/nestjs.svg"
                      alt="NestJS Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/typescript.svg"
                      alt="Typescript Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/javascript.svg"
                      alt="Javascript Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/kotlin.svg"
                      alt="Kotlin Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/chai.svg"
                      alt="Chai Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/html.svg"
                      alt="HTML Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/css.svg"
                      alt="CSS Icon"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
                <p>
                  The possibility of learning an growing in this company is
                  something that I will always be grateful for. <br />
                  <br />
                  Being working with an amazing product focusing on the purpose
                  of the underlaying technology is something that I always
                  desired when getting into Blockchain and EtherMail made me
                  feel like that. <br />
                  <br />
                  The mixture of the constant practice of Web3 and Web2
                  technology made all of my knowledge settle and build one that
                  I did not have before.
                </p>
              </div>
            </div>
            <div className={styles.experience}>
              <h4>Fiverr</h4>
              <Image
                src="/experience/fiverr.jpg"
                alt="EtherMail Logo"
                width="380"
                height="300"
              />
              <h5>
                {"~" + formatExperienceTime(timeDifferenceFiverr)}
              </h5>
              <div>
                <div>
                  <span>Required Skills: </span>
                  <div>
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/solidity.svg"
                      alt="Solidity Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/nextjs.svg"
                      alt="NextJs Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/mongodb.svg"
                      alt="MongoDB Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/typescript.svg"
                      alt="Typescript Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/javascript.svg"
                      alt="Javascript Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/chai.svg"
                      alt="Chai Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/html.svg"
                      alt="HTML Icon"
                      width="20"
                      height="20"
                    />
                    <Image
                      className={styles.experienceToolImage}
                      src="/languagesAndTools/css.svg"
                      alt="CSS Icon"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
                <p>
                  Working with different clients has allowed me to both improve
                  my skills, adapting myself and learning depending on their
                  needs and requirements, and also to improve my communication
                  skills and candidness. <br />
                  <br />
                  Having worked from building projects from scratch with no team
                  to teach someone how to code his first Smart Contract, leaving
                  all the basis and resources to follow the study, has given me
                  a solid basis to every project.
                </p>
              </div>
            </div>
          </article>
        </article>
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
                <Link href="https://mutant-beers.vercel.app/" target="_blank">
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
