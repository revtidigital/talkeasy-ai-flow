import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";

// Eagerly loaded - critical for initial render
import Index from "./pages/Index";

// Lazy loaded - non-critical routes for better performance
const NotFound = lazy(() => import("./pages/NotFound"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const LiveChat = lazy(() => import("./pages/LiveChat"));
const OmniChannel = lazy(() => import("./pages/OmniChannel"));
const PreChatForms = lazy(() => import("./pages/PreChatForms"));
const TeamReports = lazy(() => import("./pages/TeamReports"));
const AgentReports = lazy(() => import("./pages/AgentReports"));
const CSATReport = lazy(() => import("./pages/CSATReport"));
const InboxReports = lazy(() => import("./pages/InboxReports"));
const WhatsAppAIChatbot = lazy(() => import("./pages/WhatsAppAIChatbot"));
const WhatsAppShop = lazy(() => import("./pages/WhatsAppShop"));
const WhatsAppMarketing = lazy(() => import("./pages/WhatsAppMarketing"));
const AgentCapacity = lazy(() => import("./pages/AgentCapacity"));
const PrivateNotes = lazy(() => import("./pages/PrivateNotes"));
const LiveView = lazy(() => import("./pages/LiveView"));
const Teams = lazy(() => import("./pages/Teams"));

const queryClient = new QueryClient();

// Fallback component for lazy loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-label="Loading page">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
          <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="/chatbot" element={<PageTransition><Chatbot /></PageTransition>} />
          <Route path="/live-chat" element={<PageTransition><LiveChat /></PageTransition>} />
          <Route path="/omni-channel" element={<PageTransition><OmniChannel /></PageTransition>} />
          <Route path="/pre-chat-forms" element={<PageTransition><PreChatForms /></PageTransition>} />
          <Route path="/team-reports" element={<PageTransition><TeamReports /></PageTransition>} />
          <Route path="/agent-reports" element={<PageTransition><AgentReports /></PageTransition>} />
          <Route path="/csat-report" element={<PageTransition><CSATReport /></PageTransition>} />
          <Route path="/inbox-reports" element={<PageTransition><InboxReports /></PageTransition>} />
          <Route path="/whatsapp-ai-chatbot" element={<PageTransition><WhatsAppAIChatbot /></PageTransition>} />
          <Route path="/whatsapp-shop" element={<PageTransition><WhatsAppShop /></PageTransition>} />
          <Route path="/whatsapp-marketing" element={<PageTransition><WhatsAppMarketing /></PageTransition>} />
          <Route path="/agent-capacity" element={<PageTransition><AgentCapacity /></PageTransition>} />
          <Route path="/private-notes" element={<PageTransition><PrivateNotes /></PageTransition>} />
          <Route path="/live-view" element={<PageTransition><LiveView /></PageTransition>} />
          <Route path="/teams-2" element={<PageTransition><Teams /></PageTransition>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  // Loading screen disabled to improve LCP (was adding 1.5s delay)
  const [isLoading] = useState(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen key="loading" />}
          </AnimatePresence>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {/* Header outside PageTransition to maintain fixed positioning */}
            <Header />
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;