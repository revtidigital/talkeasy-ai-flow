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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm } from "@/lib/validations/contact";

interface ContactFormDialogProps {
  children: React.ReactNode;
}

const ContactFormDialog = ({ children }: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lookingFor: "",
    subject: "",
    message: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Please accept the terms",
        description: "You must agree to the Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

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

    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      lookingFor: "",
      subject: "",
      message: "",
      agreeToTerms: false,
    });
    setErrors({});
    setOpen(false);
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
              <label htmlFor="contact-phone" className="sr-only">Phone Number (required)</label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={20}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary ${errors.phone ? "border-destructive" : ""}`}
              />
              {errors.phone && <p id="phone-error" className="text-xs text-destructive" role="alert">{errors.phone}</p>}
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
                  <SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
                  <SelectItem value="whatsapp-automation">WhatsApp Automation</SelectItem>
                  <SelectItem value="customer-support">Customer Support Solution</SelectItem>
                  <SelectItem value="lead-generation">Lead Generation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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

          <div className="flex items-center space-x-2">
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
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg"
            >
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
