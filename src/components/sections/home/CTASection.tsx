import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,3,25)]">
      <div className="section-container">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-[rgb(28,35,84)]">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(0,59,255,0.25) 0%, rgba(0,2,15,0.95) 70%)",
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgb(0,59,255) 1px, transparent 1px),
                  linear-gradient(90deg, rgb(0,59,255) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Glowing orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[rgb(0,59,255)] opacity-10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-[rgb(51,98,255)] opacity-8 blur-[60px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-4">
                Ready to Start?
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Let&rsquo;s build something
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  remarkable together
                </span>
              </h2>
              <p className="max-w-lg mx-auto text-[rgb(109,119,146)] text-base leading-relaxed font-inter-tight mb-10">
                Join the growing list of forward-thinking companies who trust DigiMoga to bring their
                digital vision to life.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 text-sm font-medium font-inter-tight text-white bg-[rgb(0,59,255)] rounded-full hover:bg-[rgb(25,78,255)] transition-all duration-200 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,59,255,0.4)] flex items-center gap-2"
                >
                  Start a Project
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
                  href="/waitlist"
                  className="px-8 py-4 text-sm font-medium font-inter-tight text-white border border-[rgb(28,35,84)] rounded-full hover:border-[rgb(0,59,255)] hover:bg-[rgba(0,59,255,0.1)] transition-all duration-200 hover:scale-[1.03]"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
