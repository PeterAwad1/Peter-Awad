import { useEffect, useState } from 'react';

/**
 * Hook to detect if the user is on a touch device
 * 
 * This hook checks for touch capability and returns a boolean indicating
 * whether the device supports touch input. This is useful for disabling
 * hover effects on touch devices where hover states can be problematic.
 * 
 * @returns boolean - true if the device supports touch, false otherwise
 * 
 * @example
 * const isTouchDevice = useTouchDevice();
 * const hoverClass = isTouchDevice ? '' : 'hover:scale-105';
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device supports touch
    const checkTouchDevice = () => {
      // Check for touch events support
      const hasTouchEvents = 'ontouchstart' in window;
      
      // Check for pointer events with touch capability
      const hasPointerEvents = 
        window.navigator.maxTouchPoints > 0 || 
        (window.navigator as any).msMaxTouchPoints > 0;
      
      // Check media query for coarse pointer (typically touch devices)
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      return hasTouchEvents || hasPointerEvents || hasCoarsePointer;
    };

    setIsTouchDevice(checkTouchDevice());

    // Listen for changes in pointer type (e.g., when connecting/disconnecting mouse)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches || checkTouchDevice());
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isTouchDevice;
}
