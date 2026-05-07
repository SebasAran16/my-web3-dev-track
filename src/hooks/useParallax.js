import { useEffect, useRef } from "react";
import { useLenisScroll } from "@/providers/LenisProvider";

/**
 * Translates an element along an axis based on its position relative to
 * viewport center. Cached layout measurements (resize / IntersectionObserver)
 * keep the per-scroll path off the layout-thrash hot path: each scroll event
 * only does math, no getBoundingClientRect.
 */
export function useParallax({ speed = 0.15, axis = "y", minWidth = 0 } = {}) {
  const targetRef = useRef(null);
  const frameRef = useRef(null);
  const latestRef = useRef(0);
  const enabledRef = useRef(true);
  // Cached layout: element's top in document coords + element height.
  const layoutRef = useRef({ docTop: 0, height: 0, viewport: 0, cached: false });

  const apply = () => {
    frameRef.current = null;
    const el = targetRef.current;
    if (!el) return;
    const translate = enabledRef.current ? latestRef.current : 0;
    el.style.transform =
      axis === "x"
        ? `translate3d(${translate}px, 0, 0)`
        : `translate3d(0, ${translate}px, 0)`;
  };

  const schedule = () => {
    if (frameRef.current != null) return;
    frameRef.current = requestAnimationFrame(apply);
  };

  const measure = () => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    layoutRef.current = {
      docTop: rect.top + window.scrollY,
      height: rect.height,
      viewport: window.innerHeight,
      cached: true,
    };
  };

  useLenisScroll(({ scroll }) => {
    if (!enabledRef.current) {
      if (latestRef.current !== 0) {
        latestRef.current = 0;
        schedule();
      }
      return;
    }
    const layout = layoutRef.current;
    if (!layout.cached) return;
    const elCenter = layout.docTop + layout.height / 2 - scroll;
    const distance = elCenter - layout.viewport / 2;
    latestRef.current = -distance * speed;
    schedule();
  });

  // Establish + refresh cached layout. Re-measures on resize and when
  // the element first appears via IntersectionObserver.
  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof window === "undefined") return undefined;

    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(() => measure(), { threshold: 0 });
      io.observe(el);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (io) io.disconnect();
    };
  }, []);

  // Toggle enabled state via media query
  useEffect(() => {
    if (minWidth <= 0) {
      enabledRef.current = true;
      return undefined;
    }
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => {
      enabledRef.current = mql.matches;
      if (!mql.matches) {
        latestRef.current = 0;
        schedule();
      }
    };
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [minWidth]);

  useEffect(() => {
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return targetRef;
}
