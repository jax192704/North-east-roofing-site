// Never send form fields, photos, search text, query strings or customer identifiers.
export function trackEvent(name: "generate_lead" | "phone_click" | "email_click" | "whatsapp_click" | "quote_request_click" | "quote_form_start" | "quote_form_error" | "roof_checker_start" | "roof_checker_result") {
  if (typeof window === "undefined") return;
  try { const w = window as Window & {gtag?: (...args: unknown[]) => void}; w.gtag?.("event", name, {page_location: window.location.origin + window.location.pathname}); } catch { /* Measurement must never prevent an enquiry. */ }
}
