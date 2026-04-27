import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/CV.module.sass";
import { cvData } from "@/constants/cv";

function renderInlineBold(text) {
  if (!text) return null;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function Paragraph({ children }) {
  return <p className={styles.text}>{children}</p>;
}

function MultilineText({ text }) {
  return text.split("\n\n").map((chunk, i) => (
    <Paragraph key={i}>{chunk}</Paragraph>
  ));
}

function SidebarSection({ title, children }) {
  return (
    <section className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>{title}</h3>
      {children}
    </section>
  );
}

function MainSection({ title, children }) {
  return (
    <section className={styles.mainSection}>
      <h2 className={styles.mainTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function CVPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <>
      <Head>
        <title>Sebastian Arango — CV</title>
        <meta name="description" content="Sebastian Arango — Curriculum Vitae" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.pageBackground}>
        <div className={styles.controls}>
          <Link href="/" className={styles.controlBack}>
            ← Back to site
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className={styles.controlDownload}
          >
            Download as PDF
          </button>
        </div>

        <div className={styles.cvPage}>
          <aside className={styles.sidebar}>
            <div className={styles.photoWrap}>
              <Image
                src={cvData.photo}
                alt="Portrait of Sebastian Arango"
                width={220}
                height={220}
                className={styles.photo}
                priority
              />
            </div>

            <SidebarSection title="Contact Information:">
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>E-Mail:</span>
                <span>{cvData.contact.email}</span>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>Location:</span>
                <span>{cvData.contact.location}</span>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>Webpage:</span>
                <a
                  href={cvData.contact.webpage}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cvData.contact.webpage}
                </a>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>Github:</span>
                <a
                  href={cvData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cvData.contact.github}
                </a>
              </p>
            </SidebarSection>

            <SidebarSection title="Profile:">
              <MultilineText text={cvData.profile} />
            </SidebarSection>

            <SidebarSection title="Languages:">
              <ul className={styles.languages}>
                {cvData.languages.map((lang) => (
                  <li key={lang.name}>
                    -<strong>{lang.name}</strong> ({lang.level})
                  </li>
                ))}
              </ul>
            </SidebarSection>

            <SidebarSection title="Soft Skills:">
              <ul className={styles.softSkills}>
                {cvData.softSkills.map((skill) => (
                  <li key={skill}>
                    -<em>{skill}</em>
                  </li>
                ))}
              </ul>
            </SidebarSection>

            <SidebarSection title="Technological Skills">
              <Paragraph>{cvData.technologicalSkills}</Paragraph>
            </SidebarSection>

            <SidebarSection title="Additional Information">
              {cvData.additionalInformation.map((item) => (
                <p key={item.label} className={styles.contactItem}>
                  {item.value ? (
                    <>
                      <span className={styles.contactLabel}>
                        {item.label}:
                      </span>
                      <span>{item.value}</span>
                    </>
                  ) : (
                    <span className={styles.contactLabel}>{item.label}</span>
                  )}
                </p>
              ))}
            </SidebarSection>
          </aside>

          <main className={styles.main}>
            <header className={styles.nameHeader}>
              <h1 className={styles.name}>
                <span>{cvData.name.first}</span>
                <span>{cvData.name.second}</span>
                <span>{cvData.name.third}</span>
              </h1>
              <p className={styles.roleTitle}>- {cvData.title} -</p>
            </header>

            <MainSection title="Experience:">
              {cvData.experience.map((job, idx) => (
                <article className={styles.job} key={idx}>
                  <h4 className={styles.jobHeader}>
                    {job.period}: {job.role}
                  </h4>
                  <p className={styles.jobCompany}>
                    <em>
                      {job.location}. {job.company}
                    </em>
                  </p>
                  <p className={styles.jobAbilities}>
                    <strong>Abilities Acquired:</strong>{" "}
                    {renderInlineBold(job.abilities)}
                  </p>
                  {job.accomplishments && job.accomplishments.length > 0 && (
                    <>
                      <p className={styles.accomplishmentsLabel}>
                        <strong>
                          <em>Main Accomplishements:</em>
                        </strong>
                      </p>
                      <ol className={styles.accomplishments}>
                        {job.accomplishments.map((a) => (
                          <li key={a.name}>
                            <strong>
                              {a.name} (
                              <a
                                href={a.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {a.url}
                              </a>
                              ):
                            </strong>{" "}
                            {a.description}
                          </li>
                        ))}
                      </ol>
                      {job.extraLink && (
                        <p className={styles.extraLink}>
                          <strong>
                            {job.extraLink.label}:{" "}
                            <a
                              href={job.extraLink.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {job.extraLink.url}
                            </a>
                          </strong>
                        </p>
                      )}
                    </>
                  )}
                </article>
              ))}
            </MainSection>

            <MainSection title="Education:">
              {cvData.education.map((edu) => (
                <div className={styles.education} key={edu.institution}>
                  <p className={styles.educationInstitution}>
                    {edu.institution}
                  </p>
                  <p className={styles.educationDescription}>
                    <em>{edu.description}</em>
                  </p>
                </div>
              ))}
            </MainSection>

            <MainSection title="Additional Courses:">
              {cvData.additionalCourses.map((course) => (
                <div className={styles.course} key={course.title}>
                  <p className={styles.courseTitle}>{course.title}</p>
                  <p className={styles.courseProvider}>
                    <em>{course.provider}</em>
                  </p>
                </div>
              ))}
            </MainSection>
          </main>
        </div>
      </div>
    </>
  );
}

CVPage.getLayout = (page) => page;
