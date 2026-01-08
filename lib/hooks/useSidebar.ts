import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useSidebar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Separate state for mobile and desktop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Auto-close mobile menu on navigation
  useEffect(() => {
    if (!isDesktop) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, isDesktop]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen && !isDesktop) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isDesktop]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isDesktop]);

  const toggleMobile = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobile = () => setIsMobileMenuOpen(false);
  const toggleDesktop = () => setIsDesktopCollapsed(!isDesktopCollapsed);

  return {
    isDesktop,
    isMobileMenuOpen,
    isDesktopCollapsed,
    toggleMobile,
    closeMobile,
    toggleDesktop,
  };
}
