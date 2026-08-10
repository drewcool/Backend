"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

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
    let rafId: number;

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

  // Lock the Next.js parent body scroll ONLY when rendering the Framer Template
  useEffect(() => {
    document.body.classList.add('framer-page-lock');
    return () => {
      document.body.classList.remove('framer-page-lock');
    };
  }, []);

  useEffect(() => {
    
    const surgicalScript = `
      const applySurgicalCleans = () => {
        // 1. Remove Figma/Digimoga badges natively
        document.querySelectorAll(".framer-3ek784-container, .framer-lpe29j-container, #__framer-badge-container").forEach(el => el.remove());
        
        // 2. Swap all logo instances safely
        const logoImgs = document.querySelectorAll('img[src*="PNBw6IRBeTzFMheULCykzniB9Q"], img[src*="0RVP3HSTOxbLQpHFYKd8UstCPQ"], img[src*="j07dUDNi3R7s1hBgf9y7iH3NCA"], img[alt="Logo"], [data-framer-name="Logo"] img');
        logoImgs.forEach((img) => {
          if (!img.src.includes("/Logo.png")) {
            // Lock exact dimensions to prevent Framer Motion Ticker from freezing and keep Logo the correct size!
            if (!img.style.width) {
              const rect = img.getBoundingClientRect();
              if (rect.width > 0) {
                img.style.width = rect.width + "px";
                img.style.height = rect.height + "px";
              }
            }
            img.src = "/Logo.png";
            if (img.srcset) img.srcset = "/Logo.png";
          }
        });

        // 3. Update Footer strings
        const textNodes = document.querySelectorAll("p, span, div, a");
        textNodes.forEach((el) => {
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

      // Wait 1000ms for Framer React Hydration to complete to absolutely prevent Error 422!
      setTimeout(() => {
        applySurgicalCleans();
        
        // KICKSTART CHROME'S INTERNAL OBSERVER INSIDE THE IFRAME
        window.dispatchEvent(new Event('resize')); 
        
        // Run continuously to fight Framer React Hydration overwrites inside the Ticker
        const observer = new MutationObserver(applySurgicalCleans);
        observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
      }, 1000);

      // 4. Intercept clicks to route through the parent Next.js router
      document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a && a.href && !a.href.startsWith("javascript:") && a.target !== "_blank") {
          e.preventDefault();
          window.parent.location.href = a.href;
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
          </style>

          <!-- 🛑 THE NUCLEAR FIX: Hijack Chrome's Visibility and Observer APIs -->
          <script>
            // 1. Force Framer to think the tab is always active
            Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
            Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
            
            // 2. Hijack IntersectionObserver to ALWAYS report elements as fully on-screen
            const OriginalObserver = window.IntersectionObserver;
            window.IntersectionObserver = class HijackedObserver {
              constructor(callback, options) {
                this.observer = new OriginalObserver((entries, obs) => {
                  entries.forEach(entry => {
                    Object.defineProperty(entry, 'isIntersecting', { value: true });
                    Object.defineProperty(entry, 'intersectionRatio', { value: 1 });
                  });
                  callback(entries, obs);
                }, options);
              }
              observe(target) { this.observer.observe(target); }
              unobserve(target) { this.observer.unobserve(target); }
              disconnect() { this.observer.disconnect(); }
            };
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
