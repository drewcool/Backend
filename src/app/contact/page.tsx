import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function ContactPage() {
  const data = getAriesPage("contact.html");
  return <ClientTemplateRenderer {...data} />;
}
