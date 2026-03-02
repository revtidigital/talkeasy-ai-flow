const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEsqy_XG_eHhWdN5VEf4iE4TPqMBnf3XOdPDnViP52hfjQMI4GlHsBs9PW8MNS3QiB/exec';

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
  const utm = {
    utm_source: localStorage.getItem("utm_source") || "Direct",
    utm_medium: localStorage.getItem("utm_medium") || "N/A",
    utm_campaign: localStorage.getItem("utm_campaign") || "N/A",
    utm_term: localStorage.getItem("utm_term") || "N/A",
    utm_content: localStorage.getItem("utm_content") || "N/A",
  };

  const finalPayload = {
    ...payload,
    countryName: payload.countryName || "",
    ...utm,
    page_url: window.location.href,
    device_info: navigator.userAgent,
  };

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(finalPayload).toString(),
  });
};
