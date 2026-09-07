import { MessageSquare, Bot, User, CheckCircle, Bell, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: "01",
      title: "Customer Reaches Out",
      description: "Customer sends a message via your website chat widget or WhatsApp.",
    },
    {
      icon: Bot,
      step: "02",
      title: "AI Engages Instantly",
      description: "Conversational AI understands the query and responds with accurate, helpful answers.",
    },
    {
      icon: User,
      step: "03",
      title: "Agent Steps In",
      description: "When needed, a live agent seamlessly takes over the conversation from the AI.",
    },
    {
      icon: CheckCircle,
      step: "04",
      title: "Issue Resolved",
      description: "The customer's query is resolved efficiently, keeping satisfaction high.",
    },
    {
      icon: Bell,
      step: "05",
      title: "Team Stays Notified",
      description: "Your team receives real-time notifications and can manage all chats in one inbox.",
    },
  ];

  return (
    <section 
        className="section-padding bg-secondary/30"
        title="How ConverseAI AI chatbot platform works for customer engagement"
      >
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple setup,{" "}
            <span className="gradient-text">powerful results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get up and running in minutes with our intuitive platform.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-violet to-mint transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                title={`${step.title} - Step ${step.step} in the ConverseAI workflow`}
              >
                <div className="glass-card-hover rounded-2xl p-6 text-center h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-bg text-xs font-bold text-white">
                    {step.step}
                  </div>

                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 mt-2 group-hover:scale-110 transition-transform duration-300">
                    <step.icon title={step.title} className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Arrow between steps (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
