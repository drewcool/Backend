import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const blogs = [
  {
    slug: "innovative-web-design-techniques-for-modern-brands",
    title: "Innovative Web Design Techniques for Modern Brands",
    excerpt:
      "Explore the latest web design techniques that help modern brands create compelling digital experiences that convert and retain users.",
    image: "/images/K4RSIDNhn9AgA53SQSF1C1yGthQ.2fa88.jpg",
    category: "Design",
    date: "Dec 12, 2024",
    readTime: "5 min read",
  },
  {
    slug: "the-power-of-storytelling-and-visual-elements-in-branding",
    title: "The Power of Storytelling and Visual Elements in Branding",
    excerpt:
      "How strategic storytelling combined with compelling visuals creates brand narratives that deeply resonate with target audiences.",
    image: "/images/AEQsSeVPixzYhU78dju9zvJ7I.2fa88.jpg",
    category: "Branding",
    date: "Nov 28, 2024",
    readTime: "7 min read",
  },
  {
    slug: "user-centric-product-design-a-complete-guide-from-scratch",
    title: "User-Centric Product Design: A Complete Guide from Scratch",
    excerpt:
      "A comprehensive framework for building products that users love — from initial research through iteration and launch.",
    image: "/images/PzR3VF3ouFX4nrjkQndYr0.2fa88.jpg",
    category: "UX/UI",
    date: "Nov 15, 2024",
    readTime: "9 min read",
  },
];

export default function BlogsPreview() {
  return (
    <section className="py-24 md:py-32 bg-[rgb(0,2,15)]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight mb-3">
              Insights
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-inter-tight leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Latest from
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fff 30%, rgb(102,137,255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the blog
              </span>
            </h2>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm font-medium font-inter-tight text-[rgb(167,173,190)] hover:text-white transition-colors border border-[rgb(28,35,84)] px-4 py-2.5 rounded-full hover:border-[rgb(0,59,255)] hover:bg-[rgba(0,59,255,0.05)] flex-shrink-0"
          >
            View All Posts
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogs.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blogs/${post.slug}`} className="group block">
                <div className="rounded-2xl border border-[rgb(19,24,57)] overflow-hidden bg-[rgb(10,12,30)] hover:border-[rgb(28,35,84)] transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[rgb(0,59,255)] font-inter-tight">
                        {post.category}
                      </span>
                      <span className="text-[rgb(87,95,117)] text-xs">·</span>
                      <span className="text-[rgb(87,95,117)] text-xs font-inter-tight">{post.readTime}</span>
                    </div>
                    <h3
                      className="text-white text-base font-medium font-inter-tight leading-snug mb-2 group-hover:text-[rgb(102,137,255)] transition-colors"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[rgb(109,119,146)] text-sm leading-relaxed font-inter-tight line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-[rgb(87,95,117)] text-xs font-inter-tight mt-4">{post.date}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
