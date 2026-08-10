"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const floatingBadges = [
  {
    id: 1,
    text: "150+ Projects",
    icon: "✦",
    style: { top: "12%", left: "2%" },
    delay: 0.2,
  },
  {
    id: 2,
    text: "Award Winning",
    icon: "★",
    style: { top: "20%", right: "4%" },
    delay: 0.4,
  },
  {
    id: 3,
    text: "5★ Rated",
    icon: "◆",
    style: { bottom: "22%", left: "3%" },
    delay: 0.6,
  },
  {
    id: 4,
    text: "Global Reach",
    icon: "◉",
    style: { bottom: "30%", right: "5%" },
    delay: 0.8,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[rgb(0,2,15)]">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgb(0,59,255) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/2 left-[-15%] w-[500px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, rgb(51,98,255) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/3 right-[-10%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, rgb(102,137,255) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(0,59,255) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0,59,255) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating Badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.id}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(14,18,46,0.9)] border border-[rgb(28,35,84)] backdrop-blur-sm"
          style={badge.style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: badge.delay + 0.8 },
            scale: { duration: 0.5, delay: badge.delay + 0.8 },
            y: {
              duration: 3 + badge.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            },
          }}
        >
          <span className="text-[rgb(0,59,255)] text-xs">{badge.icon}</span>
          <span className="text-white text-xs font-medium font-inter-tight whitespace-nowrap">
            {badge.text}
          </span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="section-container relative z-10 pt-32 pb-20 text-center">
        {/* Tag line badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,59,255,0.15)] border border-[rgba(0,59,255,0.3)] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(0,59,255)] animate-pulse" />
          <span className="text-[rgb(102,137,255)] text-xs font-medium font-inter-tight tracking-widest uppercase">
            Creative Agency Template
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight text-white font-inter-tight mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          We craft digital
          <br />
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            experiences
          </span>
          <br />
          that matter
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-xl mx-auto text-[rgb(109,119,146)] text-base md:text-lg leading-relaxed font-inter-tight mb-10"
        >
          Elevate your agency&rsquo;s online presence with DigiMoga — a meticulously crafted template
          for creative agencies. Showcase projects and impress clients.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/works"
            className="px-8 py-4 text-sm font-medium font-inter-tight text-white bg-[rgb(0,59,255)] rounded-full hover:bg-[rgb(25,78,255)] transition-all duration-200 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,59,255,0.4)] flex items-center gap-2"
          >
            View Our Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 text-sm font-medium font-inter-tight text-white border border-[rgb(28,35,84)] rounded-full hover:border-[rgb(0,59,255)] hover:bg-[rgba(0,59,255,0.1)] transition-all duration-200 hover:scale-[1.03]"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-16 pt-10 border-t border-[rgb(19,24,57)]"
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "12+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-medium text-white font-inter-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </p>
              <p className="text-[rgb(109,119,146)] text-sm mt-1 font-inter-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[rgb(28,35,84)] shadow-[0_0_60px_rgba(0,59,255,0.15)]">
            <Image
              src="/images/C8iXhZOAtTSW3ZP6tIsYg6xPIlU.2fa88.png"
              alt="DigiMoga Agency Hero"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0,2,15)] via-transparent to-transparent opacity-40" />
          </div>

          {/* Glow under image */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[rgb(0,59,255)] opacity-20 blur-[40px]" />
        </motion.div>
      </div>
    </section>
  );
}
