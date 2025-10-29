import Link from "next/link";
import { memo, useRef } from "react";

export interface DropdownLink {
  href: string;
  label: string;
  isDivider?: boolean;
}

interface NavigationDropdownProps {
  label: string;
  links: DropdownLink[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDropdownMouseEnter: () => void;
  onDropdownMouseLeave: () => void;
  dropdownRef: (el: HTMLDivElement | null) => void;
  textColor: string;
  hoverTextColor: string;
  dropdownBg: string;
  dropdownBorder: string;
  hoverBg: string;
}

/**
 * Navigation Dropdown Component
 * Reusable dropdown menu for navigation items
 */
const NavigationDropdown = memo(function NavigationDropdown({
  label,
  links,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onDropdownMouseEnter,
  onDropdownMouseLeave,
  dropdownRef,
  textColor,
  hoverTextColor,
  dropdownBg,
  dropdownBorder,
  hoverBg,
}: NavigationDropdownProps) {
  return (
    <div className="relative">
      <button
        className={`flex items-center gap-2 text-base ${textColor} ${hoverTextColor} transition-colors duration-200 font-sans py-2`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={dropdownRef}
        className={`absolute top-full left-0 mt-2 w-48 ${dropdownBg} rounded-xl shadow-xl border ${dropdownBorder} transition-all duration-300 transform ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
        }`}
        onMouseEnter={onDropdownMouseEnter}
        onMouseLeave={onDropdownMouseLeave}
      >
        <div className="py-2">
          {links.map((link, index) => (
            link.isDivider ? (
              <div key={`divider-${index}`} className="border-t border-gray-200/50 my-1" />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-${link.href.includes('#') ? '2' : '3'} ${
                  link.href.includes('#') ? 'text-sm' : ''
                } ${textColor} ${hoverBg} transition-colors duration-150`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
});

export default NavigationDropdown;

