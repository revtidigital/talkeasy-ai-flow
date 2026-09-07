import { motion } from "framer-motion";
import { Inbox, UserCheck, Lightbulb } from "lucide-react";

const cards = [
  {
    icon: Inbox,
    title: "Efficient Multi-Channel Inbox",
    description: "Manage all conversations from email, chat, social, and more in one unified inbox.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: UserCheck,
    title: "Personalized Support with Contextual Data",
    description: "Access customer history, preferences, and behavior data for tailored interactions.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Lightbulb,
    title: "Proactive and Self-Service Solutions",
    description: "Empower customers with knowledge bases, FAQs, and proactive engagement.",
    gradient: "from-amber-500 to-orange-400",
  },
];

const LiveChatManage = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container-tight">
        <motion.div
          title="Manage customer interactions effortlessly with ConverseAI's live chat platform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Manage Customer Interactions{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to deliver exceptional customer experiences at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              title={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveChatManage;
