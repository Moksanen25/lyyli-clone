import Link from 'next/link';
import { TranslationKeys } from '../lib/i18n';

interface BreadcrumbsProps {
  locale: string;
  translations: TranslationKeys;
  pathname: string;
}

export default function Breadcrumbs({ locale, translations, pathname }: BreadcrumbsProps) {
  // Only show breadcrumbs for routes deeper than 2 levels
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length <= 2) {
    return null;
  }

  const generateBreadcrumbItems = () => {
    const items = [];
    let currentPath = '';

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      // Skip locale segment
      if (i === 0 && (segment === 'en' || segment === 'fi')) {
        continue;
      }

      // Map route segments to readable names
      let label = segment;
      switch (segment) {
        case 'features':
          label = locale === 'fi' ? 'Ominaisuudet' : 'Features';
          break;
        case 'pricing':
          label = locale === 'fi' ? 'Hinnoittelu' : 'Pricing';
          break;
        case 'about':
          label = locale === 'fi' ? 'Tietoja meistä' : 'About';
          break;
        case 'blog':
          label = 'Blog';
          break;
        case 'contact':
          label = locale === 'fi' ? 'Yhteystiedot' : 'Contact';
          break;
        case 'waitlist':
          label = locale === 'fi' ? 'Odotuslista' : 'Waitlist';
          break;
        case 'privacy':
          label = locale === 'fi' ? 'Tietosuoja' : 'Privacy';
          break;
        case 'cookies':
          label = locale === 'fi' ? 'Evästeet' : 'Cookies';
          break;
        default:
          // Capitalize first letter for custom segments
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      const isLast = i === pathSegments.length - 1;
      
      items.push({
        label,
        path: currentPath,
        isLast,
      });
    }

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className="bg-grayLight/30 border-b border-grayLight" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm font-sans">
          <li>
            <Link
              href={`/${locale}`}
              className="text-mediumGray hover:text-forest transition-colors"
              aria-label={locale === 'fi' ? 'Etusivu' : 'Home'}
            >
              {locale === 'fi' ? 'Etusivu' : 'Home'}
            </Link>
          </li>
          
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              <svg
                className="w-4 h-4 text-mediumGray mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              
              {item.isLast ? (
                <span className="text-forest font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-mediumGray hover:text-forest transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
