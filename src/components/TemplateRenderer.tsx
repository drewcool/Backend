"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { useLenis } from "lenis/react";

interface Props {
  css: string;
  bodyHtml: string;
  bodyClass: string;
  moduleScripts: string[];
  asyncScripts: string[];
  inlineScripts: string[];
}

export default function TemplateRenderer({
  css,
  bodyHtml,
  bodyClass,
  moduleScripts,
  asyncScripts,
  inlineScripts,
}: Props) {
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize Lenis from npm for the iframe's scroll context
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let lenis: Lenis;

    const initLenis = () => {
      const cw = iframe.contentWindow;
      const cd = iframe.contentDocument;
      if (!cw || !cd) return;

      lenis = new Lenis({
        wrapper: cd.documentElement,
        content: cd.body,
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    iframe.addEventListener("load", initLenis);

    return () => {
      iframe.removeEventListener("load", initLenis);
      if (lenis) lenis.destroy();
    };
  }, [iframeSrcDoc]);

  // Stop the parent (Next.js root) Lenis RAF while the iframe is active.
  // Without this, two separate RAF animation loops run simultaneously:
  // one for the locked parent body (doing nothing useful) and one inside
  // the iframe — wasting CPU on every single frame.
  const parentLenis = useLenis();
  useEffect(() => {
    if (!parentLenis) return;
    parentLenis.stop();
    return () => { parentLenis.start(); };
  }, [parentLenis]);

  // Lock the Next.js parent body scroll ONLY when rendering the Framer Template
  useEffect(() => {
    document.body.classList.add('framer-page-lock');
    return () => {
      document.body.classList.remove('framer-page-lock');
    };
  }, []);

  useEffect(() => {
    
    const surgicalScript = `
      // ── LOGO GUARDIAN (zero-delay, starts immediately) ─────────────────────
      // MutationObserver watching ONLY src/srcset attributes.
      // MutationObserver callbacks are microtasks — they fire between JS operations,
      // BEFORE the browser paints the next frame. So when Framer hydration overwrites
      // img.src with the Aries hash, we revert it in the same frame. The browser
      // never renders the Aries logo — eliminating the 1-frame disappear blink.

      const ARIES_HASHES = ["PNBw6IRBeTzFMheULCykzniB9Q", "0RVP3HSTOxbLQpHFYKd8UstCPQ", "j07dUDNi3R7s1hBgf9y7iH3NCA", "gej9Vnua3h6ntvlEXMy8d6WLLnM", "3p0IlyunupDBI3v4BHnlGEV03Gw"];
      const isAriesLogoSrc = (val) => val && ARIES_HASHES.some(h => val.includes(h));

      const swapToDigiLogo = (img) => {
        if (!img.style.width) {
          const rect = img.getBoundingClientRect();
          if (rect.width > 0) {
            img.style.width = rect.width + "px";
            img.style.height = rect.height + "px";
          }
        }
        img.src = "/Logo.png";
        if (img.hasAttribute("srcset")) {
          img.removeAttribute("srcset");
        }
      };

      // Initial pass — catch anything that slipped through server-side replacement
      document.querySelectorAll("img").forEach(img => {
        if (isAriesLogoSrc(img.getAttribute("src")) || isAriesLogoSrc(img.getAttribute("srcset"))) {
          swapToDigiLogo(img);
        }
      });

      // Watch ONLY src/srcset attributes — extremely cheap, zero impact on scroll performance.
      // attributeFilter limits to exactly these two attributes; no childList, no subtree text scan.
      const logoGuardian = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.type === "attributes") {
            const img = m.target;
            if (isAriesLogoSrc(img.getAttribute("src")) || isAriesLogoSrc(img.getAttribute("srcset"))) {
              swapToDigiLogo(img);
            }
          }
        });
      });

      logoGuardian.observe(document.documentElement, {
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"]   // Only these two — ignores all other mutations
      });

      // Disconnect after Framer hydration fully settles
      setTimeout(() => logoGuardian.disconnect(), 10000);

      // ── DEBOUNCE UTILITY ────────────────────────────────────────────────────
      function debounce(fn, wait) {
        let t;
        return function() { clearTimeout(t); t = setTimeout(fn, wait); };
      }

      // ── BADGE + TEXT CLEANUP (1000ms delay to avoid Framer Error 422) ───────
      // Logo swapping is handled by the guardian above — this section only
      // handles badge removal and one-time footer text cleanup.

      const removeBadges = () => {
        document.querySelectorAll(".framer-3ek784-container, .framer-lpe29j-container, #__framer-badge-container").forEach(el => el.remove());
      };

      const applyTextCleans = () => {
        document.querySelectorAll("p, span, div, a").forEach((el) => {
          if (el.children.length === 0) {
            const txt = el.textContent;
            if (txt && (txt.includes("Template By Digimoga") || txt.includes("Template by Digimoga"))) {
              el.textContent = txt.replace(/Template [bB]y Digimoga/gi, "").trim();
            }
            if (txt && txt.includes("@2024")) {
              el.textContent = txt.replace(/@2024/g, "@2026");
            }
          }
        });
      };

      setTimeout(() => {
        removeBadges();
        applyTextCleans();

        window.dispatchEvent(new Event("resize"));

        // Badge removal re-runs for 10s to fight Framer hydration re-inserts
        const debouncedBadge = debounce(removeBadges, 500);
        const badgeObserver = new MutationObserver(debouncedBadge);
        badgeObserver.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => badgeObserver.disconnect(), 10000);
      }, 1000);

      // Intercept clicks to route through the parent Next.js router
      document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a && a.href && !a.href.startsWith("javascript:") && a.target !== "_blank") {
          e.preventDefault();
          let targetUrl = a.href;
          
          // Fix .html extensions for Next.js routing (e.g. index.html -> /, blogs.html -> /blogs)
          try {
            const urlObj = new URL(targetUrl);
            if (urlObj.origin === window.parent.location.origin) {
              if (urlObj.pathname.endsWith("index.html")) {
                urlObj.pathname = urlObj.pathname.replace(/index\.html$/, "");
              } else if (urlObj.pathname.endsWith(".html")) {
                urlObj.pathname = urlObj.pathname.replace(/\.html$/, "");
              }
              targetUrl = urlObj.pathname + urlObj.search + urlObj.hash;
            }
          } catch (err) {}
          
          window.parent.location.href = targetUrl;
        }
      });
    `;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${css}
            #__framer-badge-container, .framer-3ek784-container, .framer-lpe29j-container {
              display: none !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            /* Hide all Praha and Figma badges perfectly via CSS */
            a[href*="figma.com"],
            a[href*="prah"],
            a[href*="lemonsqueezy.com"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              position: absolute !important;
            }
            body { margin: 0; padding: 0; overflow-x: hidden; background-color: #000; }
            /* Hide iframe scrollbar for seamless embedding */
            ::-webkit-scrollbar { width: 0px; background: transparent; }
            /* Instantly hide ALL Arise logo images the moment the iframe loads.
               Covers all 5 known hashes: 3 main/navbar + 2 footer logos.
               Once img.src is replaced with /Logo.png, these selectors stop matching. */
            img[src*="PNBw6IRBeTzFMheULCykzniB9Q"],
            img[src*="0RVP3HSTOxbLQpHFYKd8UstCPQ"],
            img[src*="j07dUDNi3R7s1hBgf9y7iH3NCA"],
            img[src*="gej9Vnua3h6ntvlEXMy8d6WLLnM"],
            img[src*="3p0IlyunupDBI3v4BHnlGEV03Gw"] {
              opacity: 0 !important;
            }
          </style>

          <script>
            // Keep Framer animations running even when the browser tab is not focused.
            // Safe: only overrides the visibility state, does not affect scroll or IntersectionObserver.
            Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
            Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
          </script>
          
          ${inlineScripts.map(code => `<script>${code}</script>`).join("\n")}
        </head>
        <body class="${bodyClass}">
          ${bodyHtml}
          
          <script>${surgicalScript}</script>

          ${asyncScripts.map(src => `<script src="${src}" async></script>`).join("\n")}
          ${moduleScripts.map(src => `<script src="${src}" type="module"></script>`).join("\n")}
        </body>
      </html>
    `;
    setIframeSrcDoc(html);
  }, [css, bodyHtml, bodyClass, inlineScripts, asyncScripts, moduleScripts]);

  if (!iframeSrcDoc) {
    return <div style={{ width: "100%", height: "100vh", backgroundColor: "#000" }} />;
  }

  return (
    <iframe
      ref={iframeRef}
      className="framer-template-renderer"
      srcDoc={iframeSrcDoc}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
        margin: 0,
        padding: 0,
      }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation allow-top-navigation"
      scrolling="yes"
      title="Digimoga Framer Template"
      suppressHydrationWarning
    />
  );
}
