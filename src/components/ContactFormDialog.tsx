import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm } from "@/lib/validations/contact";
import { submitContactForm } from "@/lib/submitContactForm";
import PhoneInputField from "@/components/ui/PhoneInputField";

interface ContactFormDialogProps {
  children: React.ReactNode;
}

const ContactFormDialog = ({ children }: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryName: "",
    lookingFor: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

   

    const validation = validateContactForm(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      toast({
        title: "Please fix the errors",
        description: Object.values(validation.errors)[0],
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryName: formData.countryName,
        product: formData.lookingFor || "Not specified",
        subject: formData.subject,
        message: formData.message,
        form_source: "Popup Form Enquiry",
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryName: "",
        lookingFor: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setOpen(false);
    } catch {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Contact Us
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="contact-name" className="sr-only">Your Name (required)</label>
              <Input
                id="contact-name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && <p id="name-error" className="text-xs text-destructive" role="alert">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="contact-email" className="sr-only">Your Email (required)</label>
              <Input
                id="contact-email"
                type="email"
                placeholder="Your Email*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && <p id="email-error" className="text-xs text-destructive" role="alert">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <PhoneInputField
                value={formData.phone}
                onChange={(phone, countryName) =>
                  setFormData({ ...formData, phone, countryName })
                }
                error={errors.phone}
                variant="underline"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-looking-for" className="sr-only">What are you looking for?</label>
              <Select
                value={formData.lookingFor}
                onValueChange={(value) => setFormData({ ...formData, lookingFor: value })}
              >
                <SelectTrigger
                  id="contact-looking-for"
                  className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:ring-0 focus:border-primary text-muted-foreground data-[state=open]:border-primary [&>span]:text-left"
                  aria-label="Select what you're looking for"
                >
                  <SelectValue placeholder="What are you looking for?" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="whatsapp-marketing">WhatsApp Marketing</SelectItem>
                  <SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
                  <SelectItem value="whatsapp-shop">WhatsApp Shop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-subject" className="sr-only">Subject (required)</label>
            <Input
              id="contact-subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              maxLength={200}
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary ${errors.subject ? "border-destructive" : ""}`}
            />
            {errors.subject && <p id="subject-error" className="text-xs text-destructive" role="alert">{errors.subject}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-message" className="sr-only">Tell us about your project</label>
            <Textarea
              id="contact-message"
              placeholder="Tell us about your project"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              maxLength={2000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`min-h-[100px] border border-muted rounded-lg resize-y focus-visible:ring-1 focus-visible:ring-primary ${errors.message ? "border-destructive" : ""}`}
            />
            {errors.message && <p id="message-error" className="text-xs text-destructive" role="alert">{errors.message}</p>}
          </div>

          {/* <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeToTerms: checked as boolean })
              }
              className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              aria-describedby="terms-description"
            />
            <label
              htmlFor="terms"
              id="terms-description"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              I agree to the terms of this Privacy Policy
            </label>
          </div> */}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
