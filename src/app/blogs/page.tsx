import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function BlogsPage() {
  const data = getAriesPage("blogs.html");
  return <ClientTemplateRenderer {...data} />;
}
