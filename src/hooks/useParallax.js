import { useEffect, useRef } from "react";
import { useLenisScroll } from "@/providers/LenisProvider";

export function useParallax({ speed = 0.15, axis = "y" } = {}) {
  const targetRef = useRef(null);
  const frameRef = useRef(null);
  const latestRef = useRef(0);

  const apply = () => {
    frameRef.current = null;
    const el = targetRef.current;
    if (!el) return;
    const translate = latestRef.current;
    el.style.transform =
      axis === "x"
        ? `translate3d(${translate}px, 0, 0)`
        : `translate3d(0, ${translate}px, 0)`;
  };

  const schedule = () => {
    if (frameRef.current != null) return;
    frameRef.current = requestAnimationFrame(apply);
  };

  useLenisScroll(() => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elCenter = rect.top + rect.height / 2;
    const distance = elCenter - viewportCenter;
    latestRef.current = -distance * speed;
    schedule();
  });

  useEffect(() => {
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return targetRef;
}
