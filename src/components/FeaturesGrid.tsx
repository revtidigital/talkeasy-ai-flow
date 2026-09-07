import { Bot, Users, MessageCircle, Globe, FileText, Shield } from "lucide-react";
import { memo } from "react";

const FeaturesGrid = memo(() => {
  const features = [
    {
      icon: Bot,
      title: "Conversational AI",
      description: "Deploy intelligent AI chatbots that understand customer intent and deliver helpful responses around the clock.",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Connect your support team with customers in real-time for personalized, human-led conversations.",
    },
    {
      icon: Users,
      title: "WhatsApp for Business",
      description: "Engage customers on WhatsApp with broadcast messaging, template management, and smart routing.",
    },
    {
      icon: Globe,
      title: "Omni-Channel Inbox",
      description: "Manage all customer conversations across every channel from a single unified inbox.",
    },
    {
      icon: FileText,
      title: "Pre-Chat Forms",
      description: "Collect lead details before a conversation starts so your team is always prepared.",
    },
    {
      icon: Shield,
      title: "Team Collaboration",
      description: "Empower your team with private notes, agent assignment, canned responses, and file sharing.",
    },
  ];

  return (
    <section id="product" title="ConverseAI platform features for AI customer engagement" className="section-padding" aria-labelledby="features-heading">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Core Features
          </span>
          <h2 id="features-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to build{" "}
            <span className="gradient-text">better conversations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete platform for modern customer engagement, from first contact to lasting relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Platform features">
          {features.map((feature, index) => (
            <article
              key={index}
              className="glass-card-hover rounded-2xl p-8 group"
              title={`${feature.title} feature of ConverseAI`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <feature.icon className="w-7 h-7 text-primary-foreground" title={feature.title} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesGrid.displayName = 'FeaturesGrid';

export default FeaturesGrid;
