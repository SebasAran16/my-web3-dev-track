import React, { useEffect } from "react";
import styles from "@/styles/layout/Header.module.sass";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const toggleNav = () => {
    const nav = document.querySelector(`#${styles.navBar}`);
    nav.classList.toggle(styles.hiddenNav);
  };

  const closeNav = () => {
    const nav = document.querySelector(`#${styles.navBar}`);
    nav.classList.add(styles.hiddenNav);
  };

  const navPressed = (e) => {
    const button = e.target;
    const clickHandler = (e) => {
      switch (e.target.innerHTML) {
        case "Home":
          const homeSection = document.querySelector(
            "#Home_homeSection__A1suR"
          );
          homeSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "About Me":
          const aboutSection = document.querySelector(
            "#Home_aboutSection__hyofv"
          );
          aboutSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "Portfolio":
          const portfolioSection = document.querySelector(
            "#Home_portfolioSection__yENuo"
          );
          portfolioSection.scrollIntoView({ behaviour: "smooth" });
          break;
        case "Contact Me":
          const contactSection = document.querySelector(
            "#Footer_footerContainer__L4ecT"
          );
          contactSection.scrollIntoView({ behavior: "smooth" });
          break;
      }
      closeNav();
    };

    button.addEventListener("click", clickHandler(e));
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
            />
          </Link>
          <Link href="https://github.com/SebasAran16" target="_blank">
            <Image
              src="/icons/github.png"
              alt="Github Icon"
              width="30"
              height="30"
            />
          </Link>
          <Link href="https://twitter.com/Sebas_aran16" target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter Icon"
              width="30"
              height="30"
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
        />
        <nav id={styles.navBar} className={styles.hiddenNav}>
          <Image
            className={styles.navToggler}
            src="/icons/cross.png"
            alt="Cross Image"
            width="30"
            height="30"
            onClick={toggleNav}
          />
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            Home
          </button>
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            About Me
          </button>
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            Portfolio
          </button>
          <button
            onClick={(e) => {
              navPressed(e);
            }}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </header>
  );
}
