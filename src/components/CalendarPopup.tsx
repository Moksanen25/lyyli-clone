"use client";

import { useState } from "react";

interface CalendarPopupProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendarPopup({ children, className = "" }: CalendarPopupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motion, setMotion] = useState<any>(null);

  const openModal = async () => {
    if (!motion) {
      const mod = await import("framer-motion");
      setMotion({ motion: mod.motion, AnimatePresence: mod.AnimatePresence });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const MotionDiv = motion?.motion?.div || (('div' as unknown) as any);
  const AnimatePresence = motion?.AnimatePresence || (({ children }: any) => children);

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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e: any) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-forest to-turquoise p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-playfair font-bold leading-tight">
                        Book a Demo
                      </h2>
                      <p className="text-white/90 mt-2 font-sans">
                        Schedule a personalized demo with our team
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Content */}
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-mediumGray font-sans">
                      Choose a convenient time for your personalized demo. Our team will show you how Lyyli can transform your organization's communication.
                    </p>
                  </div>
                  
                  {/* Google Calendar Embed */}
                  <div className="relative">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1j18PuMAigFvdUkM4oSy3ZFfmONEVd63nTQyfxO4RT6qvlclpkTvip5oipFN0h5YnC5fY3Hiup?gv=true" 
                      style={{ border: 0 }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      className="rounded-lg"
                      title="Book a demo - Calendar"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex items-center justify-between text-sm text-mediumGray">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="font-sans">Secure booking • GDPR compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-sans">Questions? Contact us</span>
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
