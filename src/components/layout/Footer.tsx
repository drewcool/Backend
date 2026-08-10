import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Blogs", href: "/blogs" },
    { label: "Timeline", href: "/timeline" },
    { label: "Contact", href: "/contact" },
    { label: "Waitlist", href: "/waitlist" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  Social: [
    { label: "Twitter / X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgb(19,24,57)] bg-[rgb(0,2,15)] overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(0,59,255) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0,59,255) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-150 h-75 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/0RVP3HSTOxbLQpHFYKd8UstCPQ.2fa88.svg"
                alt="DigiMoga Logo"
                width={32}
                height={32}
              />
              <span className="text-white font-semibold text-lg font-inter-tight">DigiMoga</span>
            </Link>
            <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight max-w-xs">
              A premier creative agency template built for modern digital experiences. Stand out with
              a sleek, professional presence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  label: "Twitter",
                  icon: (
                    <path
                      d="M4 4l5.5 7L4 18h1.5l4.75-5.5L14.5 18H18l-5.75-7.5L17.5 4H16l-4.25 5-4-5H4z"
                      fill="currentColor"
                    />
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <path
                      d="M6.5 8.5h-3v9h3v-9zM5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM17.5 17.5h-3v-4.5c0-1-.5-1.5-1.5-1.5s-1.5.5-1.5 1.5v4.5h-3v-9h3v1.25C11.5 9 12.5 8.5 14 8.5c2 0 3.5 1.5 3.5 4v4.5z"
                      fill="currentColor"
                    />
                  ),
                },
                {
                  label: "GitHub",
                  icon: (
                    <path
                      d="M10 2a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.32c-2.23.48-2.7-1.07-2.7-1.07-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.97 0-.88.31-1.6.83-2.16-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82A7.64 7.64 0 0110 7.4c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.16 0 3.09-1.88 3.77-3.67 3.97.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8 8 0 0010 2z"
                      fill="currentColor"
                    />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-[rgb(28,35,84)] flex items-center justify-center text-[rgb(109,119,146)] hover:text-white hover:border-[rgb(0,59,255)] transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-medium text-sm mb-4 font-inter-tight">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[rgb(109,119,146)] text-sm hover:text-white transition-colors font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgb(19,24,57)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[rgb(87,95,117)] text-sm font-inter-tight">
            © {new Date().getFullYear()} DigiMoga Agency. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-[rgb(87,95,117)] text-sm hover:text-white transition-colors font-inter-tight"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
