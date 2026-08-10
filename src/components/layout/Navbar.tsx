"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blogs", href: "/blogs" },
  { label: "Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[rgba(0,2,15,0.85)] backdrop-blur-xl border-b border-[rgb(19,24,57)]"
            : "bg-transparent"
          }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/0RVP3HSTOxbLQpHFYKd8UstCPQ.2fa88.svg"
                alt="DigiMoga Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span
                className="text-white font-semibold text-lg font-inter-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                DigiMoga
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 font-inter-tight ${isActive
                        ? "text-white"
                        : "text-[rgb(167,173,190)] hover:text-white"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[rgb(14,18,46)] border border-[rgb(28,35,84)] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/waitlist"
                className="px-5 py-2.5 text-sm font-medium font-inter-tight text-white bg-[rgb(0,59,255)] rounded-full hover:bg-[rgb(25,78,255)] transition-all duration-200 hover:scale-[1.03] shadow-[0_0_20px_rgba(0,59,255,0.3)]"
              >
                Join Waitlist
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white block transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-5 h-0.5 bg-white block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white block transition-all"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[rgb(0,3,25)] border-l border-[rgb(19,24,57)] z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgb(19,24,57)]">
                <span className="text-white font-semibold text-lg font-inter-tight">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-2 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium font-inter-tight transition-all ${isActive
                            ? "bg-[rgb(14,18,46)] text-white border border-[rgb(28,35,84)]"
                            : "text-[rgb(167,173,190)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                          }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-[rgb(19,24,57)]">
                <Link
                  href="/waitlist"
                  className="block w-full px-5 py-3 text-sm font-medium font-inter-tight text-white bg-[rgb(0,59,255)] rounded-full hover:bg-[rgb(25,78,255)] transition-all text-center"
                >
                  Join Waitlist
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
