import { useEffect, useRef, useState } from "react";

const HEX_CHARS = "0123456789ABCDEF";

function randomHexChar() {
  return HEX_CHARS[(Math.random() * 16) | 0];
}

let prefersReducedMotion = false;
if (typeof window !== "undefined" && window.matchMedia) {
  try {
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  } catch (_) {}
}

/**
 * Renders the final text on SSR, then on first intersection runs a single
 * rAF loop that scrambles unresolved characters and resolves them left-to-right.
 *
 * Why one rAF instead of two setIntervals:
 *  - dozens of HexText instances * 2 intervals each = thousands of setInterval
 *    ticks per second on the main thread, which destroys INP.
 *  - rAF lets the browser batch all DOM writes per frame.
 */
export function useHexDecode(text, options = {}) {
  const {
    staggerMs = 30,
    scrambleIntervalMs = 40,
    threshold = 0.3,
  } = options;

  const ref = useRef(null);
  // Start with the final text so SSR/hydration are stable and there's no CLS
  // from text-width oscillation before the user has even scrolled to it.
  const [displayText, setDisplayText] = useState(text || "");
  const startedRef = useRef(false);

  useEffect(() => {
    setDisplayText(text || "");
    startedRef.current = false;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text || prefersReducedMotion) return;
    if (startedRef.current) return;

    let rafId = null;
    let observer = null;
    let cancelled = false;

    const startDecode = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const chars = text.split("");
      const len = chars.length;
      const resolvedAt = new Array(len).fill(false);

      // pre-resolve whitespace
      for (let i = 0; i < len; i++) {
        if (chars[i] === " " || chars[i] === "\n") resolvedAt[i] = true;
      }

      const startTime = performance.now();
      let resolvedCount = 0;
      let lastScramble = 0;
      let scrambleBuffer = chars.slice();

      const tick = (now) => {
        if (cancelled) return;

        // Resolve up to N characters since start
        const target = Math.min(
          len,
          Math.floor((now - startTime) / staggerMs) + 1
        );
        while (resolvedCount < target) {
          if (!resolvedAt[resolvedCount]) {
            resolvedAt[resolvedCount] = true;
            scrambleBuffer[resolvedCount] = chars[resolvedCount];
          }
          resolvedCount++;
        }

        // Re-shuffle unresolved chars at scrambleIntervalMs cadence
        if (now - lastScramble >= scrambleIntervalMs) {
          lastScramble = now;
          for (let i = 0; i < len; i++) {
            if (!resolvedAt[i]) scrambleBuffer[i] = randomHexChar();
          }
          setDisplayText(scrambleBuffer.join(""));
        }

        if (resolvedCount < len) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplayText(text);
        }
      };

      // First scramble pass + start rAF
      for (let i = 0; i < len; i++) {
        if (!resolvedAt[i]) scrambleBuffer[i] = randomHexChar();
      }
      setDisplayText(scrambleBuffer.join(""));
      rafId = requestAnimationFrame(tick);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startDecode();
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      if (rafId != null) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, [text, staggerMs, scrambleIntervalMs, threshold]);

  return { ref, displayText, hasDecoded: displayText === text };
}
