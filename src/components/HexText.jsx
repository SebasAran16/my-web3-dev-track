import React from "react";
import { useHexDecode } from "@/hooks/useHexDecode";

/**
 * HexText — renders a text element that decodes from hex characters
 * to the real text when it scrolls into view.
 *
 * @param {object} props
 * @param {string} props.as - HTML tag to render (default "span")
 * @param {string} props.text - The final text content
 * @param {string} props.className - Optional CSS class
 * @param {string} props.id - Optional id
 * @param {number} props.staggerMs - ms per character resolve (default 30)
 * @param {number} props.threshold - intersection threshold (default 0.3)
 * @param {object} props.style - Optional inline styles
 * @param {React.ReactNode} props.children - If provided, used instead of text
 */
export default function HexText({
  as: Tag = "span",
  text,
  className,
  id,
  staggerMs = 30,
  threshold = 0.3,
  style,
  ...rest
}) {
  const { ref, displayText } = useHexDecode(text || "", {
    staggerMs,
    threshold,
  });

  return (
    <Tag ref={ref} className={className} id={id} style={style} {...rest}>
      {displayText}
    </Tag>
  );
}
