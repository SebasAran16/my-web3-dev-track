import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.sass";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dates } from "@/constants/dates";
import { useRouter } from "next/router";
import HexText from "@/components/HexText";
import CertificationList from "@/components/CertificationList";
import { useLenis, useLenisScroll } from "@/providers/LenisProvider";
import { useParallax } from "@/hooks/useParallax";
import {
  experiences,
  courses,
  projects,
  codeLanguages,
} from "@/constants/portfolio";
import {
  certifications,
  getCompany,
  getCompanyCertifications,
} from "@/constants/companies";
import {
  certificationAnchorId,
  experienceAnchorId,
  useScrollToAnchor,
} from "@/hooks/useScrollToAnchor";

const ProjectSwiper = dynamic(() => import("@/components/ProjectSwiper"), { ssr: false });
const CourseSwiper = dynamic(() => import("@/components/CourseSwiper"), { ssr: false });

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

function ExperienceLogo({ image, companyUrl }) {
  const logo = (
    <Image
      className={styles.experienceImage}
      src={image.src}
      alt={image.alt}
      width="380"
      height="300"
      loading="eager"
    />
  );

  if (!companyUrl) return logo;

  return (
    <Link
      href={companyUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.experienceImageLink}
      aria-label={image.alt}
    >
      {logo}
    </Link>
  );
}

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

// Consecutive entries sharing a company collapse into a single card, so a
// promotion reads as one company with stacked roles instead of duplicate cards.
const experienceGroups = experiences.reduce((groups, exp) => {
  const current = groups[groups.length - 1];

  if (current && current.companyId === exp.companyId) {
    current.roles.push(exp);
    return groups;
  }

  groups.push({
    companyId: exp.companyId,
    company: getCompany(exp.companyId),
    roles: [exp],
  });

  return groups;
}, []);

// A company is still ongoing if any of its roles has no end date.
const groupPeriod = (roles) => ({
  start: new Date(Math.min(...roles.map((role) => dates[role.key].start))),
  end: roles.some((role) => !dates[role.key].end)
    ? null
    : new Date(Math.max(...roles.map((role) => dates[role.key].end))),
});

const formatPeriod = (start, end, currentDate, locale, compact = false) => {
  const duration = formatExperienceTime((end || currentDate) - start);
  const format = (date) =>
    date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      ...(compact ? {} : { day: "numeric" }),
    });

  return end
    ? `~${duration} · ${format(start)} → ${format(end)}`
    : `${duration} - Since: ${format(start)}`;
};

const PROJECT_TABS = [
  { key: "ethermail", labelKey: "portfolio.projectsMade.tabs.ethermail" },
  { key: "mutantApes", labelKey: "portfolio.projectsMade.tabs.mutantApes" },
  { key: "personal", labelKey: "portfolio.projectsMade.tabs.personal" },
];

export default function Home() {
  const { t } = useTranslation("common");
  const currentDate = new Date();
  const router = useRouter();
  const aboutRef = useRef(null);
  const lenis = useLenis();
  const picParallaxRef = useParallax({ speed: 0.08, minWidth: 992 });
  const nameWrapRef = useRef(null);
  const burstTimeoutRef = useRef(null);
  const scrollToAnchor = useScrollToAnchor();
  const [projectTab, setProjectTab] = useState("ethermail");
  const visibleProjects = useMemo(
    () => projects.filter((p) => p.category === projectTab),
    [projectTab]
  );

  useLenisScroll(({ velocity }) => {
    const el = nameWrapRef.current;
    if (!el) return;
    if (Math.abs(velocity) > 35) {
      el.classList.add(styles.glitchBurst);
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
      burstTimeoutRef.current = setTimeout(() => {
        el.classList.remove(styles.glitchBurst);
      }, 450);
    }
  });

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.swept) {
            entry.target.dataset.swept = "1";
            entry.target.classList.add(styles.sectionSwept);
            setTimeout(() => {
              entry.target.classList.remove(styles.sectionSwept);
            }, 1100);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (ref) => {
    const target = ref.current;
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    if (lenis) {
      lenis.scrollTo(footer, { duration: 1.2 });
    } else {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/backgrounds/background-small.webp"
          media="(max-width: 767px)"
          fetchpriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/backgrounds/background-medium.webp"
          media="(min-width: 768px) and (max-width: 991px)"
          fetchpriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/backgrounds/background-big.webp"
          media="(min-width: 992px)"
          fetchpriority="high"
        />
      </Head>
      <section data-section="home" id={styles.homeSection}>
        <div id={styles.homeContent}>
          <h1>
            {t("home.me.normal")}
            <span ref={nameWrapRef} className={styles.myNameWrap}>
              <HexText
                as="span"
                text={t("home.me.highlight")}
                className={styles.myName}
                staggerMs={40}
                threshold={0.1}
              />
            </span>
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
          <button onClick={scrollToFooter}>
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
            <div ref={picParallaxRef} className={styles.picParallax}>
              <Image
                id={styles.myPic}
                src="/my-pic.png"
                alt="Picture of me"
                width="200"
                height="280"
              />
            </div>
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
            {experienceGroups.map((group) => {
              const period = groupPeriod(group.roles);
              const groupCertifications = getCompanyCertifications(
                group.companyId
              );

              return (
                <div
                  className={styles.experience}
                  key={group.companyId}
                  id={experienceAnchorId(group.companyId)}
                >
                  <HexText
                    as="h4"
                    text={group.company.name}
                    staggerMs={35}
                    threshold={0.3}
                  />
                  <ExperienceLogo
                    image={group.company.image}
                    companyUrl={group.company.url}
                  />
                  <HexText
                    as="h5"
                    text={formatPeriod(
                      period.start,
                      period.end,
                      currentDate,
                      router.locale,
                      true
                    )}
                    staggerMs={20}
                    threshold={0.3}
                    className={styles.experienceCompanyTime}
                  />

                  {groupCertifications.length > 0 && (
                    <div className={styles.experienceCertifications}>
                      <span className={styles.experienceCertificationsLabel}>
                        {t("portfolio.certifications.title")}
                      </span>
                      <ul>
                        {groupCertifications.map((certification) => (
                          <li key={certification.id}>
                            <button
                              type="button"
                              onClick={() =>
                                scrollToAnchor(
                                  certificationAnchorId(certification.id)
                                )
                              }
                            >
                              {certification.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {group.roles.map((exp, roleIndex) => (
                    <React.Fragment key={exp.key}>
                      {roleIndex > 0 && (
                        <div className={styles.promotion}>
                          <span
                            className={styles.promotionLine}
                            aria-hidden="true"
                          />
                          <span
                            className={styles.promotionArrow}
                            aria-hidden="true"
                          />
                          <span className={styles.promotionLabel}>
                            &gt; PROMOTED
                          </span>
                        </div>
                      )}
                      <section className={styles.experienceRoleBlock}>
                        {exp.role && (
                          <HexText
                            as="h5"
                            text={exp.role}
                            staggerMs={25}
                            threshold={0.3}
                            className={styles.experienceRole}
                          />
                        )}
                        <HexText
                          as="h6"
                          text={formatPeriod(
                            dates[exp.key].start,
                            dates[exp.key].end,
                            currentDate,
                            router.locale
                          )}
                          staggerMs={20}
                          threshold={0.3}
                          className={styles.experienceRoleTime}
                        />
                        <div className={styles.experienceRoleBody}>
                          {exp.tools.length > 0 && (
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
                          )}
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
                          {exp.projects && exp.projects.length > 0 && (
                            <ul className={styles.experienceProjects}>
                              {exp.projects.map((project) => (
                                <li key={project.href}>
                                  <Link href={project.href} target="_blank">
                                    {project.name}
                                  </Link>
                                  {project.description && (
                                    <span> — {project.description}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </section>
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
          </article>
        </article>

        <article id={styles.projectsMade}>
          <HexText
            as="h3"
            text={t("portfolio.projectsMade.title")}
            staggerMs={35}
            threshold={0.3}
          />
          <div className={styles.projectTabs} role="tablist">
            {PROJECT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={projectTab === tab.key}
                onClick={() => setProjectTab(tab.key)}
                className={`${styles.projectTab} ${
                  projectTab === tab.key ? styles.projectTabActive : ""
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
          <ProjectSwiper
            key={projectTab}
            projects={visibleProjects}
            t={t}
          />
          <h5 className={styles.moreProjectsLine}>
            {t("portfolio.projectsMade.moreProjects")}
          </h5>
        </article>

        <article
          data-section="certifications"
          id={styles.certificationsContainer}
        >
          <HexText
            as="h3"
            text={t("portfolio.certifications.title")}
            staggerMs={40}
            threshold={0.3}
          />
          <CertificationList
            certifications={certifications}
            t={t}
            locale={router.locale}
          />
        </article>

        <article id={styles.coursesContainer}>
          <HexText
            as="h3"
            text={t("portfolio.courses.title")}
            staggerMs={40}
            threshold={0.3}
          />
          <CourseSwiper courses={courses} t={t} />
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
                loading="lazy"
                decoding="async"
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
    ])),
  },
});
