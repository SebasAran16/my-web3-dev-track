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
  const footerRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
          <button onClick={() => scrollTo(aboutRef)}>
            {t("home.firstButton")}
          </button>
          <button onClick={() => scrollTo(footerRef)}>
            {t("home.secondButton")}
          </button>
        </div>
      </section>

      <section ref={aboutRef} id={styles.aboutSection}>
        <div className={styles.aboutOverlay} />
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
                  <h4>{exp.name}</h4>
                  <Image
                    src={exp.image.src}
                    alt={exp.image.alt}
                    width="380"
                    height="300"
                  />
                  <h5>
                    {exp.key === "fiverr"
                      ? timeStr
                      : `${timeStr} - Since: ${dateStr}`}
                  </h5>
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
          <h3>{t("portfolio.web3.title")}</h3>
          <CourseSwiper courses={web3Courses} t={t} />
          <h3>{t("portfolio.web2.title")}</h3>
          <CourseSwiper courses={web2Courses} t={t} />
        </article>

        <article id={styles.projectsMade}>
          <h3>{t("portfolio.projectsMade.title")}</h3>
          {projects.map((project) => (
            <div className={styles.project} key={project.key}>
              <div className={styles.projectTitleAndFocus}>
                <h4>{t(project.titleKey)}</h4>
                <p>{t(project.skillKey)}</p>
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
          <h3 className={styles.sectionTitle}>{t("portfolio.languages")}</h3>
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
