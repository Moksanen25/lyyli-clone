"use client";

import Link from "next/link";
import Image from "next/image";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose/5 to-turquoise/5 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-forest"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Offline Message */}
        <h1 className="text-4xl font-playfair font-bold text-forest mb-4">
          You're offline
        </h1>
        <p className="text-mediumGray mb-8 font-sans leading-relaxed">
          Don't worry! Some parts of Lyyli.ai are available offline. 
          Check your internet connection and try again.
        </p>

        {/* Available Offline Features */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-soft border border-gray-200">
          <h2 className="text-lg font-semibold text-forest mb-4 font-sans">
            Available Offline
          </h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-center text-mediumGray">
              <svg className="w-5 h-5 text-turquoise mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Basic navigation
            </li>
            <li className="flex items-center text-mediumGray">
              <svg className="w-5 h-5 text-turquoise mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cached images and content
            </li>
            <li className="flex items-center text-mediumGray">
              <svg className="w-5 h-5 text-turquoise mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Offline reading
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full btn-primary"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="block w-full btn-secondary text-center"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Lyyli Logo */}
        <div className="mt-12">
          <Image
            src="/images/logos/Lyyli.ai_no_BG.png"
            alt="Lyyli.ai logo"
            width={120}
            height={40}
            className="mx-auto opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
