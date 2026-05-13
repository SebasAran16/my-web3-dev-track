import React from "react";
import styles from "@/styles/layout/Footer.module.sass";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer id={styles.footerContainer}>
      <div id={styles.title}>
        <h3>{t("form.title")}</h3>
        <p>{t("form.explanation")}</p>
      </div>
      <div id={styles.form}>
        <form
          id={styles.mailForm}
          action="https://formsubmit.co/sebastianarango201316@gmail.com"
          method="POST"
        >
          <input
            className={styles.formInput}
            type="text"
            name="name"
            placeholder={t("form.name")}
            required
          />
          <input
            className={styles.formInput}
            type="email"
            name="email"
            placeholder={t("form.mail")}
            required
          />
          <textarea
            id={styles.messageInput}
            className={styles.formInput}
            type="text"
            name="message"
            placeholder={t("form.message")}
            required
          />
          <input
            type="hidden"
            name="_next"
            value="https://sebastianarango.com/thanks"
          />
          <input type="hidden" name="_subject" value="SelfPage Mail Submit!" />
          <button type="submit">{t("form.send")}</button>
        </form>
      </div>
      <div id={styles.socialsIcons}>
        <Link
          href="https://www.linkedin.com/in/sebastian-zambrano-arango-4335361b3/"
          target="_blank"
        >
          <img
            src="/icons/linkedin.svg"
            alt="LinkedIn Icon"
            width="24"
            height="24"
          />
        </Link>
        <Link href="https://github.com/SebasAran16" target="_blank">
          <img
            src="/icons/github.svg"
            alt="GitHub Icon"
            width="24"
            height="24"
          />
        </Link>
        <Link href="https://twitter.com/Sebas_aran16" target="_blank">
          <img
            src="/icons/twitter.svg"
            alt="Twitter Icon"
            width="24"
            height="24"
          />
        </Link>
      </div>
    </footer>
  );
}
