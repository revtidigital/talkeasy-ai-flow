import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import ChatbotMockup from "./ChatbotMockup";
import ContactFormDialog from "./ContactFormDialog";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />
      
      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                AI-Powered Customer Engagement
              </span>
            </div>
            
            <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI conversations that{" "}
              <span className="gradient-text">feel human.</span>
              <br />
              Business results that{" "}
              <span className="gradient-text">scale.</span>
            </h1>
            
            <p className="animate-fade-up-delayed text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              ConverseAI helps businesses automate, engage, and support customers 
              using intelligent chatbots and real-time messaging.
            </p>
            
            <div className="animate-fade-up-delayed flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <ContactFormDialog>
                <Button variant="hero" size="xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </ContactFormDialog>
              <ContactFormDialog>
                <Button variant="hero-outline" size="xl">
                  <Play className="w-5 h-5" />
                  Book Demo
                </Button>
              </ContactFormDialog>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start animate-fade-up-delayed">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "50M+", label: "Messages Sent" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Chatbot Mockup */}
          <div className="relative lg:pl-8">
            <ChatbotMockup />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
