import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * Custom MDX components for legal documents
 * These components maintain the legal document styling while using modern MDX rendering
 */
export const LegalMDXComponents: MDXComponents = {
  // Headings - Shift down by one level to keep page <h1> for title
  h1: ({ children }) => (
    <h2 className="text-forest font-playfair font-bold text-3xl leading-tight mt-8 mb-3">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="text-forest font-playfair font-bold text-2xl leading-snug mt-6 mb-2">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="text-forest font-playfair font-semibold text-xl leading-snug mt-5 mb-2">
      {children}
    </h4>
  ),
  h4: ({ children }) => (
    <h5 className="text-forest font-playfair font-medium text-lg leading-snug mt-4 mb-2">
      {children}
    </h5>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-darkGray font-sans leading-relaxed mb-4">{children}</p>
  ),

  // Text formatting
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,

  // Links
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className="text-forest underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href || '#'} className="text-forest underline">
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-darkGray">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-darkGray">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-darkGray font-sans leading-relaxed">{children}</li>
  ),

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-forest/40 pl-4 italic text-darkGray my-4">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children }) => (
    <code className="bg-gray-100 text-forest px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 -mx-2 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-gray-300 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            {children}
          </table>
        </div>
      </div>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-bold text-forest uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-darkGray whitespace-normal break-words">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-6 border-t border-gray-300" />,
};
