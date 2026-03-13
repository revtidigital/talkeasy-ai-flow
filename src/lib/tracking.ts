// ===============================================
// FULL TRACKING UTILITY
// Works with Lovable + React + GA4 + Meta Pixel
// ===============================================

const DEBUG = false;

// ---------- GLOBAL TYPES ----------
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// ---------- CORE EVENT ----------
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (DEBUG) console.log("[TRACK]", eventName, params);

  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", eventName, params);
    } catch (e) {
      console.error("GA4 Error:", e);
    }
  }

  // META
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("trackCustom", eventName, params);
    } catch (e) {
      console.error("Meta Pixel Error:", e);
    }
  }
}

// ---------- PAGE VIEW ----------
export function trackPageView(path: string, title: string) {
  trackEvent("page_view", { page_path: path, page_title: title });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
}

// ---------- BUTTON CLICK ----------
export function trackButtonClick(buttonName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "button_click", {
      event_category: "engagement",
      event_label: buttonName,
    });
  }
}

// ---------- FORM ----------
export function trackFormStart(form: string) {
  trackEvent("form_start", { form });
}

export function trackFormSuccess(form: string) {
  // GA4 form_submit event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      event_category: "lead",
      event_label: form,
    });
  }

  // Meta Pixel Lead event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { form });
  }
}

export function trackFormError(form: string, error: string) {
  trackEvent("form_error", { form, error });
}

// ---------- WHATSAPP ----------
export function trackWhatsAppClick() {
  trackEvent("whatsapp_click", { location: window.location.pathname });
}

// ---------- SCROLL ----------
export function initScrollTracking() {
  let fired25 = false,
    fired50 = false,
    fired75 = false;

  window.addEventListener("scroll", () => {
    const scroll =
      (window.scrollY + window.innerHeight) /
      document.documentElement.scrollHeight;

    if (scroll > 0.25 && !fired25) {
      trackEvent("scroll_25");
      fired25 = true;
    }
    if (scroll > 0.5 && !fired50) {
      trackEvent("scroll_50");
      fired50 = true;
    }
    if (scroll > 0.75 && !fired75) {
      trackEvent("scroll_75");
      fired75 = true;
    }
  });
}

// ---------- AUTO BUTTON TRACKING ----------
// Only fires for buttons/links that perform a real user action:
// - <a> tags with a valid non-empty href (not just "#")
// - <button> elements that open a dialog/form (data-action="form" or data-action="modal")
// - <button> elements inside a <a> wrapper (delegated nav)
export function initAutoButtonTracking() {
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    const btn = el.closest("button, a") as HTMLElement | null;
    if (!btn) return;

    // Skip explicitly excluded elements
    if (btn.classList.contains("no-track")) return;

    // Skip disabled buttons
    if (btn.hasAttribute("disabled") || (btn as HTMLButtonElement).disabled) return;

    const tag = btn.tagName.toLowerCase();

    if (tag === "a") {
      const href = btn.getAttribute("href") || "";
      // Skip empty href or pure anchor-only links with no real destination
      if (!href || href === "#" || href === "javascript:void(0)") return;
      // Skip UI-only anchors (skip-to-content, etc.)
      if (href.startsWith("#") && !btn.getAttribute("data-track")) return;
    }

    if (tag === "button") {
      // Only track buttons that have an explicit data-track attribute
      // OR are wrapped inside an <a> tag (navigation delegation)
      // OR have data-action="form" / "modal" / "nav"
      const hasDataTrack = btn.hasAttribute("data-track");
      const hasAction = btn.hasAttribute("data-action");
      const insideLink = !!btn.closest("a[href]");
      if (!hasDataTrack && !hasAction && !insideLink) return;
    }

    const text =
      btn.getAttribute("aria-label") ||
      btn.innerText?.trim() ||
      "unknown_button";

    const label = text.trim().slice(0, 60);

    // Guard: skip if label is useless
    if (!label || label === "unknown_button") return;

    // Fire GA4 button_click event (no duplicate guard needed — native click fires once)
    if (window.gtag) {
      window.gtag("event", "button_click", {
        event_category: "engagement",
        event_label: label,
      });
    }
  });
}

// ---------- ERROR TRACKING ----------
export function initErrorTracking() {
  window.addEventListener("error", (e) => {
    trackEvent("js_error", { message: e.message });
  });
}

// ---------- TEST ----------
export function testTracking() {
  trackEvent("test_event", { test: true });
}
