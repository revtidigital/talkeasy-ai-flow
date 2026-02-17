// GA4 + Meta Pixel tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Track a custom event on both GA4 and Meta Pixel
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

/**
 * Track standard Meta Pixel events (Lead, Purchase, etc.)
 */
export function trackMetaStandard(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('button_click', { button_name: buttonName, click_location: location });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, page: string) {
  trackEvent('cta_click', { cta_name: ctaName, page });
  trackMetaStandard('Lead', { content_name: ctaName });
}

/**
 * Track WhatsApp clicks
 */
export function trackWhatsAppClick() {
  trackEvent('whatsapp_click', { button_location: 'floating_button' });
  trackMetaStandard('Contact', { content_name: 'WhatsApp Float' });
}

/**
 * Track page views (for SPA navigation)
 */
export function trackPageView(path: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}
