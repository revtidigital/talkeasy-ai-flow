import { Bot, Users, MessageCircle, Eye, Calendar, BarChart3 } from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot Automation",
      description: "Intelligent conversations that understand context and deliver personalized responses 24/7.",
    },
    {
      icon: Users,
      title: "Live Human Takeover",
      description: "Seamlessly transfer complex queries to human agents when AI needs support.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business API",
      description: "Connect with customers on their favorite messaging platform at scale.",
    },
    {
      icon: Eye,
      title: "Visitor Tracking",
      description: "Understand visitor behavior and engage proactively at the right moment.",
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Let customers book meetings directly through chat without leaving the conversation.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights into conversation metrics, customer satisfaction, and team performance.",
    },
  ];

  return (
    <section id="product" className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to build{" "}
            <span className="gradient-text">better conversations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete platform for modern customer engagement, from first contact to lasting relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card-hover rounded-2xl p-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
