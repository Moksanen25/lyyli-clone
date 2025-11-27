import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Custom MDX components for blog posts
 * These components maintain the brand styling rules while using modern MDX rendering
 */
export const BlogMDXComponents: MDXComponents = {
  // Headings - Following brand rules: H2 and H3 use Playfair, H4+ use Inter
  h1: ({ children }) => (
    <h1 className="text-4xl font-playfair font-bold text-forest mb-6 mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-playfair font-bold text-forest mb-4 mt-12">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-playfair font-bold text-forest mb-3 mt-8">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-inter font-bold text-forest mb-2 mt-6">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-inter font-bold text-forest mb-2 mt-4">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-inter font-bold text-forest mb-2 mt-4">
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
  ),

  // Text formatting
  strong: ({ children }) => (
    <strong className="font-semibold text-forest">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,

  // Links
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className="text-forest hover:text-turquoise transition-colors underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href ?? '#'}
        className="text-forest hover:text-turquoise transition-colors underline"
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 text-gray-700">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-2">{children}</li>,

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-forest/40 pl-6 italic text-gray-700 my-6 bg-cream/50 py-4 rounded-r-lg">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code className="bg-gray-100 text-forest px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    }

    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <div className="bleed my-6">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-none md:rounded-lg overflow-x-auto">
        {children}
      </pre>
    </div>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-forest uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => <div className="chapter-break my-12 border-t-2 border-cream" />,

  // Images
  img: ({ src, alt }) => {
    if (!src) return null;

    return (
      <div className="bleed my-8">
        <Image
          src={encodeURI(src as string)}
          alt={alt ?? ''}
          width={1200}
          height={675}
          className="rounded-none md:rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          unoptimized
        />
        {alt && (
          <p className="text-sm text-gray-500 mt-2 text-center px-4 md:px-0">
            {alt}
          </p>
        )}
      </div>
    );
  },

  // Callouts
  KeyTakeaways: ({ children }) => (
    <aside className="my-8 rounded-xl border-2 border-forest bg-white shadow-soft p-5">
      <h4 className="text-forest font-playfair font-bold text-lg mb-2">
        Key takeaways
      </h4>
      <div className="text-darkGray font-sans leading-relaxed">{children}</div>
    </aside>
  ),
};
