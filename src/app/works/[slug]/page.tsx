import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export function generateStaticParams() {
  return [
    { slug: "genius-saas-landing-page" },
    { slug: "sap-saas-website-template" },
    { slug: "clever-agency-website" },
    { slug: "pix-portfolio-landing-page" },
    { slug: "waitlisty-waitlist-landing-page" },
    { slug: "waitlista-waitlist-landing-page" },
  ];
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getAriesPage(`works/${slug}.html`);
  return <ClientTemplateRenderer {...data} />;
}
