import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext({
  getLenis: () => null,
  reducedMotion: false,
});

export const useLenisContext = () => useContext(LenisContext);

export const useLenis = () => useContext(LenisContext).getLenis();

export function useLenisScroll(callback) {
  const { getLenis, ready } = useContext(LenisContext);
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ready) return undefined;
    const lenis = getLenis();
    if (!lenis) return undefined;
    const handler = (data) => cbRef.current?.(data);
    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [getLenis, ready]);
}

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setReady(false);
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    setReady(true);

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current = null;
      setReady(false);
    };
  }, [reducedMotion]);

  const getLenis = useCallback(() => lenisRef.current, []);

  return (
    <LenisContext.Provider value={{ getLenis, reducedMotion, ready }}>
      {children}
    </LenisContext.Provider>
  );
}
