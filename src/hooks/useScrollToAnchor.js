import { useCallback } from "react";
import { useLenis } from "@/providers/LenisProvider";
import styles from "@/styles/Home.module.sass";

// Cross-links between the experience cards and the certification cards ride on
// element ids, so both directions share one scroll + highlight behaviour.
export const experienceAnchorId = (companyId) => `experience-${companyId}`;
export const certificationAnchorId = (certificationId) =>
  `certification-${certificationId}`;

// Keep the target clear of the sticky desktop header.
const HEADER_OFFSET = -80;
const FLASH_MS = 1400;

export function useScrollToAnchor() {
  const lenis = useLenis();

  return useCallback(
    (anchorId) => {
      const target = document.getElementById(anchorId);
      if (!target) return;

      const offset = window.innerWidth >= 992 ? HEADER_OFFSET : 0;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Re-trigger the flash even when the same card is clicked twice in a row.
      target.classList.remove(styles.anchorFlash);
      void target.offsetWidth;
      target.classList.add(styles.anchorFlash);
      window.setTimeout(
        () => target.classList.remove(styles.anchorFlash),
        FLASH_MS
      );
    },
    [lenis]
  );
}
