import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export function generateStaticParams() {
  return [
    { slug: "the-power-of-storytelling-and-visual-elements-in-branding" },
    { slug: "innovative-web-design-techniques-for-modern-brands" },
    { slug: "user-centric-product-design-a-complete-guide-from-scratch" },
  ];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getAriesPage(`blogs/${slug}.html`);
  return <ClientTemplateRenderer {...data} />;
}
