import type { Metadata } from "next";

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
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
