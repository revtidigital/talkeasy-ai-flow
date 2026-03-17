import { getCaptchaToken } from "./recaptcha";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUQdnx0ZCQhexXrdig76Not9lKpAlcJrld4PtwGgBw-iFL6u8OmmBGPHyxg2mChh5d/exec';

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  countryName?: string;
  product: string;
  subject: string;
  message: string;
  form_source: string;
}

export const submitContactForm = async (payload: ContactPayload): Promise<void> => {

  // 🔥 STEP 1: GET CAPTCHA TOKEN
  const token = await getCaptchaToken("contact_form");

  if (!token) {
    throw new Error("Captcha failed");
  }

  // 🔥 STEP 2: UTM DATA
  const utm = {
    utm_source: localStorage.getItem("utm_source") || "Direct",
    utm_medium: localStorage.getItem("utm_medium") || "N/A",
    utm_campaign: localStorage.getItem("utm_campaign") || "N/A",
    utm_term: localStorage.getItem("utm_term") || "N/A",
    utm_content: localStorage.getItem("utm_content") || "N/A",
    utm_id: localStorage.getItem("utm_id") || "N/A",
  };

  const deviceInfo = navigator.userAgent.substring(0, 200);

  // 🔥 STEP 3: FINAL PAYLOAD
  const finalPayload: Record<string, string> = {
    fullName: payload.fullName || "",
    email: payload.email || "",
    phone: payload.phone || "",
    countryName: payload.countryName || "N/A",
    product: payload.product || "N/A",
    subject: payload.subject || "N/A",
    message: payload.message || "N/A",
    form_source: payload.form_source || "Website",

    // ✅ MOST IMPORTANT
    captcha_token: token,

    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_term: utm.utm_term,
    utm_content: utm.utm_content,
    utm_id: utm.utm_id,
    page_url: window.location.href,
    device_info: deviceInfo,
  };

  const params = new URLSearchParams();
  Object.entries(finalPayload).forEach(([key, value]) => {
    params.append(key, value);
  });

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
};
