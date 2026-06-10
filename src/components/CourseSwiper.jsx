import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "@/styles/Home.module.sass";

export default function CourseSwiper({ courses, t }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, dynamicBullets: false }}
      modules={[Navigation, Pagination]}
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
                  <Image key={img.src} className={styles.slideImages} src={img.src} alt={img.alt} width="50" height="50" />
                ))}
              </div>
              <p>
                {descriptionKeys.map((key, i) => (
                  <React.Fragment key={key}>
                    {i > 0 && <><br /><br /></>}
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
