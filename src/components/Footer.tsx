import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.svg";
import metaTechProvider from "@/assets/meta-tech-provider.jpg";

const Footer = () => {
  const footerLinks = {
    Products: [
      { label: "Chatbot", href: "/chatbot", isRoute: true },
      { label: "Live Chat", href: "/live-chat", isRoute: true },
      { label: "Omni Channel", href: "/omni-channel", isRoute: true },
      { label: "WhatsApp AI", href: "/whatsapp-ai-chatbot", isRoute: true },
    ],
    Company: [
      { label: "About Us", href: "/about-us", isRoute: true },
      { label: "Contact Us", href: "/contact-us", isRoute: true },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1BTGfP9JgU/", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@theconverseai", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/theconverseai/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/theconverseai", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-footer text-primary-foreground">
      <div className="container-tight py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <img 
                src={logoIcon} 
                alt="ConverseAI" 
                className="h-12 w-auto"
              />
            </a>
            <p className="text-sm text-footer-text leading-relaxed mb-6">
              We help businesses <span className="font-semibold text-primary-foreground">talk better with their customers</span>. We give them powerful tools to have real conversations, keep customers happy, and grow their business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@theconverseai.com" className="text-footer-text hover:text-primary-foreground transition-colors">
                  contact@theconverseai.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919982323333" className="text-footer-text hover:text-primary-foreground transition-colors">
                    +91-9982323333
                  </a>
                  <a href="tel:+917023084065" className="text-footer-text hover:text-primary-foreground transition-colors">
                    +91-7023084065
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-footer-text">
              A Product by <a href="https://revtidigital.com/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground font-medium hover:text-primary transition-colors">Revti Digital</a>
            </span>
          </div>
          
          <div className="flex items-center">
            <img 
              src={metaTechProvider} 
              alt="Meta Tech Provider" 
              className="h-12 w-auto rounded-lg"
            />
          </div>
          
          <p className="text-sm text-footer-text">
            © 2025 ConverseAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;