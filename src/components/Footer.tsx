import { forwardRef } from "react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.svg";
import metaTechProvider from "@/assets/meta-tech-provider.jpg";
import facebookIcon from "@/assets/social-facebook.svg";
import youtubeIcon from "@/assets/social-youtube.svg";
import instagramIcon from "@/assets/social-instagram.svg";
import linkedinIcon from "@/assets/social-linkedin.svg";

const Footer = forwardRef<HTMLElement>((_, ref) => {
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
    { icon: facebookIcon, href: "https://www.facebook.com/share/1BTGfP9JgU/", label: "Facebook" },
    { icon: youtubeIcon, href: "https://www.youtube.com/@theconverseai", label: "YouTube" },
    { icon: instagramIcon, href: "https://www.instagram.com/theconverseai/", label: "Instagram" },
    { icon: linkedinIcon, href: "https://www.linkedin.com/company/theconverseai", label: "LinkedIn" },
  ];

  return (
    <footer ref={ref} role="contentinfo" className="bg-footer text-primary-foreground">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-violet to-primary" aria-hidden="true" />
      
      <div className="container-tight py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-5" aria-label="ConverseAI - Go to homepage">
              <img 
                src={logoIcon} 
                alt="ConverseAI Logo"
                className="h-12 w-auto"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-footer-text leading-relaxed mb-6 max-w-xs">
              We help businesses <span className="font-semibold text-primary-foreground">talk better with their customers</span>. We give them powerful tools to have real conversations, keep customers happy, and grow their business.
            </p>
            <nav aria-label="Social media links">
              <ul className="flex gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-full inline-block"
                      aria-label={`Visit our ${social.label} page`}
                    >
                      <img src={social.icon} alt={social.label} className="w-10 h-10" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Products */}
          <nav aria-label="Products navigation">
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Products</h3>
            <ul className="space-y-3">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary inline-block transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-text hover:text-primary inline-block transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-lg mb-5">Contact</h3>
            <address className="not-italic space-y-4">
              <a 
                href="mailto:contact@theconverseai.com" 
                className="text-sm text-footer-text hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
                aria-label="Email us at contact@theconverseai.com"
              >
                contact@theconverseai.com
              </a>
              <a 
                href="tel:+919982323333" 
                className="text-sm text-footer-text hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
                aria-label="Call us at +91 99823 23333"
              >
                +91-9982323333
              </a>
              <a 
                href="tel:+917023084065" 
                className="text-sm text-footer-text hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
                aria-label="Call us at +91 70230 84065"
              >
                +91-7023084065
              </a>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-footer-text order-2 md:order-1">
            A Product by{" "}
            <a 
              href="https://revtidigital.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-foreground font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded"
            >
              Revti Digital
            </a>
          </span>
          
          <div className="flex items-center justify-center order-1 md:order-2">
            <img 
              src={metaTechProvider} 
              alt="Meta Tech Provider Partner Badge" 
              className="h-10 w-auto rounded-lg mx-auto"
              width="80"
              height="40"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          <p className="text-sm text-footer-text order-3">
            © {new Date().getFullYear()} ConverseAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;