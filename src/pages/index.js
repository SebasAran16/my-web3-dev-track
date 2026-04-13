import React, { useRef } from "react";
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
import HexText from "@/components/HexText";
import {
  experiences,
  web3Courses,
  web2Courses,
  projects,
  codeLanguages,
} from "@/constants/portfolio";

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

function ToolIcon({ src, alt, className }) {
  return (
    <Image
      className={className}
      src={src}
      alt={`${alt} Icon`}
      width="20"
      height="20"
    />
  );
}

function CourseSwiper({ courses, t }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      modules={[Navigation]}
      className={styles.swiper}
    >
      {courses.map((course) => {
        const descriptionKeys = course.descriptionKeys || [course.descriptionKey];
        return (
          <SwiperSlide className={styles.swiperSlide} key={course.key}>
            <div className={styles.swiperItem}>
              <h4>
                <Link href={course.href} target="_blank">
                  {t(course.titleKey)}
                </Link>
              </h4>
              <div>
                {course.images.map((img) => (
                  <img
                    key={img.src}
                    className={styles.slideImages}
                    src={img.src}
                    alt={img.alt}
                    width="50"
                    height="50"
                  />
                ))}
              </div>
              <p>
                {descriptionKeys.map((key, i) => (
                  <React.Fragment key={key}>
                    {i > 0 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {t(key)}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default function Home() {
  const { t } = useTranslation("common");
  const currentDate = new Date();
  const router = useRouter();
  const aboutRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section data-section="home" id={styles.homeSection}>
        <div id={styles.homeContent}>
          <h1>
            {t("home.me.normal")}
            <HexText
              as="span"
              text={t("home.me.highlight")}
              className={styles.myName}
              staggerMs={40}
              threshold={0.1}
            />
          </h1>
          <h2>
            <HexText
              as="span"
              text={t("home.whatIAm.highlight")}
              className={styles.fullstack}
              staggerMs={35}
              threshold={0.1}
            />
            {t("home.whatIAm.normal")}
          </h2>
          <HexText
            as="h3"
            text={t("home.moreAbout")}
            staggerMs={25}
            threshold={0.1}
          />
        </div>
        <div id={styles.homeButtons}>
          <button onClick={() => scrollTo(aboutRef)}>
            {t("home.firstButton")}
          </button>
          <button onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}>
            {t("home.secondButton")}
          </button>
        </div>
      </section>

      <section ref={aboutRef} data-section="about" id={styles.aboutSection}>
        <div className={styles.aboutOverlay} />
        <article id={styles.aboutContent}>
          <HexText
            as="h2"
            text={t("about.whoAmI")}
            className={styles.sectionTitle}
            staggerMs={40}
            threshold={0.3}
          />
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

      <section data-section="portfolio" id={styles.portfolioSection}>
        <HexText
          as="h2"
          text={t("portfolio.title")}
          className={styles.sectionTitle}
          staggerMs={40}
          threshold={0.3}
        />

        <article>
          <HexText
            as="h3"
            text="Experience:"
            staggerMs={50}
            threshold={0.3}
          />
          <article id={styles.experienceContainer}>
            {experiences.map((exp) => {
              const timeDiff =
                (dates[exp.key].end || currentDate) - dates[exp.key].start;
              const timeStr =
                exp.key === "fiverr"
                  ? "~" + formatExperienceTime(timeDiff)
                  : formatExperienceTime(timeDiff);
              const dateStr = dates[exp.key].start.toLocaleDateString(
                router.locale,
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <div className={styles.experience} key={exp.key}>
                  <HexText
                    as="h4"
                    text={exp.name}
                    staggerMs={35}
                    threshold={0.3}
                  />
                  <Image
                    src={exp.image.src}
                    alt={exp.image.alt}
                    width="380"
                    height="300"
                  />
                  <HexText
                    as="h5"
                    text={
                      exp.key === "fiverr"
                        ? timeStr
                        : `${timeStr} - Since: ${dateStr}`
                    }
                    staggerMs={20}
                    threshold={0.3}
                  />
                  <div>
                    <div>
                      <span>Required Skills: </span>
                      <div>
                        {exp.tools.map((tool) => (
                          <ToolIcon
                            key={tool.src}
                            src={tool.src}
                            alt={tool.alt}
                            className={styles.experienceToolImage}
                          />
                        ))}
                      </div>
                    </div>
                    <p>
                      {exp.description.map((paragraph, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && (
                            <>
                              <br />
                              <br />
                            </>
                          )}
                          {paragraph}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
          </article>
        </article>

        <article id={styles.coursesContainer}>
          <HexText
            as="h3"
            text={t("portfolio.web3.title")}
            staggerMs={40}
            threshold={0.3}
          />
          <CourseSwiper courses={web3Courses} t={t} />
          <HexText
            as="h3"
            text={t("portfolio.web2.title")}
            staggerMs={40}
            threshold={0.3}
          />
          <CourseSwiper courses={web2Courses} t={t} />
        </article>

        <article id={styles.projectsMade}>
          <HexText
            as="h3"
            text={t("portfolio.projectsMade.title")}
            staggerMs={35}
            threshold={0.3}
          />
          {projects.map((project) => (
            <div className={styles.project} key={project.key}>
              <div className={styles.projectTitleAndFocus}>
                <HexText
                  as="h4"
                  text={t(project.titleKey)}
                  staggerMs={30}
                  threshold={0.3}
                />
                <HexText
                  as="p"
                  text={t(project.skillKey)}
                  staggerMs={20}
                  threshold={0.3}
                />
              </div>
              <div className={styles.projectImages}>
                <Image
                  className={styles.projectImage}
                  src={project.image.src}
                  alt={project.image.alt}
                  width="200"
                  height="80"
                />
                <div className={styles.toolForProject}>
                  {project.tools.map((tool) => (
                    <ToolIcon
                      key={tool.src}
                      src={tool.src}
                      alt={tool.alt}
                      className={styles.projectToolImage}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.projectContent}>
                <p>
                  {project.descriptionKeys.map((key, i) => (
                    <React.Fragment key={key}>
                      {i > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {t(key)}
                    </React.Fragment>
                  ))}
                </p>
                <div className={styles.projectButtons}>
                  <Link href={project.siteUrl} target="_blank">
                    <button>{t(project.siteButtonKey)}</button>
                  </Link>
                  <Link href={project.codeUrl} target="_blank">
                    <button>{t(project.codeButtonKey)}</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <h5>{t("portfolio.projectsMade.moreProjects")}</h5>
        </article>

        <article id={styles.languagesAndToolsContainer}>
          <HexText
            as="h3"
            text={t("portfolio.languages")}
            className={styles.sectionTitle}
            staggerMs={35}
            threshold={0.3}
          />
          <div id={styles.languagesContainer}>
            {codeLanguages.map((lang) => (
              <img
                key={lang.src}
                className={styles.codeLanguage}
                src={lang.src}
                alt={lang.alt}
              />
            ))}
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
