declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const getCaptchaToken = async (action: string = "submit"): Promise<string | null> => {
  try {
    // ✅ Check if script loaded
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return null;
    }

    // ✅ Ensure grecaptcha is ready
    return await new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute("6Ld6E40sAAAAAAayjrv2wh-ZInD0yK12mVNWlmpH", {
            action,
          });

          if (!token) {
            console.error("Empty captcha token");
            resolve(null);
          } else {
            resolve(token);
          }
        } catch (err) {
          console.error("Error executing captcha:", err);
          resolve(null);
        }
      });
    });

  } catch (error) {
    console.error("Captcha unexpected error:", error);
    return null;
  }
};
