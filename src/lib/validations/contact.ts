import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, {
      message: "Please enter a valid phone number",
    }),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Message must be less than 2000 characters" })
    .optional()
    .or(z.literal("")),
  product: z.string().optional().or(z.literal("")),
  lookingFor: z.string().optional().or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(200, { message: "Subject must be less than 200 characters" })
    .optional()
    .or(z.literal("")),
  agreeToTerms: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const validateContactForm = (data: Partial<ContactFormData>) => {
  const result = contactFormSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const path = err.path[0] as string;
      if (!errors[path]) {
        errors[path] = err.message;
      }
    });
    return { success: false, errors };
  }
  return { success: true, data: result.data, errors: {} };
};
