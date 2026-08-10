import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function WorksPage() {
  const data = getAriesPage("works.html");
  return <ClientTemplateRenderer {...data} />;
}
