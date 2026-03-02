// import { supabase } from "@/integrations/supabase/client";
// import { trackEvent } from "@/lib/tracking";

// interface ContactPayload {
//   fullName: string;
//   email: string;
//   phone: string;
//   product: string;
//   subject: string;
//   message: string;
//   form_source: string;
// }

// const getUtmParams = () => ({
//   utm_source: localStorage.getItem("utm_source") || "",
//   utm_medium: localStorage.getItem("utm_medium") || "",
//   utm_campaign: localStorage.getItem("utm_campaign") || "",
//   utm_term: localStorage.getItem("utm_term") || "",
//   utm_content: localStorage.getItem("utm_content") || "",
//   utm_id: localStorage.getItem("utm_id") || "",
// });

// export const submitContactForm = async (payload: ContactPayload): Promise<void> => {
//   const utm = getUtmParams();

//   const { data, error } = await supabase.functions.invoke("send-contact-email", {
//     body: {
//       ...payload,
//       ...utm,
//       page_url: window.location.href,
//       device_info: navigator.userAgent,
//     },
//   });

//   if (error) {
//     throw new Error("Submission failed");
//   }

//   if (data && !data.success) {
//     throw new Error(data.error || "Submission failed");
//   }

//   // Track successful form submission
//   trackEvent("form_submission", {
//     form_source: payload.form_source,
//     product: payload.product,
//   });
// };
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4gVqg-TVpHj_MIdWfgkn0TGQk1NJu1jYFd-O9CiLWoFszrXP5vYKt2Dw4qtPpSalE/exec';

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  product: string;
  subject: string;
  message: string;
  form_source: string;
}

export const submitContactForm = async (payload: ContactPayload): Promise<void> => {
  const utm = {
    utm_source: localStorage.getItem("utm_source") || "Direct",
    utm_medium: localStorage.getItem("utm_medium") || "N/A",
    utm_campaign: localStorage.getItem("utm_campaign") || "N/A",
    utm_term: localStorage.getItem("utm_term") || "N/A",
    utm_content: localStorage.getItem("utm_content") || "N/A",
  };

  const finalPayload = {
    ...payload,
    ...utm,
    page_url: window.location.href,
    device_info: navigator.userAgent,
  };

  // Direct POST to Google Script (Bypassing Supabase)
  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(finalPayload).toString(),
  });
};