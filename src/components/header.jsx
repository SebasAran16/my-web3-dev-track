import React, { useEffect } from "react";
import styles from "@/styles/layout/Header.module.sass";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useLenis } from "@/providers/LenisProvider";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("header");
  const lenis = useLenis();

  const toggleNav = () => {
    const nav = document.querySelector(`#${styles.navBar}`);
    nav.classList.toggle(styles.hiddenNav);
  };

  const closeNav = () => {
    const nav = document.querySelector(`#${styles.navBar}`);
    nav.classList.add(styles.hiddenNav);
  };

  const navPressed = (e) => {
    const id = e.target.id;
    const el = id === "contact"
      ? document.querySelector("footer")
      : document.querySelector(`[data-section="${id}"]`);
    if (!el) {
      closeNav();
      return;
    }
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    closeNav();
  };

  useEffect(() => {
    const header = document.querySelector(`#${styles.headerBar}`);
    const sticky = header.offsetHeight;

    const handleScroll = () => {
      if (window.scrollY >= sticky && window.innerWidth >= 992) {
        header.classList.add(styles.stickyHeader);
      } else {
        header.classList.remove(styles.stickyHeader);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id={styles.headerBar}>
      <div id={styles.headerLeft}>
        <Link href="/" onClick={closeNav}>
          <h4 id={styles.nameLogo}>
            Sebastian <span className={styles.highlightMain}>Arango</span>
          </h4>
        </Link>
      </div>
      <div id={styles.headerRight}>
        <div id={styles.socials}>
          <Link
            href="https://www.linkedin.com/in/sebastian-zambrano-arango-4335361b3/"
            target="_blank"
          >
            <Image
              src="/icons/linkedin.png"
              alt="Linkin Icon"
              width="30"
              height="30"
              priority
            />
          </Link>
          <Link href="https://github.com/SebasAran16" target="_blank">
            <Image
              src="/icons/github.png"
              alt="Github Icon"
              width="30"
              height="30"
              priority
            />
          </Link>
          <Link href="https://twitter.com/Sebas_aran16" target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter Icon"
              width="30"
              height="30"
              priority
            />
          </Link>
        </div>
        <Image
          className={styles.navToggler}
          src="/icons/menu.png"
          alt="Menu Image"
          width="35"
          height="35"
          onClick={toggleNav}
          priority
        />
        <nav
          id={styles.navBar}
          className={styles.hiddenNav}
          data-lenis-prevent
        >
          <div id={styles.firstsNav}>
            <div id={styles.switcherContainer}>
              <Link
                href={router.asPath}
                locale="en"
                className={router.locale == "en" ? styles.activeLanguage : ""}
              >
                <p>EN</p>
              </Link>
              <p>/</p>
              <Link
                href={router.asPath}
                locale="es"
                className={router.locale == "es" ? styles.activeLanguage : ""}
              >
                <p>ES</p>
              </Link>
            </div>
            <Image
              className={styles.navToggler}
              src="/icons/cross.png"
              alt="Cross Image"
              width="30"
              height="30"
              onClick={toggleNav}
            />
          </div>
          <button
            id="home"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("buttons.home")}
          </button>
          <button
            id="about"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("buttons.about")}
          </button>
          <button
            id="portfolio"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("buttons.portfolio")}
          </button>
          <button
            id="contact"
            onClick={(e) => {
              navPressed(e);
            }}
          >
            {t("buttons.contact")}
          </button>
          {process.env.NODE_ENV !== "production" && (
            <Link
              className={styles.cvButton}
              href="/cv"
              onClick={closeNav}
            >
              {t("buttons.cv")}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
