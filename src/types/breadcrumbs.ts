export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  "itemListElement": Array<{
    "@type": string;
    "position": number;
    "name": string;
    "item"?: string;
  }>;
}
