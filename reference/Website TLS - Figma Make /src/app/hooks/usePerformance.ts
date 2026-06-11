import { useEffect } from 'react';

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Check if Performance API is available
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }

    // Log Core Web Vitals when available
    const logWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });

      // Cumulative Layout Shift (CLS)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        });
        console.log('CLS:', clsScore);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Observers not supported
        console.warn('Performance observers not fully supported');
      }
    };

    logWebVitals();

    // Log page load time
    window.addEventListener('load', () => {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        console.log('Page Load Time:', navTiming.loadEventEnd - navTiming.fetchStart, 'ms');
        console.log('DOM Content Loaded:', navTiming.domContentLoadedEventEnd - navTiming.fetchStart, 'ms');
        console.log('Time to Interactive:', navTiming.domInteractive - navTiming.fetchStart, 'ms');
      }
    });
  }, []);
}

export function usePrefetch(urls: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = url.endsWith('.jpg') || url.endsWith('.png') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  }, [urls]);
}

export function usePreloadImages(images: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
}
