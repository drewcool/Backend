import fs from "fs";
import path from "path";

export interface AriesPageData {
  /** All CSS extracted from <style> tags, with paths fixed to absolute */
  css: string;
  /** The full innerHTML of <body>, scripts removed, paths fixed */
  bodyHtml: string;
  /** Class name(s) on the original <body> tag */
  bodyClass: string;
  /** src paths of <script type="module"> tags found in the body (main Framer entry) */
  moduleScripts: string[];
  /** src paths of regular async/defer <script> tags */
  asyncScripts: string[];
  /** Inline <script> blocks (e.g. GA dataLayer) */
  inlineScripts: string[];
}

/** Fix relative asset paths to absolute for Next.js public serving */
function fixHtmlPaths(html: string): string {
  return html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/src="js\//g, 'src="/js/')
    .replace(/href="images\//g, 'href="/images/')
    .replace(/href="fonts\//g, 'href="/fonts/')
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/href="js\//g, 'href="/js/');
}

/** Fix relative paths inside CSS url() declarations */
function fixCssPaths(css: string): string {
  return css
    .replace(/url\("fonts\//g, 'url("/fonts/')
    .replace(/url\('fonts\//g, "url('/fonts/")
    .replace(/url\(fonts\//g, "url(/fonts/")
    .replace(/url\("images\//g, 'url("/images/')
    .replace(/url\('images\//g, "url('/images/")
    .replace(/url\(images\//g, "url(/images/")
    .replace(/url\("assets\//g, 'url("/assets/')
    .replace(/url\('assets\//g, "url('/assets/")
    .replace(/url\(assets\//g, "url(/assets/");
}

/** Surgical removal of ONLY Figma and Digimoga floating badge containers */
function removeFigmaAndDigimogaSurgically(html: string): string {
  let cleaned = html;

  // 1. Swap ALL Arise logo image hashes — catches every size/format variant Framer generates.
  //    Covers: relative paths (images/...), absolute CDN paths (framerusercontent.com/images/...)
  //    5 known hashes: 3 navbar/main logo + 2 footer logo hashes (gej9 and 3p0I).
  const ARISE_LOGO_HASHES = [
    "PNBw6IRBeTzFMheULCykzniB9Q",
    "j07dUDNi3R7s1hBgf9y7iH3NCA",
    "0RVP3HSTOxbLQpHFYKd8UstCPQ",
    "gej9Vnua3h6ntvlEXMy8d6WLLnM",  // footer logo (testimonials section)
    "3p0IlyunupDBI3v4BHnlGEV03Gw",  // footer logo (all pages)
  ];
  const hashPattern = ARISE_LOGO_HASHES.join("|");

  // Relative path: images/<hash>.<variant>.<ext>
  cleaned = cleaned.replace(
    new RegExp(`images/(${hashPattern})\\.[a-z0-9]+\\.(svg|png|jpg)`, "gi"),
    "/Logo.png"
  );
  // CDN path: framerusercontent.com/images/<hash>.<ext> or /assets/<hash>.<ext>
  cleaned = cleaned.replace(
    new RegExp(`https://framerusercontent\\.com/(?:images|assets)/(${hashPattern})\\.\\S+?(?=["'\\s])`, "gi"),
    "/Logo.png"
  );

  // 2. Remove "Template By Digimoga" / "Template by Digimoga" text at server level.
  //    This is a best-effort pass — Framer hydration re-renders from JS data,
  //    but the client-side applyTextCleans() catches anything that re-appears.
  cleaned = cleaned.replace(/Template [Bb]y Digimoga/g, "");

  // 3. Update copyright year
  cleaned = cleaned.replace(/@2024, All Rights Reserved/g, "@2026, All Rights Reserved");
  cleaned = cleaned.replace(/>@2024</g, ">@2026<");

  // 4. Remove ONLY specific floating badge containers
  cleaned = cleaned.replace(/<div class="framer-lpe29j-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "");
  cleaned = cleaned.replace(/<div class="framer-3ek784-container">[\s\S]*?<\/div>/gi, "");

  return cleaned;
}


/**
 * Reads a Framer template HTML file and extracts everything needed to
 * render it inside a Next.js page with 1:1 visual and animation fidelity.
 */
export function getAriesPage(templateRelativePath: string): AriesPageData {
  const templatesDir = path.join(process.cwd(), "src", "templates");
  const filePath = path.join(templatesDir, templateRelativePath);
  let html = fs.readFileSync(filePath, "utf-8");

  // Normalize CRLF to LF to prevent React 19 hydration mismatches between Server & Client
  html = html.replace(/\r\n/g, "\n");

  // Surgical clean
  html = removeFigmaAndDigimogaSurgically(html);

  // ── 1. Extract all <style> blocks ─────────────────────────────────────
  let css = "";
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch: RegExpExecArray | null;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    css += fixCssPaths(styleMatch[1]) + "\n";
  }

  // ── 2. Extract body class ──────────────────────────────────────────────
  const bodyTagMatch = html.match(/<body([^>]*)>/i);
  const bodyAttrs = bodyTagMatch ? bodyTagMatch[1] : "";
  const bodyClassMatch = bodyAttrs.match(/class="([^"]*)"/);
  const bodyClass = bodyClassMatch ? bodyClassMatch[1] : "";

  // ── 3. Extract full body innerHTML ────────────────────────────────────
  const bodyContentMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let bodyHtml = bodyContentMatch ? bodyContentMatch[1] : "";
  bodyHtml = fixHtmlPaths(bodyHtml);

  // ── 4. Extract <script type="module"> srcs (Framer runtime) ──────────
  const moduleScripts: string[] = [];
  const moduleScriptRegex = /<script[^>]+type=["']module["'][^>]*src=["']([^"']+)["'][^>]*>/gi;
  let msMatch: RegExpExecArray | null;
  while ((msMatch = moduleScriptRegex.exec(bodyHtml)) !== null) {
    moduleScripts.push(msMatch[1].startsWith("/") ? msMatch[1] : "/" + msMatch[1]);
  }
  // Also capture: src=... type=module order
  const moduleScriptRegex2 = /<script[^>]+src=["']([^"']+)["'][^>]+type=["']module["'][^>]*>/gi;
  let ms2Match: RegExpExecArray | null;
  while ((ms2Match = moduleScriptRegex2.exec(bodyHtml)) !== null) {
    const src = ms2Match[1].startsWith("/") ? ms2Match[1] : "/" + ms2Match[1];
    if (!moduleScripts.includes(src)) moduleScripts.push(src);
  }

  // ── 5. Extract async/defer <script src=...> (not module) ─────────────
  const asyncScripts: string[] = [];
  const asyncScriptRegex =
    /<script(?![^>]*type=["']module["'])[^>]+src=["']([^"']+)["'][^>]*(async|defer)[^>]*>/gi;
  let asMatch: RegExpExecArray | null;
  while ((asMatch = asyncScriptRegex.exec(bodyHtml)) !== null) {
    asyncScripts.push(asMatch[1].startsWith("/") ? asMatch[1] : "/" + asMatch[1]);
  }

  // ── 6. Extract inline scripts ─────────────────────────────────────────
  const inlineScripts: string[] = [];
  const inlineScriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let isMatch: RegExpExecArray | null;
  while ((isMatch = inlineScriptRegex.exec(bodyHtml)) !== null) {
    const content = isMatch[1].trim();
    if (content) inlineScripts.push(content);
  }

  // ── 7. Strip ALL <script> tags from bodyHtml (injected separately) ────
  bodyHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // ── 8. Hide Framer badge & specific floating badge containers ─────────
  css += `
    #__framer-badge-container,
    .framer-3ek784-container,
    .framer-lpe29j-container {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  `;

  return { css, bodyHtml, bodyClass, moduleScripts, asyncScripts, inlineScripts };
}
