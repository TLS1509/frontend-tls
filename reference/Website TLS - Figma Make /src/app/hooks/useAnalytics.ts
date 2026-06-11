/**
 * Google Analytics 4 Integration - The Learning Society
 * Hook pour gérer le tracking des événements
 */

import { useEffect } from 'react';

// Types pour les événements GA4
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Déclaration TypeScript pour gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

class Analytics {
  private initialized = false;
  private measurementId: string = '';

  /**
   * Initialise Google Analytics 4
   * @param measurementId - ID de mesure GA4 (format: G-XXXXXXXXXX)
   */
  init(measurementId: string) {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    this.measurementId = measurementId;

    // Injecter le script GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialiser dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: true,
      anonymize_ip: true, // RGPD compliance
    });

    this.initialized = true;
    console.log('📊 Google Analytics initialized:', measurementId);
  }

  /**
   * Track une page view
   */
  pageView(url: string, title: string) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });

    console.log('📊 Page view tracked:', url, title);
  }

  /**
   * Track un événement générique
   */
  event(eventName: string, params?: Record<string, any>) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('event', eventName, params);

    console.log('📊 Event tracked:', eventName, params);
  }

  /**
   * Track un clic sur un CTA
   */
  trackCTA(ctaName: string, location: string) {
    this.event('cta_click', {
      cta_name: ctaName,
      cta_location: location,
    });
  }

  /**
   * Track une conversion (inscription, achat, etc.)
   */
  trackConversion(type: string, value?: number) {
    this.event('conversion', {
      conversion_type: type,
      value: value,
      currency: 'EUR',
    });
  }

  /**
   * Track une navigation
   */
  trackNavigation(from: string, to: string) {
    this.event('navigation', {
      from_page: from,
      to_page: to,
    });
  }

  /**
   * Track un téléchargement
   */
  trackDownload(fileName: string, fileType: string) {
    this.event('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  }

  /**
   * Track une soumission de formulaire
   */
  trackFormSubmission(formName: string, success: boolean) {
    this.event('form_submission', {
      form_name: formName,
      success: success,
    });
  }

  /**
   * Track une interaction vidéo
   */
  trackVideoInteraction(action: 'play' | 'pause' | 'complete', videoTitle: string) {
    this.event('video_interaction', {
      video_action: action,
      video_title: videoTitle,
    });
  }

  /**
   * Track une recherche
   */
  trackSearch(searchTerm: string, resultsCount: number) {
    this.event('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }

  /**
   * Track le temps passé sur une page
   */
  trackTimeOnPage(pageName: string, seconds: number) {
    this.event('time_on_page', {
      page_name: pageName,
      duration_seconds: seconds,
    });
  }

  /**
   * Track les erreurs
   */
  trackError(errorMessage: string, errorStack?: string) {
    this.event('error', {
      error_message: errorMessage,
      error_stack: errorStack,
      page_url: window.location.href,
    });
  }

  /**
   * Track l'engagement utilisateur
   */
  trackEngagement(engagementType: string, engagementValue?: string | number) {
    this.event('user_engagement', {
      engagement_type: engagementType,
      engagement_value: engagementValue,
    });
  }

  /**
   * Set user properties (démographiques, etc.)
   */
  setUserProperties(properties: Record<string, any>) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('set', 'user_properties', properties);
  }
}

// Instance singleton
export const analytics = new Analytics();

/**
 * Hook React pour initialiser GA4
 */
export function useAnalytics(measurementId: string) {
  useEffect(() => {
    if (measurementId) {
      analytics.init(measurementId);
    }
  }, [measurementId]);

  return analytics;
}

/**
 * Hook pour tracker les pages views automatiquement
 */
export function usePageTracking(pageName: string) {
  useEffect(() => {
    const startTime = Date.now();

    // Track page view
    analytics.pageView(window.location.pathname, pageName);

    // Track time on page au démontage
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(pageName, timeSpent);
    };
  }, [pageName]);
}

