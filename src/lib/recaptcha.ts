declare global {
  interface Window {
    grecaptcha: any;
  }
}

// 🔑 Apni site key yaha daal
const SITE_KEY = "6Ld6E40sAAAAAAayjrv2wh-ZInD0yK12mVNWlmpH";

export const getCaptchaToken = async (action: string = "submit"): Promise<string | null> => {
  try {
    // ❌ Script load hi nahi hua
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return null;
    }

    // ✅ Wait for grecaptcha ready
    await new Promise((resolve) => {
      window.grecaptcha.ready(() => resolve(true));
    });

    // ✅ Generate token
    const token = await window.grecaptcha.execute(SITE_KEY, {
      action,
    });

    return token;
  } catch (error) {
    console.error("Captcha error:", error);
    return null;
  }
};
