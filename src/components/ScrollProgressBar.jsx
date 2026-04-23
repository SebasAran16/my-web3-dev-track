import React, { useRef } from "react";
import styles from "@/styles/ScrollProgressBar.module.sass";
import { useLenisScroll, useLenisContext } from "@/providers/LenisProvider";

export default function ScrollProgressBar() {
  const fillRef = useRef(null);
  const { reducedMotion } = useLenisContext();

  useLenisScroll(({ progress }) => {
    if (!fillRef.current) return;
    const clamped = Math.max(0, Math.min(1, progress || 0));
    fillRef.current.style.transform = `scaleX(${clamped})`;
  });

  if (reducedMotion) return null;

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
