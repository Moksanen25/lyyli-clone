"use client";

import { useState, useEffect, useRef } from "react";
import type { TranslationKeys } from "@/lib/i18n";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenuButton from "./MobileMenuButton";
import MobileNavigation from "./MobileNavigation";
import { useDropdownManager } from "./useDropdownManager";
import { useScrollEffect } from "./useScrollEffect";

interface HeaderProps {
  locale: string;
  translations: TranslationKeys;
}

/**
 * Main Header Component
 * Responsive navigation header with dropdown menus and mobile support
 * 
 * This component has been refactored into smaller, maintainable subcomponents:
 * - Logo: Brand logo and homepage link
 * - DesktopNavigation: Full desktop navigation with dropdowns
 * - MobileNavigation: Mobile menu with compact layout
 * - MobileMenuButton: Hamburger menu toggle
 * - NavigationDropdown: Reusable dropdown component
 */
export default function Header({ locale, translations: t }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollEffect();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const {
    activeDropdown,
    openDropdown,
    closeDropdown,
    keepDropdownOpen,
    handleDropdownMouseLeave,
  } = useDropdownManager(dropdownRefs);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  // Styling helpers
  const getHeaderClasses = (): string => {
    return isScrolled
      ? "bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl"
      : "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl";
  };

  const textColor = "text-forest";
  const hoverTextColor = "hover:text-forest/80";
  const dropdownBg = "bg-white";
  const dropdownBorder = "border-gray-200";
  const hoverBg = "hover:bg-gray-50";
  const mobileBorder = "border-gray-200";
  const mobileHoverBg = "hover:bg-gray-50";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className={`mx-4 mt-6 transition-all duration-300 ${getHeaderClasses()}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo onLogoClick={closeMobileMenu} />
            </div>

            {/* Desktop Navigation */}
            <DesktopNavigation
              locale={locale}
              translations={t}
              activeDropdown={activeDropdown}
              onOpenDropdown={openDropdown}
              onCloseDropdown={closeDropdown}
              onKeepDropdownOpen={keepDropdownOpen}
              onDropdownMouseLeave={handleDropdownMouseLeave}
              dropdownRefs={dropdownRefs}
              textColor={textColor}
              hoverTextColor={hoverTextColor}
              dropdownBg={dropdownBg}
              dropdownBorder={dropdownBorder}
              hoverBg={hoverBg}
            />

            {/* Mobile Menu Button */}
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>

          {/* Mobile Menu */}
          <MobileNavigation
            isOpen={isMobileMenuOpen}
            locale={locale}
            translations={t}
            onLinkClick={closeMobileMenu}
            mobileBorder={mobileBorder}
            mobileHoverBg={mobileHoverBg}
            textColor={textColor}
          />
        </div>
      </nav>
    </header>
  );
}

