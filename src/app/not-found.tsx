'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MeshGradientBackground from "../components/MeshGradientBackground";

export default function GlobalNotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/en/help?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularPages = [
    {
      title: "Home",
      description: "Return to our homepage",
      href: "/en",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Features",
      description: "Explore AI-powered features",
      href: "/en/features",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Security",
      description: "Learn about our security",
      href: "/en/cybersecurity",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Blog",
      description: "Read our latest insights",
      href: "/en/blog",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
  ];

  return (
    <html lang="en" dir="ltr" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 - Page Not Found | Lyyli.ai</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage or explore our features." />
      </head>
      <body className="antialiased font-sans min-h-screen">
        {/* Vibrant Mesh Gradient Background */}
        <MeshGradientBackground />
        
        <div className="flex flex-col min-h-screen relative z-10">
          <Header locale="en" translations={{}} />
          
          <main className="flex-1 relative">
            <div className="relative z-30 pt-32">
              <section 
                className="container mx-auto px-4 py-20 relative"
                aria-label="404 Error"
              >
                {/* 404 Visual */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-rose/20 rounded-2xl mb-8">
                    <svg className="w-10 h-10 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-6xl md:text-7xl font-bold text-forest font-playfair mb-6" aria-label="Error 404">
                    404
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl text-forest text-center mb-8 font-playfair font-bold leading-tight relative z-10">
                  Page not found
                </h1>

                <p className="text-lg text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
                  Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
                </p>

                {/* Search Box */}
                <div className="mb-16 max-w-lg mx-auto relative z-10">
                  <form onSubmit={handleSearch} className="relative">
                    <label htmlFor="search-404" className="sr-only">Search our help center</label>
                    <input
                      id="search-404"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search our help center..."
                      className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-lg focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest font-sans bg-white"
                      aria-label="Search our help center"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-forest hover:text-turquoise transition-colors"
                      aria-label="Submit search"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Popular Pages */}
                <div className="mb-16 relative z-10">
                  <h2 className="text-2xl md:text-3xl text-forest text-center mb-12 font-playfair font-bold leading-tight">
                    Popular pages
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {popularPages.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        data-testid={`404-link-${page.title.toLowerCase()}`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-rose/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-turquoise/20 transition-colors">
                            <div className="text-turquoise group-hover:text-forest transition-colors">
                              {page.icon}
                            </div>
                          </div>
                          <h3 className="text-xl text-forest mb-3 font-playfair font-bold">
                            {page.title}
                          </h3>
                          <p className="text-mediumGray font-sans leading-relaxed">
                            {page.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Additional Help */}
                <div className="text-center relative z-10">
                  <p className="text-mediumGray mb-6 font-sans">
                    Need more help? Try these resources:
                  </p>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <Link
                      href="/en/help"
                      className="text-forest hover:text-turquoise font-medium font-sans transition-colors"
                      data-testid="404-link-help"
                    >
                      Help center
                    </Link>
                    <span className="text-mediumGray">•</span>
                    <Link
                      href="/en/contact"
                      className="text-forest hover:text-turquoise font-medium font-sans transition-colors"
                      data-testid="404-link-contact"
                    >
                      Contact support
                    </Link>
                    <span className="text-mediumGray">•</span>
                    <Link
                      href="/en/about"
                      className="text-forest hover:text-turquoise font-medium font-sans transition-colors"
                      data-testid="404-link-about"
                    >
                      About us
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </main>
          
          <Footer locale="en" translations={{}} canonicalUrl="https://lyyli.ai/404" />
        </div>
      </body>
    </html>
  );
}
