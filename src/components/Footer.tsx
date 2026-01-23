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
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-violet to-primary" />
      
      <div className="container-tight py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-5">
              <img 
                src={logoIcon} 
                alt="ConverseAI" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-footer-text leading-relaxed mb-6 max-w-xs">
              We help businesses <span className="font-semibold text-primary-foreground">talk better with their customers</span>. We give them powerful tools to have real conversations, keep customers happy, and grow their business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Products</h3>
            <ul className="space-y-3">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm group">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <a href="mailto:contact@theconverseai.com" className="text-footer-text hover:text-primary transition-colors">
                  contact@theconverseai.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm group">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919982323333" className="text-footer-text hover:text-primary transition-colors">
                    +91-9982323333
                  </a>
                  <a href="tel:+917023084065" className="text-footer-text hover:text-primary transition-colors">
                    +91-7023084065
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-footer-text order-2 md:order-1">
            A Product by <a href="https://revtidigital.com/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground font-medium hover:text-primary transition-colors">Revti Digital</a>
          </span>
          
          <div className="flex items-center order-1 md:order-2">
            <img 
              src={metaTechProvider} 
              alt="Meta Tech Provider" 
              className="h-10 w-auto rounded-lg"
            />
          </div>
          
          <p className="text-sm text-footer-text order-3">
            © 2025 ConverseAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;