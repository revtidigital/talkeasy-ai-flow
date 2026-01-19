import { Brain, MessageSquare, Route, Globe, Shield, BarChart3 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const offerings = [
  {
    icon: Brain,
    title: "Conversational Intelligence",
    description: "Natural language understanding that comprehends context, intent, and sentiment for meaningful conversations.",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant for FAQs & Lead Capture",
    description: "Automatically answer common questions and qualify leads 24/7 without human intervention.",
  },
  {
    icon: Route,
    title: "Smart Routing & Automation",
    description: "Intelligent ticket routing based on query type, priority, and agent availability.",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Communicate with customers in their preferred language with real-time translation.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with GDPR, HIPAA, and SOC 2 compliance built-in.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards with actionable insights on performance and customer satisfaction.",
  },
];

const ChatbotOfferings = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="glass-card-hover rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center mb-4">
                  <offering.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3">{offering.title}</h3>
                
                <p className="text-muted-foreground text-sm">{offering.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotOfferings;
