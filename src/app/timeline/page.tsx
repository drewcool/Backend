import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function TimelinePage() {
  const data = getAriesPage("timeline.html");
  return <ClientTemplateRenderer {...data} />;
}
