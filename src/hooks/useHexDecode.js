import { useEffect, useRef, useState, useCallback } from "react";

const HEX_CHARS = "0123456789ABCDEF";

function randomHex(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }
  return result;
}

/**
 * Hook that observes an element and triggers a hex-decode text animation
 * when it scrolls into view. Characters start as random hex and resolve
 * left-to-right into the real text.
 *
 * @param {string} text - The final text to display
 * @param {object} options
 * @param {number} options.staggerMs - ms between each character resolving (default 30)
 * @param {number} options.scrambleIntervalMs - how fast hex chars shuffle (default 40)
 * @param {number} options.threshold - IntersectionObserver threshold (default 0.3)
 * @returns {{ ref, displayText, hasDecoded }}
 */
export function useHexDecode(text, options = {}) {
  const {
    staggerMs = 30,
    scrambleIntervalMs = 40,
    threshold = 0.3,
  } = options;

  const ref = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [hasDecoded, setHasDecoded] = useState(false);
  const hasStarted = useRef(false);

  const startDecode = useCallback(() => {
    if (hasStarted.current || !text) return;
    hasStarted.current = true;

    const chars = text.split("");
    const resolved = new Array(chars.length).fill(false);
    let resolvedCount = 0;

    // Scramble interval — shuffles unresolved characters
    const scrambleId = setInterval(() => {
      const display = chars
        .map((ch, i) => {
          if (resolved[i]) return ch;
          // Keep spaces/newlines as-is
          if (ch === " " || ch === "\n") return ch;
          return HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        })
        .join("");
      setDisplayText(display);
    }, scrambleIntervalMs);

    // Stagger interval — resolves one character at a time from left to right
    const staggerId = setInterval(() => {
      if (resolvedCount >= chars.length) {
        clearInterval(staggerId);
        clearInterval(scrambleId);
        setDisplayText(text);
        setHasDecoded(true);
        return;
      }
      // Skip spaces — resolve them instantly
      while (
        resolvedCount < chars.length &&
        (chars[resolvedCount] === " " || chars[resolvedCount] === "\n")
      ) {
        resolved[resolvedCount] = true;
        resolvedCount++;
      }
      if (resolvedCount < chars.length) {
        resolved[resolvedCount] = true;
        resolvedCount++;
      }
    }, staggerMs);

    return () => {
      clearInterval(scrambleId);
      clearInterval(staggerId);
    };
  }, [text, staggerMs, scrambleIntervalMs]);

  useEffect(() => {
    if (!text) return;
    // Initialize with hex
    setDisplayText(
      text
        .split("")
        .map((ch) =>
          ch === " " || ch === "\n"
            ? ch
            : HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
        )
        .join("")
    );
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasStarted.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startDecode();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startDecode, threshold]);

  return { ref, displayText, hasDecoded };
}
