import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiMoga — Premier Agency Landing Page Template",
  description:
    "Elevate your agency's online presence with DigiMoga, a meticulously crafted Framer template for creative agencies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
