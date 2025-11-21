import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

export default function Breadcrumbs({
  items,
  className = '',
  ariaLabel = 'navigation',
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 mx-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}

          {item.href && !item.isCurrentPage ? (
            <Link
              href={item.href}
              className="text-forest hover:text-forest-dark transition-colors duration-200 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                item.isCurrentPage
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600'
              }
              aria-current={item.isCurrentPage ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
