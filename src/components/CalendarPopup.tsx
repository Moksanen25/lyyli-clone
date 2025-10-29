'use client';

import { useState } from 'react';
import type {
  AnimatePresence as AnimatePresenceType,
  motion as MotionType,
} from 'framer-motion';

interface CalendarPopupProps {
  children: React.ReactNode;
  className?: string;
  translations: {
    title: string;
    subtitle: string;
    description: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    errorButton: string;
    footerSecure: string;
    footerContact: string;
  };
}

interface MotionModule {
  motion: typeof MotionType;
  AnimatePresence: typeof AnimatePresenceType;
}

export default function CalendarPopup({
  children,
  className = '',
  translations,
}: CalendarPopupProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motion, setMotion] = useState<MotionModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const openModal = async (): Promise<void> => {
    if (!motion) {
      const mod = await import('framer-motion');
      setMotion({ motion: mod.motion, AnimatePresence: mod.AnimatePresence });
    }
    setIsModalOpen(true);
    setIsLoading(true);
    setHasError(false);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setIsLoading(true);
    setHasError(false);
  };

  const handleIframeLoad = (): void => {
    setIsLoading(false);
  };

  const handleIframeError = (): void => {
    setIsLoading(false);
    setHasError(true);
  };

  const AnimatePresence =
    motion?.AnimatePresence ??
    (({ children }: { children: React.ReactNode }) => children);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className={className}
        aria-label="Book a demo - Open calendar"
      >
        {children}
      </button>

      {/* Calendar Modal */}
      <AnimatePresence>
        {isModalOpen && motion && (
          <motion.AnimatePresence>
            <motion.motion.div
              className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.motion.div
                className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-forest to-turquoise p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-playfair font-bold leading-tight">
                        {translations.title}
                      </h2>
                      <p className="text-white/90 mt-2 font-sans">
                        {translations.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Content */}
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-mediumGray font-sans">
                      {translations.description}
                    </p>
                  </div>

                  {/* Pipedrive Scheduler Embed */}
                  <div className="relative">
                    {/* Loading State */}
                    {isLoading && (
                      <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[600px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto mb-4" />
                          <p className="text-mediumGray font-sans">
                            {translations.loading}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error State */}
                    {hasError && (
                      <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[600px] flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 text-forest mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                            {translations.errorTitle}
                          </h3>
                          <p className="text-mediumGray mb-6 font-sans">
                            {translations.errorDescription}
                          </p>
                          <a
                            href="https://lyyli.pipedrive.com/scheduler/DPLowacq/lyyliai-demo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors"
                          >
                            {translations.errorButton}
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Calendar Iframe */}
                    {!hasError && (
                      <iframe
                        src="https://lyyli.pipedrive.com/scheduler/DPLowacq/lyyliai-demo"
                        title="Pipedrive Scheduler Embed"
                        style={{
                          border: 0,
                          display: isLoading ? 'none' : 'block',
                          maxWidth: '800px',
                          margin: '0 auto',
                        }}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        className="rounded-lg"
                        loading="eager"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                      />
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex items-center justify-between text-sm text-mediumGray">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="font-sans">
                        {translations.footerSecure}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="font-sans">
                        {translations.footerContact}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.motion.div>
            </motion.motion.div>
          </motion.AnimatePresence>
        )}
      </AnimatePresence>
    </>
  );
}
