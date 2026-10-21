// Never send form fields, photos, search text, query strings or customer identifiers.
export function trackEvent(name: "generate_lead" | "phone_click" | "email_click" | "quote_request_click") {
  if (typeof window === "undefined") return;
  try { const w = window as Window & {gtag?: (...args: unknown[]) => void}; w.gtag?.("event", name, {page_location: window.location.origin + window.location.pathname}); } catch { /* Measurement must never prevent an enquiry. */ }
}
