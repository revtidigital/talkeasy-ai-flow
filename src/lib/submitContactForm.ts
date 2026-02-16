import { supabase } from "@/integrations/supabase/client";

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

  const { data, error } = await supabase.functions.invoke("send-contact-email", {
    body: {
      ...payload,
      ...utm,
    },
  });

  if (error) {
    throw new Error("Submission failed");
  }

  if (data && !data.success) {
    throw new Error(data.error || "Submission failed");
  }
};
