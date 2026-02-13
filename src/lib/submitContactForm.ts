const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxt6gYfBYRjGPkxsqfPmwIGI0Kkxx7EDZWreWISOIUt-RcRip09Khn01qUFDZMASBWCcA/exec";

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  product: string;
  subject: string;
  message: string;
}

const getUtmParams = () => ({
  utm_source: localStorage.getItem("utm_source") || "",
  utm_medium: localStorage.getItem("utm_medium") || "",
  utm_campaign: localStorage.getItem("utm_campaign") || "",
});

export const submitContactForm = async (payload: ContactPayload): Promise<void> => {
  const utm = getUtmParams();
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("product", payload.product);
  formData.append("subject", payload.subject);
  formData.append("message", payload.message);
  formData.append("utm_source", utm.utm_source);
  formData.append("utm_medium", utm.utm_medium);
  formData.append("utm_campaign", utm.utm_campaign);

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
};
