declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const getCaptchaToken = async (action: string = "submit") => {
  if (!window.grecaptcha) {
    console.error("reCAPTCHA not loaded");
    return null;
  }

  return await window.grecaptcha.execute("YOUR_SITE_KEY", {
    action,
  });
};
