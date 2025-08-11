export const metadata = {
  title: "Page Title | Lyyli.ai",
  description: "One sentence that actually says something.",
  alternates: { canonical: "/route" },
  openGraph: { title: "Page Title | Lyyli.ai", description: "..." },
};

export default function Page() {
  return (
    <main className="min-h-dvh">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-playfair text-4xl md:text-5xl">Page Title</h1>
        <p className="mt-6 text-base">Intro copy in Inter.</p>
      </section>
    </main>
  );
}
