import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We begin by deeply understanding your business, goals, and audience. Through research and workshops, we define a clear strategic direction that guides every decision.",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description:
      "Our designers craft pixel-perfect mockups and interactive prototypes. We iterate quickly, ensuring every visual detail aligns with your brand and user expectations.",
  },
  {
    number: "03",
    title: "Development & Build",
    description:
      "Engineering excellence meets design vision. We build scalable, performant solutions using modern frameworks with clean, maintainable code.",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description:
      "After rigorous QA testing, we deploy your project and monitor performance. We continuously optimize based on real user data and feedback.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,2,15)]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
            How We Work
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Our proven
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              process
            </span>
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[rgb(28,35,84)] to-transparent hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.12}>
                <div
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Number bubble (center connector) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[rgb(0,2,15)] border-2 border-[rgb(0,59,255)] items-center justify-center z-10 shrink-0">
                    <span className="text-[rgb(0,59,255)] text-xs font-medium font-inter-tight">
                      {step.number}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-[rgb(19,24,57)] bg-[rgb(10,12,30)] hover:border-[rgb(28,35,84)] transition-colors ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    {/* Mobile number */}
                    <span className="md:hidden inline-block text-[rgb(0,59,255)] text-xs font-medium font-inter-tight mb-3 bg-[rgba(0,59,255,0.1)] px-3 py-1 rounded-full border border-[rgba(0,59,255,0.2)]">
                      {step.number}
                    </span>
                    <h3
                      className="text-white font-medium text-xl font-inter-tight mb-3"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
