import { Bot, MessageCircle, Phone, ArrowRight } from "lucide-react";

const ProductModules = () => {
  const modules = [
    {
      icon: Bot,
      title: "Conversational AI",
      description: "Deploy intelligent chatbots that learn and improve with every interaction.",
      features: [
        "Natural language understanding",
        "Context-aware responses",
        "Multi-language support",
        "Custom training capabilities",
      ],
      color: "from-primary to-violet",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Connect your team with customers in real-time for personalized support.",
      features: [
        "Team collaboration tools",
        "Canned responses",
        "File sharing",
        "Chat transcripts",
      ],
      color: "from-violet to-pink-soft",
    },
    {
      icon: Phone,
      title: "WhatsApp Automation",
      description: "Scale your WhatsApp conversations with automation and smart routing.",
      features: [
        "Broadcast messaging",
        "Template management",
        "Auto-replies",
        "CRM integration",
      ],
      color: "from-mint to-accent",
    },
  ];

  return (
    <section id="solutions" className="section-padding bg-secondary/30">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Product Suite
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            One platform.{" "}
            <span className="gradient-text">Multiple channels.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Unify all your customer conversations in one powerful platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl overflow-hidden group hover:shadow-glow transition-all duration-500"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${module.color}`} />
              
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
                <p className="text-muted-foreground mb-6">{module.description}</p>

                <ul className="space-y-3 mb-8">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Explore {module.title}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductModules;
