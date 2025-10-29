import { BreadcrumbItem } from '@/types/breadcrumbs';

export interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && !item.isCurrentPage && { "item": item.href })
    }))
  };
}

/**
 * Generate breadcrumb items for a blog post
 */
export function generateBlogBreadcrumbs(
  postTitle: string, 
  locale: string,
  category?: string
): BreadcrumbItem[] {
  const basePath = `/${locale}`;
  
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: basePath
    },
    {
      label: 'Blog',
      href: `${basePath}/blog`
    }
  ];

  // Add category if provided
  if (category) {
    items.push({
      label: category,
      href: `${basePath}/blog?category=${encodeURIComponent(category)}`
    });
  }

  // Add current post (no href, marked as current page)
  items.push({
    label: postTitle,
    isCurrentPage: true
  });

  return items;
}

/**
 * Generate breadcrumb items for help pages
 */
export function generateHelpBreadcrumbs(
  pageTitle: string,
  locale: string,
  section?: string
): BreadcrumbItem[] {
  const basePath = `/${locale}`;
  
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: basePath
    },
    {
      label: 'Help',
      href: `${basePath}/help`
    }
  ];

  // Add section if provided
  if (section) {
    items.push({
      label: section,
      href: `${basePath}/help/${section}`
    });
  }

  // Add current page
  items.push({
    label: pageTitle,
    isCurrentPage: true
  });

  return items;
}

/**
 * Generate breadcrumb items for legal pages
 */
export function generateLegalBreadcrumbs(
  pageTitle: string,
  locale: string,
  documentType?: string
): BreadcrumbItem[] {
  const basePath = `/${locale}`;
  
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: basePath
    },
    {
      label: 'Help',
      href: `${basePath}/help`
    },
    {
      label: 'Legal',
      href: `${basePath}/help/legal`
    }
  ];

  // Add document type if provided
  if (documentType) {
    items.push({
      label: documentType,
      href: `${basePath}/help/legal/${documentType}`
    });
  }

  // Add current page
  items.push({
    label: pageTitle,
    isCurrentPage: true
  });

  return items;
}

/**
 * Generate breadcrumb items for general pages
 */
export function generatePageBreadcrumbs(
  pageTitle: string,
  locale: string,
  parentPages?: Array<{ title: string; href: string }>
): BreadcrumbItem[] {
  const basePath = `/${locale}`;
  
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: basePath
    }
  ];

  // Add parent pages if provided
  if (parentPages) {
    const breadcrumbParentPages: BreadcrumbItem[] = parentPages.map(page => ({
      label: page.title,
      href: page.href
    }));
    items.push(...breadcrumbParentPages);
  }

  // Add current page
  items.push({
    label: pageTitle,
    isCurrentPage: true
  });

  return items;
}
