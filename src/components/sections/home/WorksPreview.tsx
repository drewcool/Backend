"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const works = [
  {
    slug: "clever-agency-website",
    title: "Clever Agency Website",
    category: "Web Design",
    image: "/images/MIzYyZDtkQR2vF30r6pG3uFj8GM.2fa88.png",
    tags: ["Branding", "Web"],
  },
  {
    slug: "genius-saas-landing-page",
    title: "Genius SaaS Landing Page",
    category: "UI/UX Design",
    image: "/images/WtqxqF0rU8Wuwz43erARYa8rL8.2fa88.png",
    tags: ["SaaS", "Landing Page"],
  },
  {
    slug: "pix-portfolio-landing-page",
    title: "Pix Portfolio Landing Page",
    category: "Portfolio Design",
    image: "/images/R289l0Udmrse6n7IgsDFzZTX7FY.2fa88.png",
    tags: ["Portfolio", "Design"],
  },
  {
    slug: "sap-saas-website-template",
    title: "SAP SaaS Website Template",
    category: "SaaS Design",
    image: "/images/aoWeUd6Z5b0pFEysKgqvrxwTY.2fa88.png",
    tags: ["SaaS", "Template"],
  },
];

export default function WorksPreview() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,3,25)]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
              Our Work
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Featured
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                projects
              </span>
            </h2>
          </div>
          <Link
            href="/works"
            className="flex items-center gap-2 text-sm font-medium font-inter-tight text-[rgb(167,173,190)] hover:text-white transition-colors border border-[rgb(28,35,84)] px-4 py-2.5 rounded-full hover:border-[rgb(0,59,255)] hover:bg-[rgba(0,59,255,0.05)] shrink-0"
          >
            View All Works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {works.map((work, i) => (
            <AnimatedSection key={work.slug} delay={i * 0.1}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden border border-[rgb(19,24,57)] bg-[rgb(10,12,30)] cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href={`/works/${work.slug}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-4/3">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[rgb(10,12,30)] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Hover reveal: View Project */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="px-5 py-2.5 rounded-full bg-white text-[rgb(0,2,15)] text-sm font-medium font-inter-tight">
                        View Project
                      </span>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="text-white font-medium text-lg font-inter-tight group-hover:text-[rgb(102,137,255)] transition-colors"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {work.title}
                    </h3>
                    <p className="text-[rgb(87,95,117)] text-sm mt-1 font-inter-tight">
                      {work.category}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
