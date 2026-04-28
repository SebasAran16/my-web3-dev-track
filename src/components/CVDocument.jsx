import React from "react";
import Image from "next/image";
import styles from "@/styles/CV.module.sass";

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

export default function CVDocument({ data }) {
  return (
    <div className={styles.cvPage}>
      <aside className={styles.sidebar}>
        <div className={styles.photoWrap}>
          <Image
            src={data.photo}
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
            <a href={`mailto:${data.contact.email}`}>
              {data.contact.email}
            </a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Location:</span>
            <span>{data.contact.location}</span>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Webpage:</span>
            <a href={data.contact.webpage} target="_blank" rel="noreferrer">
              {data.contact.webpage}
            </a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Github:</span>
            <a href={data.contact.github} target="_blank" rel="noreferrer">
              {data.contact.github}
            </a>
          </p>
        </SidebarSection>

        <SidebarSection title="Profile:">
          <MultilineText text={data.profile} />
        </SidebarSection>

        <SidebarSection title="Languages:">
          <ul className={styles.languages}>
            {data.languages.map((lang) => (
              <li key={lang.name}>
                -<strong>{lang.name}</strong> ({lang.level})
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection title="Soft Skills:">
          <ul className={styles.softSkills}>
            {data.softSkills.map((skill) => (
              <li key={skill}>
                -<em>{skill}</em>
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection title="Technological Skills">
          <Paragraph>{data.technologicalSkills}</Paragraph>
        </SidebarSection>

        <SidebarSection title="Additional Information">
          {data.additionalInformation.map((item) => (
            <p key={item.label} className={styles.contactItem}>
              {item.value ? (
                <>
                  <span className={styles.contactLabel}>{item.label}:</span>
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
            <span>{data.name.first}</span>
            <span>{data.name.second}</span>
            <span>{data.name.third}</span>
          </h1>
          <p className={styles.roleTitle}>- {data.title} -</p>
        </header>

        <MainSection title="Experience:">
          {data.experience.map((job, idx) => (
            <article className={styles.job} key={idx}>
              <h4 className={styles.jobHeader}>
                {job.period}: {job.role}
              </h4>
              <p className={styles.jobCompany}>
                <em>
                  {job.location}. {job.company}
                </em>
              </p>
              {job.accomplishments && job.accomplishments.length > 0 && (
                <ol className={styles.accomplishments}>
                  {job.accomplishments.map((a) => (
                    <li key={a.name}>
                      <strong>
                        {a.url ? (
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {a.name}
                          </a>
                        ) : (
                          a.name
                        )}
                        :
                      </strong>{" "}
                      {a.description}
                    </li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </MainSection>

        {data.education && data.education.length > 0 && (
          <MainSection title="Education:">
            {data.education.map((edu) => (
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
        )}

        {data.additionalCourses && data.additionalCourses.length > 0 && (
          <MainSection title="Additional Courses:">
            {data.additionalCourses.map((course) => (
              <div className={styles.course} key={course.title}>
                <p className={styles.courseTitle}>{course.title}</p>
                <p className={styles.courseProvider}>
                  <em>{course.provider}</em>
                </p>
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </div>
  );
}
