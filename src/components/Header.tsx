import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────────

const featuresMenu = {
  products: {
    title: "Products",
    items: [
      { label: "Chatbot", href: "/chatbot" },
      { label: "Live Chat", href: "/live-chat" },
      { label: "Pre-Chat Forms", href: "/pre-chat-forms" },
      { label: "Omni Channel", href: "/omni-channel" },
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
      { label: "WhatsApp Shop", href: "/whatsapp-shop" },
      { label: "WhatsApp Marketing", href: "/whatsapp-marketing" },
      { label: "WhatsApp AI Chatbot", href: "/whatsapp-ai-chatbot" },
    ],
  },
  manage: {
    title: "Manage",
    items: [
      { label: "Agent Capacity", href: "/agent-capacity" },
      { label: "Private Notes", href: "/private-notes" },
      { label: "Live View", href: "/live-view" },
      { label: "Teams", href: "/teams-2" },
    ],
  },
};

const productsMenu = [
  { label: "Conversational AI Chatbot", href: "/chatbot" },
  { label: "WhatsApp AI Chatbot", href: "/whatsapp-ai-chatbot" },
  { label: "Live Chat", href: "/live-chat" },
  { label: "Omni Channel", href: "/omni-channel" },
  { label: "Pre-Chat Forms", href: "/pre-chat-forms" },
];

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Features", href: "#features", isRoute: false, hasDropdown: "features" },
  { label: "Products", href: "#products", isRoute: false, hasDropdown: "products" },
  { label: "About Us", href: "/about-us", isRoute: true },
  { label: "Blog", href: "https://linen-spoonbill-814762.hostingersite.com/blog/", isRoute: false, isExternal: true },
  { label: "Contact Us", href: "/contact-us", isRoute: true },
];

// ─── Sub-components ─────────────────────────────────────────────────────────────

/** Single accordion row used at every level of the mobile menu */
const AccordionRow = ({
  label,
  isOpen,
  onToggle,
  depth = 0,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  depth?: number;
}) => (
  <button
    onClick={onToggle}
    className={cn(
      "w-full flex items-center gap-1.5 py-2.5 rounded-lg transition-colors text-left",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      depth === 0
        ? "px-4 text-[15px] font-medium text-foreground hover:bg-secondary"
        : depth === 1
        ? "px-3 text-[13.5px] font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5 uppercase tracking-wider"
        : "px-3 text-[13px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/5"
    )}
  >
    <span>{label}</span>
    <ChevronDown
      className={cn(
        "shrink-0",
        depth === 0 ? "w-4 h-4" : "w-3.5 h-3.5"
      )}
    />
  </button>
);

/** Leaf link inside the mobile menu */
const LeafItem = ({
  label,
  href,
  depth = 2,
  onNavigate,
}: {
  label: string;
  href: string;
  depth?: number;
  onNavigate: (href: string) => void;
}) => (
  <button
    onClick={() => onNavigate(href)}
    className={cn(
      "w-full text-left py-2 rounded-lg transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "text-[13px] text-muted-foreground hover:text-primary hover:bg-primary/5",
      depth === 2 ? "pl-5 pr-3" : "pl-8 pr-3"
    )}
  >
    {label}
  </button>
);

// ─── Main Header ────────────────────────────────────────────────────────────────

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile accordion: only one top-level open at a time
  const [openMobileTop, setOpenMobileTop] = useState<string | null>(null);
  // For nested (Features sub-categories): only one sub open at a time
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileTop = (key: string) => {
    setOpenMobileTop((prev) => (prev === key ? null : key));
    setOpenMobileSub(null); // collapse sub when switching top
  };

  const toggleMobileSub = (key: string) => {
    setOpenMobileSub((prev) => (prev === key ? null : key));
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; isRoute: boolean; hasDropdown?: string; isExternal?: boolean }
  ) => {
    if (link.hasDropdown) { e.preventDefault(); return; }
    if (link.isExternal) { setIsMobileMenuOpen(false); return; }
    e.preventDefault();
    if (link.isRoute) { navigate(link.href); setIsMobileMenuOpen(false); return; }
    if (link.href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null);
    if (href.startsWith("/")) navigate(href);
    else if (href.startsWith("#"))
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMobileNavigate = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileTop(null);
    setOpenMobileSub(null);
    navigate(href);
  };

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 backdrop-blur-xl",
        isScrolled ? "bg-white/90 shadow-soft" : "bg-transparent"
      )}
      style={{ height: "80px", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
    >
      <div className="container-tight relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0" aria-label="ConverseAI - Go to homepage">
            <img
              src="/assets/logo.png"
              alt="ConverseAI Logo"
              className="h-8 md:h-10 w-auto"
              width="120"
              height="40"
              fetchPriority="high"
              decoding="sync"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation" style={{ position: "static" }}>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={cn(
                  link.hasDropdown === "features" ? "static" : "relative",
                  link.hasDropdown && "group/dropdown"
                )}
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.hasDropdown)}
                onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1",
                    link.hasDropdown && "after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4"
                  )}
                  aria-expanded={link.hasDropdown ? activeDropdown === link.hasDropdown : undefined}
                  aria-haspopup={link.hasDropdown ? "menu" : undefined}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                </a>

                {/* Features Mega Menu */}
                {link.hasDropdown === "features" && activeDropdown === "features" && (
                  <div className="fixed left-1/2 -translate-x-1/2 z-50" style={{ top: "56px", width: "min(820px, 92vw)" }} role="menu">
                    <div className="bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-6 animate-fade-in">
                      <div className="grid grid-cols-4 gap-6">
                        {Object.values(featuresMenu).map((column) => (
                          <div key={column.title} className={column.title === "WhatsApp for Business" ? "w-[180px]" : "min-w-[180px]"}>
                            <h4 className="text-sm font-semibold text-foreground mb-3">{column.title}</h4>
                            <ul className="space-y-1" role="group" aria-label={column.title}>
                              {column.items.map((item) => (
                                <li key={item.label} role="none">
                                  <button
                                    onClick={() => handleDropdownItemClick(item.href)}
                                    className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 w-full text-left px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    role="menuitem"
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
                  <div className="absolute top-full left-0 z-50" role="menu">
                    <div className="bg-white backdrop-blur-xl rounded-xl shadow-2xl border border-border/50 p-4 min-w-[220px] animate-fade-in">
                      <ul className="space-y-1">
                        {productsMenu.map((item) => (
                          <li key={item.label} role="none">
                            <button
                              onClick={() => handleDropdownItemClick(item.href)}
                              className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 w-full text-left px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              role="menuitem"
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
                aria-label="Start your free trial"
              >
                Start Your Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setOpenMobileTop(null);
              setOpenMobileSub(null);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-xl border-b border-border/60 shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto"
          >
            <nav className="px-3 py-3 flex flex-col gap-0.5" aria-label="Mobile navigation">

              {/* ── Home ── */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-[15px] font-medium text-foreground hover:bg-secondary rounded-lg transition-colors block"
              >
                Home
              </Link>

              {/* ── Features (2-level accordion) ── */}
              <div>
                <AccordionRow
                  label="Features"
                  isOpen={openMobileTop === "features"}
                  onToggle={() => toggleMobileTop("features")}
                  depth={0}
                />
                {openMobileTop === "features" && (
                  <div className="ml-2 mt-0.5 pl-2 flex flex-col gap-0.5 animate-fade-in">
                    {Object.entries(featuresMenu).map(([key, column]) => (
                      <div key={key}>
                        <AccordionRow
                          label={column.title}
                          isOpen={openMobileSub === key}
                          onToggle={() => toggleMobileSub(key)}
                          depth={1}
                        />
                        {openMobileSub === key && (
                          <div className="ml-2 mt-0.5 border-l border-border/60 pl-1 flex flex-col gap-0.5 animate-fade-in">
                            {column.items.map((item) => (
                              <LeafItem
                                key={item.label}
                                label={item.label}
                                href={item.href}
                                depth={2}
                                onNavigate={handleMobileNavigate}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Products (flat accordion) ── */}
              <div>
                <AccordionRow
                  label="Products"
                  isOpen={openMobileTop === "products"}
                  onToggle={() => toggleMobileTop("products")}
                  depth={0}
                />
                {openMobileTop === "products" && (
                  <div className="ml-2 mt-0.5 border-l-2 border-primary/20 pl-2 flex flex-col gap-0.5 animate-fade-in">
                    {productsMenu.map((item) => (
                      <LeafItem
                        key={item.label}
                        label={item.label}
                        href={item.href}
                        depth={2}
                        onNavigate={handleMobileNavigate}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── About Us ── */}
              <Link
                to="/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-[15px] font-medium text-foreground hover:bg-secondary rounded-lg transition-colors block"
              >
                About Us
              </Link>

              {/* ── Blog (external) ── */}
              <a
                href="https://linen-spoonbill-814762.hostingersite.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-[15px] font-medium text-foreground hover:bg-secondary rounded-lg transition-colors block"
              >
                Blog
              </a>

              {/* ── Contact Us ── */}
              <Link
                to="/contact-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-[15px] font-medium text-foreground hover:bg-secondary rounded-lg transition-colors block"
              >
                Contact Us
              </Link>

              {/* ── CTA ── */}
              <div className="mt-3 px-1 pb-2">
                <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    aria-label="Start your free trial"
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
