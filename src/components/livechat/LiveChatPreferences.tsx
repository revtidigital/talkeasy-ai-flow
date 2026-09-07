import { motion } from "framer-motion";
import { MessageSquare, Clock, History, Zap } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "In-Product Support",
    description: "Provide help exactly when users need it, right inside your product.",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description: "Let customers reach out on their schedule with async and real-time options.",
  },
  {
    icon: History,
    title: "Persistent Chat History",
    description: "Keep conversation context so customers never have to repeat themselves.",
  },
  {
    icon: Zap,
    title: "Real-Time Conversations",
    description: "Enable seamless, instant communication between agents and customers.",
  },
];

const LiveChatPreferences = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container-tight">
        <motion.div
          title="Deliver personalized support with flexible live chat preferences in ConverseAI"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Chat the Way Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Customers Prefer
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet your customers where they are with flexible, personalized communication options.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              title={feature.title}
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveChatPreferences;
