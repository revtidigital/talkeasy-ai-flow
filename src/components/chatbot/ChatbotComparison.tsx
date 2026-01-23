import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Zap, Clock, Brain, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormDialog from "@/components/ContactFormDialog";

const ChatbotComparison = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Transform Customer Interactions with{" "}
              <span className="gradient-text">AI</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See the difference between traditional chatbots and ConverseAI's intelligent solution.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Normal Bot Card */}
          <AnimatedSection delay={0.1}>
            <div className="relative h-full">
              <div className="glass-card rounded-3xl p-8 h-full border-2 border-border/50 opacity-80">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Normal Bot</h3>
                    <p className="text-sm text-muted-foreground">Traditional Chatbot</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">Limited pre-programmed responses</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">Slow resolution times</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">Generic, impersonal interactions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">No context awareness</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">Frustrating user experience</p>
                  </div>
                </div>

                {/* Mockup */}
                <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 text-sm text-muted-foreground">
                        Sorry, I didn't understand that.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 text-sm text-muted-foreground">
                        Please choose from the menu options.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ConverseAI Bot Card */}
          <AnimatedSection delay={0.2}>
            <div className="relative h-full">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet/20 rounded-3xl blur-xl" />
              
              <div className="relative glass-card rounded-3xl p-8 h-full border-2 border-primary/30">
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-violet text-white text-xs font-medium">
                  Recommended
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ConverseAI Bot</h3>
                    <p className="text-sm text-primary">AI-Powered Intelligence</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-mint" />
                    </div>
                    <div>
                      <p className="font-medium">Context-aware responses</p>
                      <p className="text-sm text-muted-foreground">Understands conversation history</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-mint" />
                    </div>
                    <div>
                      <p className="font-medium">Faster resolutions</p>
                      <p className="text-sm text-muted-foreground">Instant, accurate answers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-mint" />
                    </div>
                    <div>
                      <p className="font-medium">Personalized interactions</p>
                      <p className="text-sm text-muted-foreground">Tailored to each user</p>
                    </div>
                  </div>
                </div>

                {/* Mockup */}
                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 text-sm shadow-sm">
                        I see you're asking about your recent order #12345. Let me help! 🎯
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 text-sm shadow-sm">
                        Your package is out for delivery and will arrive by 5 PM today. 📦
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <ContactFormDialog>
                    <Button variant="hero" className="w-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </ContactFormDialog>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Zap, value: "3x", label: "Faster Response" },
              { icon: Brain, value: "95%", label: "Accuracy Rate" },
              { icon: Clock, value: "24/7", label: "Availability" },
              { icon: Sparkles, value: "50%", label: "Cost Reduction" },
            ].map((stat, index) => (
              <div key={index} className="text-center glass-card rounded-2xl p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ChatbotComparison;
