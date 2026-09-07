import AnimatedSection from "@/components/AnimatedSection";
import { MessageSquare, TrendingUp, Users, Zap } from "lucide-react";

const ChatbotRevolutionize = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 text-mint text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Revolutionary AI
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Revolutionize Customer Engagement with{" "}
                <span className="gradient-text">AI</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                ConverseAI leverages conversational AI to deliver real-time, intelligent 
                conversations that exceed customer expectations and reduce support workload.
              </p>

              <p className="text-muted-foreground">
                Our advanced natural language processing understands intent, context, and 
                sentiment—enabling meaningful conversations that feel genuinely human while 
                scaling infinitely.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: TrendingUp, label: "40% Higher Engagement" },
                  { icon: Users, label: "60% Less Workload" },
                  { icon: Zap, label: "Instant Responses" },
                  { icon: MessageSquare, label: "Natural Conversations" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span title={item.label} className="text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Visual */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-mint/20 to-primary/20 rounded-3xl blur-2xl" />
              
              <div className="relative glass-card rounded-3xl p-8">
                {/* Conversation Flow Visualization */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                        <p title="I'm looking for a product that matches my style" className="text-sm">
                          I'm looking for a product that matches my style
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-3 border border-primary/20">
                        <p title="Based on your preferences and past purchases, I recommend:" className="text-sm mb-2">
                          Based on your preferences and past purchases, I recommend:
                        </p>
                        <div className="flex gap-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet/30 to-primary/30" />
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mint/30 to-primary/30" />
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-soft/30 to-violet/30" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                        <p title="Perfect! Can you tell me more about the first one?" className="text-sm">
                          Perfect! Can you tell me more about the first one?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Processing Indicator */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-mint/10 rounded-xl border border-mint/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-mint rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span title="AI analyzing context & preferences..." className="text-sm text-mint font-medium">
                      AI analyzing context & preferences...
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 shadow-lg animate-float">
                <p title="Response Time" className="text-xs text-muted-foreground">
                  Response Time
                </p>
                <p title="0.3s" className="text-lg font-bold text-primary">
                  0.3s
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ChatbotRevolutionize;
