import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Chatbot from "./pages/Chatbot";
import LiveChat from "./pages/LiveChat";
import OmniChannel from "./pages/OmniChannel";
import PreChatForms from "./pages/PreChatForms";
import TeamReports from "./pages/TeamReports";
import AgentReports from "./pages/AgentReports";
import CSATReport from "./pages/CSATReport";
import InboxReports from "./pages/InboxReports";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
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
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
