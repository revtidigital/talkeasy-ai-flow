import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuresMenu = {
    products: {
      title: "Products",
      items: [
        { label: "Live Chat", href: "/live-chat" },
        { label: "Pre-Chat Forms", href: "/pre-chat-forms" },
        { label: "Omni Channel", href: "/omni-channel" },
        { label: "Chatbot", href: "/chatbot" },
      ],
    },
    analyse: {
      title: "Analyse",
      items: [
        { label: "Team Reports", href: "/team-reports" },
        { label: "Agent Reports", href: "/agent-reports" },
        { label: "CSAT Report", href: "/csat-report" },
        { label: "Inbox Reports", href: "/inbox-reports" },
      ],
    },
    whatsapp: {
      title: "WhatsApp for Business",
      items: [
        { label: "WhatsApp Shop", href: "#whatsapp-shop" },
        { label: "WhatsApp Marketing", href: "#whatsapp-marketing" },
        { label: "WhatsApp AI Chatbot", href: "#whatsapp-ai-chatbot" },
      ],
    },
    manage: {
      title: "Manage",
      items: [
        { label: "Agent Capacity", href: "#agent-capacity" },
        { label: "Private Notes", href: "#private-notes" },
        { label: "Live View", href: "#live-view" },
        { label: "Teams", href: "#teams" },
      ],
    },
  };

  const productsMenu = [
    { label: "AI Chatbot", href: "/chatbot" },
    { label: "Conversational AI Chatbot", href: "/chatbot" },
    { label: "WhatsApp AI Chatbot", href: "#whatsapp-ai-chatbot" },
    { label: "Live Chat", href: "/live-chat" },
    { label: "Omni Channel", href: "/omni-channel" },
    { label: "Pre-Chat Forms", href: "/pre-chat-forms" },
  ];

  const navLinks = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Features", href: "#features", isRoute: false, hasDropdown: "features" },
    { label: "Products", href: "#products", isRoute: false, hasDropdown: "products" },
    { label: "About Us", href: "/about-us", isRoute: true },
    { label: "Blog", href: "#blog", isRoute: false },
    { label: "Contact Us", href: "/contact-us", isRoute: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isRoute: boolean; hasDropdown?: string }) => {
    if (link.hasDropdown) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (link.isRoute) {
      navigate(link.href);
      setIsMobileMenuOpen(false);
      return;
    }
    if (link.href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null);
    if (href.startsWith("/")) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleMobileMenu = (menuName: string) => {
    setMobileExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/assets/logo.png" 
              alt="ConverseAI" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.hasDropdown)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: activeDropdown === link.hasDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Features Mega Menu */}
                {link.hasDropdown === "features" && activeDropdown === "features" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                    <div className="bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-6 min-w-[750px] animate-fade-in">
                      <div className="grid grid-cols-4 gap-8">
                        {Object.values(featuresMenu).map((column) => (
                          <div key={column.title} className="min-w-[150px]">
                            <h4 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border/50 whitespace-nowrap">
                              {column.title}
                            </h4>
                            <ul className="space-y-1">
                              {column.items.map((item) => (
                                <li key={item.label}>
                                  <button
                                    onClick={() => handleDropdownItemClick(item.href)}
                                    className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 w-full text-left px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                  >
                                    {item.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Products Dropdown */}
                {link.hasDropdown === "products" && activeDropdown === "products" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                    <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border/50 p-4 min-w-[220px] animate-fade-in">
                      <ul className="space-y-1">
                        {productsMenu.map((item) => (
                          <li key={item.label}>
                            <button
                              onClick={() => handleDropdownItemClick(item.href)}
                              className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 w-full text-left px-3 py-2 rounded-lg transition-colors"
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link to="/contact-us">
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-6"
              >
                Start Your Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border animate-fade-up max-h-[80vh] overflow-y-auto">
            <nav className="container-tight py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileMenu(link.hasDropdown!)}
                        className="w-full px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center justify-between"
                      >
                        {link.label}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileExpandedMenus.includes(link.hasDropdown!) ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Mobile Features Accordion */}
                      {link.hasDropdown === "features" && mobileExpandedMenus.includes("features") && (
                        <div className="pl-4 pb-2 space-y-3">
                          {Object.values(featuresMenu).map((column) => (
                            <div key={column.title} className="space-y-1">
                              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-1">
                                {column.title}
                              </h5>
                              {column.items.map((item) => (
                                <button
                                  key={item.label}
                                  onClick={() => {
                                    handleDropdownItemClick(item.href);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Mobile Products Accordion */}
                      {link.hasDropdown === "products" && mobileExpandedMenus.includes("products") && (
                        <div className="pl-4 pb-2">
                          {productsMenu.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => {
                                handleDropdownItemClick(item.href);
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors block"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Start Your Trial
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
