import { Bot, Users, MessageCircle, Globe, FileText, Shield } from "lucide-react";
import { memo } from "react";

/* ✅ MOVE THIS OUTSIDE */
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

const FeaturesGrid = memo(() => {
  return (
    <section id="product" className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex px-4 py-2 bg-primary/10 text-primary text-sm mb-6">
            Core Features
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to build{" "}
            <span className="gradient-text">better conversations</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            A complete platform for modern customer engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <article
              key={index}
              className="rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesGrid;