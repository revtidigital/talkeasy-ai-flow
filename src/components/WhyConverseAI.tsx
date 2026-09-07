import { Zap, Users, Lock, MessageCircle } from "lucide-react";

const WhyConverseAI = () => {
  const advantages = [
    {
      icon: Zap,
      title: "Instant AI Responses",
      description: "AI chatbots reply to customer queries instantly, keeping conversations flowing 24/7 without delays.",
    },
    {
      icon: Users,
      title: "AI + Human Collaboration",
      description: "Seamlessly blend AI efficiency with human empathy — agents take over complex conversations when needed.",
    },
    {
      icon: Lock,
      title: "Secure & Reliable Platform",
      description: "Built on a robust, scalable architecture designed to handle high-volume conversations without compromise.",
    },
    {
      icon: MessageCircle,
      title: "Multi-Channel Communication",
      description: "Support customers across WhatsApp, live chat, and other channels — all from one unified platform.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Built for businesses that{" "}
              <span className="gradient-text">value their customers</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ConverseAI brings together conversational AI, live chat, and WhatsApp 
              for Business into one powerful platform — making customer engagement 
              simple, scalable, and effective.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "24/7", label: "Always available" },
                { value: "Multi", label: "Channel support" },
                { value: "Fast", label: "Easy setup" },
                { value: "Unified", label: "Team inbox" },
              ].map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="glass-card-hover rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyConverseAI;
