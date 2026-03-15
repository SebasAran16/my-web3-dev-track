/**
 * Generates a static OG image (1200x630) as an SVG, then
 * writes it to public/og-image.svg.
 *
 * For best social-media compatibility, convert to PNG:
 *   npx svg2png-many public/og-image.svg --width 1200
 * or use any SVG-to-PNG tool.
 *
 * Run: node scripts/generate-og-image.js
 */

const fs = require("fs");
const path = require("path");

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d0d0d"/>
      <stop offset="50%" style="stop-color:#1a0a1a"/>
      <stop offset="100%" style="stop-color:#0d0d0d"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF2D7B"/>
      <stop offset="100%" style="stop-color:#00F0FF"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,45,123,0.08)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="url(#accent)"/>

  <!-- Left accent bar -->
  <rect x="60" y="140" width="4" height="200" fill="#FF2D7B"/>

  <!-- Hex decoration -->
  <text x="80" y="100" font-family="monospace" font-size="14" fill="rgba(0,240,255,0.15)" letter-spacing="2">
    0x5E8A5 41A6 C0D3 B10C 4CH41N D3V 53BA5714N
  </text>
  <text x="80" y="120" font-family="monospace" font-size="14" fill="rgba(255,45,123,0.12)" letter-spacing="2">
    F07 5714CK 5M417 C0N7AC75 D3F1 N3X7 50L1D17Y
  </text>

  <!-- Main title -->
  <text x="80" y="200" font-family="monospace" font-weight="700" font-size="62" fill="white" letter-spacing="-2">
    SEBASTIAN
  </text>
  <text x="80" y="275" font-family="monospace" font-weight="700" font-size="62" fill="#FF2D7B" letter-spacing="-2">
    ARANGO
  </text>

  <!-- Subtitle -->
  <text x="84" y="330" font-family="monospace" font-weight="400" font-size="26" fill="#00F0FF" letter-spacing="4">
    FULLSTACK &amp; BLOCKCHAIN DEVELOPER
  </text>

  <!-- Bottom accent line -->
  <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="url(#accent)"/>

  <!-- Tech tags -->
  <rect x="80" y="400" width="130" height="36" rx="0" fill="none" stroke="#FF2D7B" stroke-width="2"/>
  <text x="145" y="424" font-family="monospace" font-size="16" fill="white" text-anchor="middle" letter-spacing="2">SOLIDITY</text>

  <rect x="230" y="400" width="120" height="36" rx="0" fill="none" stroke="#FF2D7B" stroke-width="2"/>
  <text x="290" y="424" font-family="monospace" font-size="16" fill="white" text-anchor="middle" letter-spacing="2">NEXT.JS</text>

  <rect x="370" y="400" width="160" height="36" rx="0" fill="none" stroke="#FF2D7B" stroke-width="2"/>
  <text x="450" y="424" font-family="monospace" font-size="16" fill="white" text-anchor="middle" letter-spacing="2">TYPESCRIPT</text>

  <rect x="550" y="400" width="110" height="36" rx="0" fill="none" stroke="#00F0FF" stroke-width="2"/>
  <text x="605" y="424" font-family="monospace" font-size="16" fill="white" text-anchor="middle" letter-spacing="2">WEB3</text>

  <rect x="680" y="400" width="110" height="36" rx="0" fill="none" stroke="#00F0FF" stroke-width="2"/>
  <text x="735" y="424" font-family="monospace" font-size="16" fill="white" text-anchor="middle" letter-spacing="2">DEFI</text>

  <!-- URL -->
  <text x="80" y="560" font-family="monospace" font-size="18" fill="rgba(255,255,255,0.4)" letter-spacing="3">
    sebastianarango.com
  </text>

  <!-- Decorative corner brackets -->
  <path d="M ${WIDTH-80} 140 L ${WIDTH-80} 100 L ${WIDTH-40} 100" fill="none" stroke="#00F0FF" stroke-width="2"/>
  <path d="M ${WIDTH-80} ${HEIGHT-140} L ${WIDTH-80} ${HEIGHT-100} L ${WIDTH-40} ${HEIGHT-100}" fill="none" stroke="#FF2D7B" stroke-width="2"/>

  <!-- Scanlines overlay -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.3"/>
</svg>`;

const outPath = path.join(__dirname, "..", "public", "og-image.svg");
fs.writeFileSync(outPath, svg, "utf-8");
console.log(`OG image written to ${outPath}`);
console.log(
  "For best compatibility, convert to PNG (1200x630):\n  npx sharp-cli -i public/og-image.svg -o public/og-image.png --width 1200"
);
