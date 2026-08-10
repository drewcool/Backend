import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function HomePage() {
  const data = getAriesPage("index.html");
  return <ClientTemplateRenderer {...data} />;
}
