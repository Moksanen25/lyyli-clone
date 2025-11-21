import type { ReactElement } from 'react';
import Link from 'next/link';
import {
  type PaginationInfo,
  generatePaginationUrls,
  generatePaginationNumbers,
} from '@/lib/pagination';

interface PaginationProps {
  pagination: PaginationInfo;
  basePath: string;
  locale: string;
  className?: string;
}

export default function Pagination({
  pagination,
  basePath,
  locale,
  className = '',
}: PaginationProps): ReactElement | null {
  // Translations moved to inline text to avoid client-side hook in server component
  const navigationLabel = locale === 'fi' ? 'Sivunumerointi' : 'Pagination';
  const previous = locale === 'fi' ? 'Edellinen' : 'Previous';
  const next = locale === 'fi' ? 'Seuraava' : 'Next';
  const page = locale === 'fi' ? 'Sivu' : 'Page';
  // Note: localized "of" string not needed in the current UI

  const urls = generatePaginationUrls(basePath, pagination);
  const pageNumbers = generatePaginationNumbers(
    pagination.currentPage,
    pagination.totalPages
  );

  // Don't render pagination if there's only one page
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={navigationLabel}
      className={`flex items-center justify-center space-x-2 ${className}`}
    >
      {/* Previous Page */}
      {urls.previous && (
        <Link
          href={urls.previous}
          className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full border border-forest text-forest hover:bg-forest hover:text-white transition-colors duration-200"
          aria-label={previous}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {previous}
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageInfo, index) => {
          if (pageInfo.label === '...') {
            const prev = pageNumbers[index - 1]?.page ?? 'start';
            const next = pageNumbers[index + 1]?.page ?? 'end';
            return (
              <span
                key={`ellipsis-${prev}-${next}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          if (pageInfo.isCurrent) {
            return (
              <span
                key={pageInfo.page}
                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-forest border border-forest rounded-full"
                aria-current="page"
                aria-label={`${page} ${pageInfo.page}`}
              >
                {pageInfo.label}
              </span>
            );
          }

          const href =
            pageInfo.page === 1
              ? basePath
              : `${basePath}/page/${pageInfo.page}`;

          return (
            <Link
              key={pageInfo.page}
              href={href}
              className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full border border-forest text-forest hover:bg-forest hover:text-white transition-colors duration-200"
              aria-label={`${page} ${pageInfo.page}`}
            >
              {pageInfo.label}
            </Link>
          );
        })}
      </div>

      {/* Next Page */}
      {urls.next && (
        <Link
          href={urls.next}
          className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full border border-forest text-forest hover:bg-forest hover:text-white transition-colors duration-200"
          aria-label={next}
        >
          {next}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}

      {/* Page Info */}
      <div className="hidden sm:block ml-4 text-sm text-gray-500">
        {locale === 'fi'
          ? `Näytetään ${pagination.startIndex + 1}-${pagination.endIndex} / ${pagination.totalPosts}`
          : `Showing ${pagination.startIndex + 1}-${pagination.endIndex} of ${pagination.totalPosts}`}
      </div>
    </nav>
  );
}
