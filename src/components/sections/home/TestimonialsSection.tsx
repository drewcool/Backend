import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "DigiMoga completely transformed how we present ourselves online. The attention to detail in the design is unmatched — our conversion rate jumped 40% after launch.",
    name: "Sarah Mitchell",
    role: "CEO, TechFlow Startup",
    avatar: "/images/R3a6qleEu0SSBPYhilnNMnz4n5k.2fa88.jpg",
    rating: 5,
  },
  {
    quote:
      "Working with the DigiMoga team felt like having an internal design department. They understood our brand vision immediately and executed it flawlessly.",
    name: "Marcus Chen",
    role: "Founder, Quantum Labs",
    avatar: "/images/FeUox1vTy9XE506zYzzjGi3oc.2fa88.jpg",
    rating: 5,
  },
  {
    quote:
      "The motion design and interactive elements are simply stunning. Our clients constantly compliment how professional and premium our website looks.",
    name: "Priya Ramanathan",
    role: "Head of Marketing, Nexus Digital",
    avatar: "/images/OZxzbuLUwmx4OlRvzBwNGEUVc.2fa88.png",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,3,25)]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
            Testimonials
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            What clients
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              are saying
            </span>
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="group p-6 rounded-2xl border border-[rgb(19,24,57)] bg-[rgb(10,12,30)] hover:border-[rgb(28,35,84)] hover:bg-[rgb(14,18,46)] transition-all duration-300 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1l1.545 3.09L12 4.635l-2.5 2.433.59 3.432L7 8.755l-3.09 1.745L4.5 7.068 2 4.635l3.455-.545L7 1z"
                        fill="rgb(0,59,255)"
                      />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[rgb(167,173,190)] text-sm leading-relaxed font-inter-tight flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[rgb(28,35,84)] flex-shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium font-inter-tight">{t.name}</p>
                    <p className="text-[rgb(87,95,117)] text-xs font-inter-tight">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
