'use client';

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 - Page Not Found | Lyyli.ai</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage or explore our features." />
      </head>
      <body className="antialiased font-sans min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {/* Minimal Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/en" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">Lyyli.ai</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/en" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                    Home
                  </Link>
                  <Link href="/en/features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                    Features
                  </Link>
                  <Link href="/en/pricing" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                    Pricing
                  </Link>
                  <Link href="/en/contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1 relative">
            <div className="container mx-auto px-4 py-20">
              <section className="text-center" aria-label="404 Error">
                {/* 404 Visual */}
                <div className="mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-8">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-6" aria-label="Error 404">
                    404
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl text-gray-900 text-center mb-8 font-bold leading-tight">
                  Page not found
                </h1>

                <p className="text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed text-gray-600">
                  Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
                </p>

                {/* Popular Pages */}
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl text-gray-900 text-center mb-12 font-bold leading-tight">
                    Popular pages
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Link
                      href="/en"
                      className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <h3 className="text-xl text-gray-900 mb-3 font-bold">Home</h3>
                        <p className="text-gray-600 leading-relaxed">Return to our homepage</p>
                      </div>
                    </Link>

                    <Link
                      href="/en/features"
                      className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <h3 className="text-xl text-gray-900 mb-3 font-bold">Features</h3>
                        <p className="text-gray-600 leading-relaxed">Explore AI-powered features</p>
                      </div>
                    </Link>

                    <Link
                      href="/en/cybersecurity"
                      className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-xl text-gray-900 mb-3 font-bold">Security</h3>
                        <p className="text-gray-600 leading-relaxed">Learn about our security</p>
                      </div>
                    </Link>

                    <Link
                      href="/en/blog"
                      className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <h3 className="text-xl text-gray-900 mb-3 font-bold">Blog</h3>
                        <p className="text-gray-600 leading-relaxed">Read our latest insights</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Additional Help */}
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    Need more help? Try these resources:
                  </p>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <Link
                      href="/en/help"
                      className="text-gray-900 hover:text-green-600 font-medium transition-colors"
                    >
                      Help center
                    </Link>
                    <span className="text-gray-400">•</span>
                    <Link
                      href="/en/contact"
                      className="text-gray-900 hover:text-green-600 font-medium transition-colors"
                    >
                      Contact support
                    </Link>
                    <span className="text-gray-400">•</span>
                    <Link
                      href="/en/about"
                      className="text-gray-900 hover:text-green-600 font-medium transition-colors"
                    >
                      About us
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </main>
          
          {/* Minimal Footer */}
          <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">L</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">Lyyli.ai</span>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-600">
                    © 2024 Lyyli.ai. All rights reserved.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Transform your internal communications with enterprise-grade AI
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}