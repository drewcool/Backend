import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function WaitlistPage() {
  const data = getAriesPage("waitlist.html");
  return <ClientTemplateRenderer {...data} />;
}
