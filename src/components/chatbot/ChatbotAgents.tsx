import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, RefreshCw, Users, Zap, BarChart3, MessageSquare } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormDialog from "@/components/ContactFormDialog";

const ChatbotAgents = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 text-violet text-sm font-medium">
                <Users className="w-4 h-4" />
                AI + Human Collaboration
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Empower Agents for{" "}
                <span className="gradient-text">Superior Service</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                Combine the efficiency of AI with the empathy of human agents. Our intelligent 
                handover system ensures complex issues are seamlessly transferred to your team 
                with full context.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: RefreshCw,
                    title: "Smart Handover System",
                    description: "AI detects when human intervention is needed and transfers with complete context",
                  },
                  {
                    icon: BarChart3,
                    title: "Productivity Tools",
                    description: "Real-time suggestions and knowledge base integration for faster resolutions",
                  },
                  {
                    icon: Headphones,
                    title: "Unified Dashboard",
                    description: "Single view of all conversations across channels with AI assistance",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl glass-card-hover">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ContactFormDialog>
                <Button variant="hero" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </ContactFormDialog>
            </div>
          </AnimatedSection>

          {/* Right Visual */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-primary/20 rounded-3xl blur-2xl" />
              
              <div className="relative glass-card rounded-3xl p-6 overflow-hidden">
                {/* Agent Dashboard Preview */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-primary flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Agent Dashboard</p>
                        <p className="text-xs text-muted-foreground">3 active conversations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500">Online</span>
                    </div>
                  </div>

                  {/* Conversations List */}
                  <div className="space-y-3">
                    {[
                      { name: "Sarah M.", status: "AI Handling", avatar: "👩", priority: "low" },
                      { name: "John D.", status: "Needs Attention", avatar: "👨", priority: "high" },
                      { name: "Emily R.", status: "Transferred", avatar: "👩‍💼", priority: "medium" },
                    ].map((conv, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          conv.priority === "high"
                            ? "bg-destructive/10 border border-destructive/20"
                            : "bg-secondary/50 hover:bg-secondary"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center text-lg">
                          {conv.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{conv.name}</p>
                          <p className="text-xs text-muted-foreground">{conv.status}</p>
                        </div>
                        {conv.priority === "high" && (
                          <Zap className="w-5 h-5 text-destructive animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* AI Suggestion */}
                  <div className="p-4 bg-mint/10 rounded-xl border border-mint/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-mint">AI Suggestion</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          "Based on the conversation, the customer may need help with their 
                          billing cycle. Here's a relevant article..."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                      View Context
                    </button>
                    <button className="flex-1 py-2 px-4 text-xs font-medium gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
                      Take Over
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 shadow-lg animate-float">
                <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                <p className="text-lg font-bold text-primary">2.5 min</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ChatbotAgents;
