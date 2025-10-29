import { memo } from "react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Mobile Menu Toggle Button
 * Hamburger menu icon that toggles mobile navigation
 */
const MobileMenuButton = memo(function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      aria-label={isOpen ? "Close mobile navigation menu" : "Open mobile navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      type="button"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6 text-forest"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
});

export default MobileMenuButton;

