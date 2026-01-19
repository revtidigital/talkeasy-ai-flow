import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotHero from "@/components/chatbot/ChatbotHero";
import ChatbotComparison from "@/components/chatbot/ChatbotComparison";
import ChatbotRevolutionize from "@/components/chatbot/ChatbotRevolutionize";
import ChatbotAutomation from "@/components/chatbot/ChatbotAutomation";
import ChatbotAgents from "@/components/chatbot/ChatbotAgents";
import ChatbotPlatform from "@/components/chatbot/ChatbotPlatform";
import ChatbotOfferings from "@/components/chatbot/ChatbotOfferings";
import ChatbotIndustries from "@/components/chatbot/ChatbotIndustries";
import ChatbotFinalCTA from "@/components/chatbot/ChatbotFinalCTA";

const Chatbot = () => {
  return (
    <>
      <Helmet>
        <title>AI Chatbot for Smarter Customer Support | ConverseAI</title>
        <meta
          name="description"
          content="Automate customer support and engagement with ConverseAI's AI-powered chatbot. Deliver faster, smarter, and personalized conversations 24/7."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://talkeasy-ai-flow.lovable.app/chatbot" />
      </Helmet>

      <Header />
      
      <main>
        <ChatbotHero />
        <ChatbotComparison />
        <ChatbotRevolutionize />
        <ChatbotAutomation />
        <ChatbotAgents />
        <ChatbotPlatform />
        <ChatbotOfferings />
        <ChatbotIndustries />
        <ChatbotFinalCTA />
      </main>

      <Footer />
    </>
  );
};

export default Chatbot;
