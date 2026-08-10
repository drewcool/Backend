"use client";

import dynamic from "next/dynamic";
import { AriesPageData } from "@/lib/getAriesPage";

const TemplateRenderer = dynamic(() => import("./TemplateRenderer"), {
  ssr: false,
});

export default function ClientTemplateRenderer(props: AriesPageData) {
  return <TemplateRenderer {...props} />;
}
