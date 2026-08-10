import { getAriesPage } from "@/lib/getAriesPage";
import ClientTemplateRenderer from "@/components/ClientTemplateRenderer";

export default function PrivacyPolicyPage() {
  const data = getAriesPage("privacy-policy.html");
  return <ClientTemplateRenderer {...data} />;
}
