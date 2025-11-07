'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from '@/hooks/useTranslations';

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations(locale);

  const popularPages = [
    {
      title: t['notFound.popularPages.home.title'] || 'Home',
      description: t['notFound.popularPages.home.description'] || 'Return to our homepage',
      href: `/${locale}`,
      testId: '404-link-home',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: t['notFound.popularPages.features.title'] || 'Features',
      description: t['notFound.popularPages.features.description'] || 'Explore AI-powered features',
      href: `/${locale}/features`,
      testId: '404-link-features',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: t['notFound.popularPages.security.title'] || 'Security',
      description: t['notFound.popularPages.security.description'] || 'Learn about our security',
      href: `/${locale}/cybersecurity`,
      testId: '404-link-security',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: t['notFound.popularPages.blog.title'] || 'Blog',
      description: t['notFound.popularPages.blog.description'] || 'Read our latest insights',
      href: `/${locale}/blog`,
      testId: '404-link-blog',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
  ];

  return (
    <div className="relative z-30 pt-20 md:pt-32 pb-20">
      <section className="container mx-auto px-4 py-12 md:py-20 relative" aria-label="404 Error">
        {/* 404 Visual with Brand Colors */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#F7EBEB] rounded-3xl mb-8 shadow-lg">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-[#2F5D50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#2F5D50] mb-8 font-playfair tracking-tight" aria-label="Error 404">
            404
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#2F5D50] text-center mb-6 font-bold leading-tight font-playfair">
          {t['404.heading'] || 'Page not found'}
        </h1>

        <p className="text-base md:text-lg text-center max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed text-[#333333]">
          {t['notFound.longMessage'] || 'Sorry, we couldn\'t find the page you\'re looking for. It may have been moved, deleted, or the URL might be incorrect.'}
        </p>

        {/* Popular Pages with Enhanced Design */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl text-[#2F5D50] text-center mb-10 md:mb-14 font-bold leading-tight font-playfair">
            {t['notFound.popularPages.title'] || 'Popular pages'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                data-testid={page.testId}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#A7D6D1]/30 hover:shadow-2xl hover:border-[#2F5D50]/40 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#A7D6D1]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2F5D50] transition-all duration-300">
                    <div className="text-[#2F5D50] group-hover:text-white transition-colors duration-300">
                      {page.icon}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl text-[#2F5D50] mb-3 font-bold font-playfair">
                    {page.title}
                  </h3>
                  <p className="text-[#333333] leading-relaxed text-sm md:text-base">
                    {page.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Help with Brand Styling */}
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 max-w-3xl mx-auto shadow-md border border-[#A7D6D1]/20">
          <p className="text-[#333333] mb-6 text-base md:text-lg font-medium">
            {t['notFound.additionalHelp.title'] || 'Need more help? Try these resources:'}
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
            <Link
              href={`/${locale}/help`}
              data-testid="404-link-help"
              className="text-[#2F5D50] hover:text-[#A7D6D1] font-semibold transition-colors duration-200 text-sm md:text-base"
            >
              {t['notFound.additionalHelp.helpCenter'] || 'Help center'}
            </Link>
            <span className="text-[#A7D6D1]">•</span>
            <Link
              href={`/${locale}/contact`}
              data-testid="404-link-contact"
              className="text-[#2F5D50] hover:text-[#A7D6D1] font-semibold transition-colors duration-200 text-sm md:text-base"
            >
              {t['notFound.additionalHelp.contactSupport'] || 'Contact support'}
            </Link>
            <span className="text-[#A7D6D1]">•</span>
            <Link
              href={`/${locale}/about`}
              data-testid="404-link-about"
              className="text-[#2F5D50] hover:text-[#A7D6D1] font-semibold transition-colors duration-200 text-sm md:text-base"
            >
              {t['notFound.additionalHelp.about'] || 'About us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}