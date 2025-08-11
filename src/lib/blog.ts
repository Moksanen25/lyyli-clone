import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  keywords: string[];
  author: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  keywords: string[];
  author: string;
  image?: string;
  imageAlt?: string;
}

const contentDirectory = path.join(process.cwd(), "content/blog");

export function getAllBlogPosts(locale: string): BlogPostMetadata[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, "");
      const fullPath = path.join(localeDir, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        locale,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        readTime: data.readTime || 5,
        category: data.category || "Communication",
        keywords: data.keywords || [],
        author: data.author || "Lyyli Team",
        image: data.image,
        imageAlt: data.imageAlt,
      } as BlogPostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      locale,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      readTime: data.readTime || 5,
      category: data.category || "Communication",
      keywords: data.keywords || [],
      author: data.author || "Lyyli Team",
      image: data.image,
      imageAlt: data.imageAlt,
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): { slug: string; locale: string }[] {
  const slugs: { slug: string; locale: string }[] = [];
  const locales = ["en", "fi"];

  locales.forEach((locale) => {
    const localeDir = path.join(contentDirectory, locale);

    if (fs.existsSync(localeDir)) {
      const fileNames = fs.readdirSync(localeDir);
      fileNames
        .filter((name) => name.endsWith(".mdx"))
        .forEach((name) => {
          const slug = name.replace(/\.mdx$/, "");
          slugs.push({ slug, locale });
        });
    }
  });

  return slugs;
}

export function generateBlogMetadata(post: BlogPostMetadata, locale: string) {
  const baseUrl = "https://lyyli.ai";
  const canonicalUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  // Primary and secondary keywords for SEO
  const primaryKeywords = [
    "AI communication assistant",
    "professional service organizations",
    "internal communication coordination",
    "enterprise-grade security",
    "GDPR compliant",
  ];

  const allKeywords = [...primaryKeywords, ...post.keywords].join(", ");

  return {
    title: `${post.title} - Lyyli.ai Blog`,
    description: post.description,
    keywords: allKeywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : [],
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/blog/${post.slug}`,
        fi: `${baseUrl}/fi/blog/${post.slug}`,
      },
    },
  };
}
