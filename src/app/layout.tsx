import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Lyyli.ai - AI Communication Assistant",
  description: "Redirecting to localized version...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={fontVars}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
