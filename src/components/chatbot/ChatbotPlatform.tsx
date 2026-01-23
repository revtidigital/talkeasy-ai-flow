import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Bot, Globe, MessageSquare, Layers } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const ChatbotPlatform = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <AnimatedSection>
            <div className="relative">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-mint/20 rounded-3xl blur-2xl" />
              
              <div className="relative glass-card rounded-3xl p-8">
                {/* Platform Visualization */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Chatbot Module */}
                  <div className="glass-card rounded-xl p-4 border border-primary/20">
                    <Bot className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-sm mb-1">AI Chatbot</h4>
                    <p className="text-xs text-muted-foreground">Intelligent conversations</p>
                    <div className="mt-3 h-2 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-bg rounded-full" />
                    </div>
                  </div>

                  {/* Analytics Module */}
                  <div className="glass-card rounded-xl p-4 border border-mint/20">
                    <BarChart3 className="w-8 h-8 text-mint mb-3" />
                    <h4 className="font-semibold text-sm mb-1">Analytics</h4>
                    <p className="text-xs text-muted-foreground">Real-time insights</p>
                    <div className="mt-3 flex gap-1">
                      {[40, 65, 45, 80, 60].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-mint/30 rounded-t"
                          style={{ height: `${h * 0.4}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Live Chat Module */}
                  <div className="glass-card rounded-xl p-4 border border-violet/20">
                    <MessageSquare className="w-8 h-8 text-violet mb-3" />
                    <h4 className="font-semibold text-sm mb-1">Live Chat</h4>
                    <p className="text-xs text-muted-foreground">Human support</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs">5 agents online</span>
                    </div>
                  </div>

                  {/* Integration Module */}
                  <div className="glass-card rounded-xl p-4 border border-pink-soft/20">
                    <Globe className="w-8 h-8 text-pink-400 mb-3" />
                    <h4 className="font-semibold text-sm mb-1">Integrations</h4>
                    <p className="text-xs text-muted-foreground">Connect everywhere</p>
                    <div className="mt-3 flex -space-x-2">
                      {["🌐", "💬", "📱", "📧"].map((emoji, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs"
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Connection */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Layers className="w-4 h-4" />
                Unified Platform
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Unified Platform for{" "}
                <span className="gradient-text">Growth and Optimization</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                Scale customer operations and optimize interactions with a unified AI platform 
                that connects chatbot, analytics, and live chat.
              </p>

              <p className="text-muted-foreground">
                Our all-in-one solution eliminates the need for multiple tools, providing 
                a seamless experience for both your team and customers.
              </p>

              <ul className="space-y-4">
                {[
                  "Centralized conversation management",
                  "Cross-channel analytics and reporting",
                  "Unified customer profiles",
                  "Scalable infrastructure",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/inbox-reports">
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

export default ChatbotPlatform;
