"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const faqs = [
  {
    question: "What types of projects does DigiMoga specialize in?",
    answer:
      "We specialize in brand strategy, digital design, web development, motion design, UX research, and growth marketing. Our multidisciplinary team handles end-to-end projects for startups, scaleups, and enterprise clients.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. A typical brand identity project takes 4–6 weeks, while full web builds run 8–16 weeks. We provide detailed timelines during our discovery phase.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. We work with clients globally and have teams across multiple time zones. Our async-first workflow ensures seamless collaboration regardless of location.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "We offer both project-based and retainer pricing depending on your needs. Project pricing is scoped after our discovery call, while retainers provide ongoing dedicated bandwidth.",
  },
  {
    question: "Can I see more examples of your work?",
    answer:
      "Yes! Visit our Works page for a curated collection of recent projects. We're also happy to share case studies and references relevant to your industry upon request.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "We provide 30 days of post-launch support included with every project. We also offer optional ongoing maintenance plans, performance optimization, and iteration sprints.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[rgb(0,2,15)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <AnimatedSection>
            <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl font-medium text-white font-inter-tight leading-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Frequently asked
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                questions
              </span>
            </h2>
            <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight max-w-sm">
              Got questions? We&rsquo;ve got answers. If you don&rsquo;t find what you&rsquo;re
              looking for, feel free to reach out directly.
            </p>
          </AnimatedSection>

          {/* Right: Accordion */}
          <AnimatedSection direction="left">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className="border border-[rgb(19,24,57)] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[rgb(28,35,84)]"
                >
                  <button
                    id={`faq-${i}`}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span
                      className="text-white text-sm font-medium font-inter-tight pr-4"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-6 h-6 rounded-full border border-[rgb(28,35,84)] flex items-center justify-center text-[rgb(109,119,146)]"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M6 2v8M2 6h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="px-5 pb-5">
                          <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
