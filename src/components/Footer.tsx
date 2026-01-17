import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const footerLinks = {
    Products: [
      { label: "WhatsApp Marketing", href: "#" },
      { label: "WhatsApp Shop", href: "#" },
      { label: "WhatsApp AI Chatbot", href: "#" },
      { label: "Live Chat", href: "#" },
      { label: "Conversational AI Chatbot", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container-tight py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <img 
                src={logo} 
                alt="ConverseAI" 
                className="h-10 w-auto"
              />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We help businesses <span className="font-semibold text-foreground">talk better with their customers</span>. We give them powerful tools to have real conversations, keep customers happy, and grow their business.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Email:</span>
                <a href="mailto:contact@theconverseai.com" className="text-primary hover:underline">
                  contact@theconverseai.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">Phone:</span>
                <div className="flex flex-col">
                  <a href="tel:+919982323333" className="text-primary hover:underline">
                    +91-9982323333
                  </a>
                  <a href="tel:+917023084065" className="text-primary hover:underline">
                    +91-7023084065
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ConverseAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
