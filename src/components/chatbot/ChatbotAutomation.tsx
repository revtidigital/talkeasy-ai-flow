import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, MessageCircle, Settings, Smartphone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const ChatbotAutomation = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Harness the Power of{" "}
              <span className="gradient-text">AI-Driven Automation</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mobile Preview */}
          <AnimatedSection delay={0.1}>
            <div className="relative flex justify-center">
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[560px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full z-10" />
                
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 rounded-sm bg-foreground/60" />
                      <div className="w-4 h-2 rounded-sm bg-foreground/60" />
                      <div className="w-6 h-3 rounded-sm bg-foreground/60" />
                    </div>
                  </div>

                  {/* Chat Header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">ConverseAI</p>
                      <p className="text-xs text-green-500">Active now</p>
                    </div>
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 h-[380px] overflow-hidden">
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                        <p className="text-xs">Welcome! How can I assist you today? 🎉</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="gradient-bg text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                        <p className="text-xs">Need help with my subscription</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                        <p className="text-xs">I can help with that! Your current plan is Pro. Would you like to:</p>
                        <div className="mt-2 space-y-2">
                          <button className="w-full text-left text-xs bg-white px-3 py-2 rounded-lg border hover:border-primary transition-colors">
                            📊 View plan details
                          </button>
                          <button className="w-full text-left text-xs bg-white px-3 py-2 rounded-lg border hover:border-primary transition-colors">
                            ⬆️ Upgrade plan
                          </button>
                          <button className="w-full text-left text-xs bg-white px-3 py-2 rounded-lg border hover:border-primary transition-colors">
                            💳 Update payment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-xs outline-none"
                        disabled
                      />
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 -left-4 glass-card rounded-xl px-4 py-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Mobile Ready</span>
                </div>
              </div>

              <div className="absolute bottom-20 -right-4 glass-card rounded-xl px-4 py-3 shadow-lg animate-float-delayed">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-mint" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Bot className="w-4 h-4" />
                Automated Support
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold">
                Automated Chat for Seamless Support
              </h3>

              <p className="text-lg text-muted-foreground">
                Streamline customer service with always-on AI chat support. Our intelligent 
                automation handles inquiries 24/7, ensuring your customers get instant 
                responses while reducing operational costs.
              </p>

              <ul className="space-y-4">
                {[
                  "Instant response to common questions",
                  "Smart ticket routing and escalation",
                  "Seamless handoff to human agents",
                  "Multi-platform integration",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-mint" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/whatsapp-ai-chatbot">
                <Button variant="hero" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ChatbotAutomation;
