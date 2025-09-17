import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface LegalDocMetadata {
  slug: string;
  locale: string;
  title: string;
  description?: string;
  version?: string;
  lastUpdated?: string;
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content", "legal");

export function getAllLegalDocs(locale: string): Array<Omit<LegalDocMetadata, "content">> {
  const localeDir = path.join(contentDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  const fileNames = fs.readdirSync(localeDir);
  const docs = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, "");
      const fullPath = path.join(localeDir, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        locale,
        title: (data as any).title || slug,
        description: (data as any).description || "",
        version: (data as any).version || undefined,
        lastUpdated: (data as any).lastUpdated || undefined,
      } as Omit<LegalDocMetadata, "content">;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return docs;
}

export function getLegalDoc(slug: string, locale: string): LegalDocMetadata | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      locale,
      title: (data as any).title || slug,
      description: (data as any).description || "",
      version: (data as any).version || undefined,
      lastUpdated: (data as any).lastUpdated || undefined,
      content,
    } as LegalDocMetadata;
  } catch {
    return null;
  }
}

export function getAllLegalSlugs(): { slug: string; locale: string }[] {
  const slugs: { slug: string; locale: string }[] = [];
  if (!fs.existsSync(contentDirectory)) return slugs;

  const locales = fs.readdirSync(contentDirectory);
  for (const locale of locales) {
    const localeDir = path.join(contentDirectory, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;
    const fileNames = fs.readdirSync(localeDir).filter((n) => n.endsWith(".mdx"));
    for (const name of fileNames) {
      slugs.push({ slug: name.replace(/\.mdx$/, ""), locale });
    }
  }
  return slugs;
}



