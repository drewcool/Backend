import Image from "next/image";

const logos = [
  { src: "/Logo.png", alt: "DigiMoga" },
  { src: "/images/UaNueSPHaU4uAnBboSMnR7WEc8.2fa88.svg", alt: "Partner 2" },
  { src: "/images/AdPfwI4laWSMfyInnvNTBjrcR0.2fa88.svg", alt: "Partner 3" },
  { src: "/images/jdzexwVUUG0v9Tn88L57oI3V28w.2fa88.svg", alt: "Partner 4" },
  { src: "/images/dGO7W1b7kAcYFMMZtWk6Qz0N4Zw.2fa88.svg", alt: "Partner 5" },
  { src: "/images/AlUU80ePWWBn9KNSPihCaYtCBJY.2fa88.svg", alt: "Partner 6" },
  { src: "/images/L7CpEUs0IRH6OiJichMUMCK5g.2fa88.svg", alt: "Partner 7" },
  { src: "/images/Q7jYdegm6ose91yjy9ffKEkCqs.2fa88.svg", alt: "Partner 8" },
];

export default function LogoMarquee() {
  return (
    <section className="py-14 border-y border-[rgb(19,24,57)] bg-[rgb(0,3,25)] overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-[rgb(87,95,117)] font-inter-tight mb-8">
        Trusted by forward-thinking companies
      </p>

      <div className="marquee-container">
        <div className="marquee-track">
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="shrink-0 mx-10 flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={32}
                className="h-7 w-auto object-contain filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
