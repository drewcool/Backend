import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";

const services = [
  {
    icon: "/images/EsPf5xDkIVTXAJkHR03G5V7QU.2fa88.svg",
    title: "Brand Strategy",
    description:
      "We build cohesive brand identities that communicate your core values and connect deeply with your audience.",
    tag: "Strategy",
  },
  {
    icon: "/images/AdPfwI4laWSMfyInnvNTBjrcR0.2fa88.svg",
    title: "Digital Design",
    description:
      "From interfaces to motion graphics, our designs turn complex ideas into beautiful, intuitive experiences.",
    tag: "Design",
  },
  {
    icon: "/images/Ei66cGLo9dgdPPkUwJ4SDT6ierU.2fa88.svg",
    title: "Web Development",
    description:
      "We build performant, scalable web applications and marketing sites using cutting-edge technology.",
    tag: "Development",
  },
  {
    icon: "/images/nHD8uAANbtAqeP5nyPmt3TqgEQ.2fa88.svg",
    title: "Motion & Animation",
    description:
      "Bring your brand to life with purposeful animations that engage users and enhance storytelling.",
    tag: "Motion",
  },
  {
    icon: "/images/q8PCK0iIVKHMPnxvnPcndYxbRHo.2fa88.svg",
    title: "UX Research",
    description:
      "Data-driven insights that inform design decisions, ensuring every choice is backed by user reality.",
    tag: "Research",
  },
  {
    icon: "/images/Pl7lVMFgE2fw0SJ7QVYa9taxO8g.2fa88.svg",
    title: "Growth Marketing",
    description:
      "Strategic campaigns that reach the right audiences and convert visitors into loyal advocates.",
    tag: "Marketing",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,2,15)]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
            What We Do
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Services that drive
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              real results
            </span>
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.08}>
              <div className="group relative p-6 rounded-2xl border border-[rgb(19,24,57)] bg-[rgb(10,12,30)] hover:border-[rgb(0,59,255)] hover:bg-[rgb(14,18,46)] transition-all duration-300 glow-hover h-full">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,59,255,0.1)] border border-[rgba(0,59,255,0.2)] flex items-center justify-center mb-4">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain filter brightness-0 invert opacity-80"
                  />
                </div>

                {/* Tag */}
                <span className="inline-block text-[10px] uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-2">
                  {service.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-white font-medium text-lg font-inter-tight mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1.5 text-[rgb(87,95,117)] group-hover:text-[rgb(0,59,255)] transition-colors text-xs font-inter-tight">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
