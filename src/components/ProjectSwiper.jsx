import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "@/styles/Home.module.sass";
import HexText from "@/components/HexText";

function ToolIcon({ src, alt, className }) {
  return (
    <Image className={className} src={src} alt={`${alt} Icon`} width="20" height="20" />
  );
}

export default function ProjectSwiper({ projects: items, t }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className={`${styles.swiper} ${styles.projectSwiper}`}
    >
      {items.map((project) => (
        <SwiperSlide className={styles.swiperSlide} key={project.key}>
          <div className={styles.project}>
            <div className={styles.projectTitleAndFocus}>
              <HexText as="h4" text={t(project.titleKey)} staggerMs={30} threshold={0.3} />
              <HexText as="p" text={t(project.skillKey)} staggerMs={20} threshold={0.3} />
            </div>
            <div className={styles.projectImages}>
              <Image
                className={styles.projectImage}
                src={project.image.src}
                alt={project.image.alt}
                width={640}
                height={360}
              />
              <div className={styles.toolForProject}>
                {project.tools.map((tool) => (
                  <ToolIcon key={tool.src} src={tool.src} alt={tool.alt} className={styles.projectToolImage} />
                ))}
              </div>
            </div>
            <div className={styles.projectContent}>
              <p>
                {project.descriptionKeys.map((key, i) => (
                  <React.Fragment key={key}>
                    {i > 0 && <><br /><br /></>}
                    {t(key)}
                  </React.Fragment>
                ))}
              </p>
              <div className={styles.projectButtons}>
                {project.siteUrl && (
                  <Link href={project.siteUrl} target="_blank">
                    <button>{t(project.siteButtonKey)}</button>
                  </Link>
                )}
                {project.codeUrl && (
                  <Link href={project.codeUrl} target="_blank">
                    <button>{t(project.codeButtonKey)}</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
