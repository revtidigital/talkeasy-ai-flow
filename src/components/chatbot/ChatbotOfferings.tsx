import { useState } from "react";
import { Brain, MessageSquare, BarChart3, Users, Layers, Shield, MessageCircle, FileText, Globe } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const tabs = [
  { id: "conversation", label: "Conversation Intelligence", icon: Brain },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "agent", label: "Agent Assist", icon: Users },
  { id: "channels", label: "Channels", icon: Globe },
  { id: "integrations", label: "Integrations", icon: Layers },
  { id: "security", label: "Security", icon: Shield },
];

const featureCards = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Real-time chat support to engage customers instantly across your website and apps.",
    href: "/live-chat",
    color: "from-primary to-violet",
  },
  {
    icon: BarChart3,
    title: "Team Reports",
    description: "Track agent productivity, response time, and performance with auto-generated reports.",
    href: "/team-reports",
    color: "from-mint to-primary",
  },
  {
    icon: FileText,
    title: "Private Notes",
    description: "Collaborate internally with private notes, tags, and quick team mentions inside chats.",
    href: "/private-notes",
    color: "from-violet to-pink-400",
  },
  {
    icon: Globe,
    title: "Omni Channel",
    description: "Manage conversations from WhatsApp, website, Facebook, and Instagram in one inbox.",
    href: "/omni-channel",
    color: "from-primary to-mint",
  },
];

const ChatbotOfferings = () => {
  const [activeTab, setActiveTab] = useState("conversation");

  return (
    <section className="section-padding">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              What We Offer
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              What We Are{" "}
              <span className="gradient-text">Offering</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Comprehensive AI-powered solutions designed to transform your customer engagement.
            </p>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "gradient-bg text-white shadow-lg shadow-primary/25"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featureCards.map((card, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Link to={card.href} className="block group">
                <div className="glass-card-hover rounded-2xl p-6 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {card.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore Feature</span>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotOfferings;
