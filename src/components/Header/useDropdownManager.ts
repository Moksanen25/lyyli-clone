import { useState, useRef, useCallback } from "react";

/**
 * Custom hook for managing dropdown menu state
 * Handles opening, closing, and hover interactions for dropdown menus
 */
export function useDropdownManager(
  dropdownRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const openDropdown = useCallback((dropdownName: string): void => {
    // Clear any existing timeout
    if (dropdownTimeoutRefs.current[dropdownName]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownName]!);
      dropdownTimeoutRefs.current[dropdownName] = null;
    }
    setActiveDropdown(dropdownName);
  }, []);

  const closeDropdown = useCallback((dropdownName: string): void => {
    // Set a timeout to close the dropdown
    dropdownTimeoutRefs.current[dropdownName] = setTimeout(() => {
      setActiveDropdown((current) => (current === dropdownName ? null : current));
    }, 100);
  }, []);

  const keepDropdownOpen = useCallback((dropdownName: string): void => {
    // Clear the timeout when hovering over dropdown content
    if (dropdownTimeoutRefs.current[dropdownName]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownName]!);
      dropdownTimeoutRefs.current[dropdownName] = null;
    }
    setActiveDropdown(dropdownName);
  }, []);

  const handleDropdownMouseLeave = useCallback(
    (dropdownName: string): void => {
      const dropdownElement = dropdownRefs.current[dropdownName];
      if (dropdownElement) {
        const rect = dropdownElement.getBoundingClientRect();
        
        const handleMouseMove = (e: MouseEvent): void => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          if (
            mouseX < rect.left ||
            mouseX > rect.right ||
            mouseY < rect.top ||
            mouseY > rect.bottom
          ) {
            closeDropdown(dropdownName);
            document.removeEventListener('mousemove', handleMouseMove);
          }
        };

        document.addEventListener('mousemove', handleMouseMove);
        
        // Clean up after a short delay
        setTimeout(() => {
          document.removeEventListener('mousemove', handleMouseMove);
        }, 100);
      }
    },
    [closeDropdown, dropdownRefs]
  );

  return {
    activeDropdown,
    openDropdown,
    closeDropdown,
    keepDropdownOpen,
    handleDropdownMouseLeave,
  };
}

