import { BlogPostMetadata } from './blog';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
  startIndex: number;
  endIndex: number;
}

export interface PaginatedPosts {
  posts: BlogPostMetadata[];
  pagination: PaginationInfo;
}

/**
 * Default posts per page for blog pagination
 */
export const POSTS_PER_PAGE = 6;

/**
 * Calculate pagination information
 */
export function calculatePagination(
  totalPosts: number,
  currentPage: number,
  postsPerPage: number = POSTS_PER_PAGE
): PaginationInfo {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const previousPage = hasPreviousPage ? currentPage - 1 : null;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

  return {
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    startIndex,
    endIndex,
  };
}

/**
 * Get paginated posts for a specific page
 */
export function getPaginatedPosts(
  allPosts: BlogPostMetadata[],
  currentPage: number,
  postsPerPage: number = POSTS_PER_PAGE
): PaginatedPosts {
  const pagination = calculatePagination(allPosts.length, currentPage, postsPerPage);
  const posts = allPosts.slice(pagination.startIndex, pagination.endIndex);

  return {
    posts,
    pagination,
  };
}

/**
 * Generate pagination URLs
 */
export function generatePaginationUrls(
  basePath: string,
  pagination: PaginationInfo
) {
  const urls = {
    first: `${basePath}`,
    previous: pagination.previousPage 
      ? pagination.previousPage === 1 
        ? `${basePath}` 
        : `${basePath}/page/${pagination.previousPage}`
      : null,
    next: pagination.nextPage 
      ? `${basePath}/page/${pagination.nextPage}` 
      : null,
    last: pagination.totalPages > 1 
      ? `${basePath}/page/${pagination.totalPages}` 
      : null,
  };

  return urls;
}

/**
 * Generate pagination page numbers for display
 */
export function generatePaginationNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): Array<{ page: number; label: string; isCurrent: boolean }> {
  const pages: Array<{ page: number; label: string; isCurrent: boolean }> = [];

  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        page: i,
        label: i.toString(),
        isCurrent: i === currentPage,
      });
    }
  } else {
    // Show smart pagination with ellipsis
    const halfVisible = Math.floor(maxVisible / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      endPage = maxVisible;
    }
    if (currentPage > totalPages - halfVisible) {
      startPage = totalPages - maxVisible + 1;
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push({
        page: 1,
        label: '1',
        isCurrent: false,
      });
      if (startPage > 2) {
        pages.push({
          page: 0,
          label: '...',
          isCurrent: false,
        });
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        page: i,
        label: i.toString(),
        isCurrent: i === currentPage,
      });
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push({
          page: 0,
          label: '...',
          isCurrent: false,
        });
      }
      pages.push({
        page: totalPages,
        label: totalPages.toString(),
        isCurrent: false,
      });
    }
  }

  return pages;
}

/**
 * Generate structured data for pagination
 */
export function generatePaginationStructuredData(
  basePath: string,
  pagination: PaginationInfo,
  posts: BlogPostMetadata[],
  locale: string
) {
  const canonicalBaseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://lyyli.ai' 
    : 'http://localhost:3000';
  
  const urls = generatePaginationUrls(basePath, pagination);
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Blog ${locale === 'fi' ? 'Arkisto' : 'Archive'} - Page ${pagination.currentPage}`,
    "description": `${locale === 'fi' ? 'Blogikirjoitukset' : 'Blog posts'} ${locale === 'fi' ? 'sivulla' : 'page'} ${pagination.currentPage}`,
    "url": `${canonicalBaseUrl}${basePath}${pagination.currentPage > 1 ? `/page/${pagination.currentPage}` : ''}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": pagination.totalPosts,
      "itemListElement": posts.map((post, index) => ({
        "@type": "BlogPosting",
        "position": pagination.startIndex + index + 1,
        "name": post.title,
        "url": `${canonicalBaseUrl}/${locale}/blog/${post.slug}`,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author,
        },
      })),
    },
    ...(urls.previous && {
      "previousPage": {
        "@type": "WebPage",
        "url": `${canonicalBaseUrl}${urls.previous}`,
      },
    }),
    ...(urls.next && {
      "nextPage": {
        "@type": "WebPage", 
        "url": `${canonicalBaseUrl}${urls.next}`,
      },
    }),
  };
}
