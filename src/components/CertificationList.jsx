import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.sass";
import {
  certificationAnchorId,
  experienceAnchorId,
  useScrollToAnchor,
} from "@/hooks/useScrollToAnchor";

// The JSON dates are plain "YYYY-MM-DD" days, so build them in local time —
// `new Date("2026-09-01")` is parsed as UTC and slips to the previous day for
// anyone west of Greenwich.
const parseDay = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDay = (value, locale) =>
  parseDay(value).toLocaleDateString(locale, { year: "numeric", month: "long" });

export default function CertificationList({ certifications, t, locale }) {
  const scrollToAnchor = useScrollToAnchor();

  return (
    <div className={styles.certificationsGrid}>
      {certifications.map((certification) => {
        const expired =
          certification.expiresOn && parseDay(certification.expiresOn) < new Date();

        return (
          <article
            className={styles.certification}
            key={certification.id}
            id={certificationAnchorId(certification.id)}
          >
            <h4>
              <Link href={certification.file} target="_blank">
                {certification.name}
              </Link>
            </h4>
            <p className={styles.certificationIssuer}>{certification.issuer}</p>

            {certification.company && (
              <button
                type="button"
                className={styles.certificationCompany}
                title={certification.company.name}
                onClick={() =>
                  scrollToAnchor(experienceAnchorId(certification.companyId))
                }
              >
                <Image
                  src={certification.company.image.src}
                  alt={certification.company.image.alt}
                  width="28"
                  height="28"
                />
                <span>
                  {t("portfolio.certifications.throughCompany", {
                    company: certification.company.name,
                  })}
                </span>
              </button>
            )}

            <p className={styles.certificationValidity}>
              {[
                certification.issuedOn &&
                  `${t("portfolio.certifications.issued")}: ${formatDay(
                    certification.issuedOn,
                    locale
                  )}`,
                certification.expiresOn
                  ? `${t(
                      expired
                        ? "portfolio.certifications.expired"
                        : "portfolio.certifications.expires"
                    )}: ${formatDay(certification.expiresOn, locale)}`
                  : t("portfolio.certifications.noExpiration"),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>

            <p className={styles.certificationDescription}>
              {certification.description[locale] || certification.description.en}
            </p>

            <ul className={styles.certificationSkills}>
              {certification.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>

            <div className={styles.certificationLinks}>
              <Link href={certification.file} target="_blank">
                {t("portfolio.certifications.viewCertificate")}
              </Link>
              {certification.credentialUrl && (
                <Link href={certification.credentialUrl} target="_blank">
                  {t("portfolio.certifications.verify")}
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
