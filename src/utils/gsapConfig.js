import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global GSAP configuration for better performance
export const initGSAPConfig = () => {
  // Set default ease
  gsap.defaults({
    ease: "power2.out",
    duration: 0.8,
  });

  // ScrollTrigger global settings for better performance
  ScrollTrigger.config({
    // Limit scroll calculations
    limitCallbacks: true,
    // Sync with browser paint
    syncInterval: 0,
    // Auto refresh on resize with debounce
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  // Optimize for performance
  ScrollTrigger.normalizeScroll(false);

  // Add aggressive resize handler to fix stacking issues
  let resizeTimer;
  let lastWidth = window.innerWidth;

  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentWidth = window.innerWidth;

      // Only refresh if width actually changed (not just scroll)
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;

        // Kill all pinned ScrollTriggers and refresh
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.pin) {
            // Get the pinned element
            const pinnedElement = trigger.pin;
            if (pinnedElement) {
              // Reset inline styles
              pinnedElement.style.transform = '';
              pinnedElement.style.position = '';
              pinnedElement.style.top = '';
              pinnedElement.style.left = '';
              pinnedElement.style.width = '';
            }
          }
        });

        // Refresh all ScrollTriggers
        ScrollTrigger.refresh(true);
      }
    }, 250);
  };

  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimer);
  };
};

// Common ScrollTrigger defaults to prevent overlap
export const getScrollTriggerDefaults = (trigger) => ({
  trigger,
  invalidateOnRefresh: true,
  // Prevent stacking by killing previous animations
  toggleActions: "play none none reverse",
  // Add markers only in development
  markers: false,
});

// Performance optimization utilities
export const optimizeForPerformance = (element) => {
  if (!element) return;

  // Add will-change for GPU acceleration
  element.style.willChange = "transform, opacity";

  // Force hardware acceleration
  element.style.transform = "translateZ(0)";
};

export const cleanupPerformance = (element) => {
  if (!element) return;

  // Remove will-change after animation
  element.style.willChange = "auto";
};

// Debounce utility for scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default {
  initGSAPConfig,
  getScrollTriggerDefaults,
  optimizeForPerformance,
  cleanupPerformance,
  debounce,
};
