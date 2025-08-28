import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // Simplified static params for now
  return [
    { locale: 'en', slug: 'sample' },
    { locale: 'fi', slug: 'sample' }
  ];
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  return {
    title: `Blog Post - ${slug}`,
    description: "Blog post content will be available soon.",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  return (
    <article className="bg-white">
      <header className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-8">
          <a
            href={`/${locale}/blog`}
            className="inline-flex items-center text-forest-green hover:text-muted-turquoise transition-colors"
          >
            ← Back to Blog
          </a>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4">
            Blog Post: {slug}
          </h1>
          <p className="text-lg text-mediumGray mb-6">
            This blog post content will be available soon. We're working on restoring the full functionality.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="prose prose-lg max-w-none">
          <p>
            Content coming soon. This is a temporary placeholder while we restore the blog functionality.
          </p>
        </div>
      </div>
    </article>
  );
}
