import { motion } from "framer-motion";
import { Route, Bot, StickyNote, FileUp, Tags } from "lucide-react";

const features = [
  { icon: Route, label: "Smart Routing" },
  { icon: Bot, label: "AI-Assisted Replies" },
  { icon: StickyNote, label: "Internal Notes" },
  { icon: FileUp, label: "File Sharing" },
  { icon: Tags, label: "Conversation Tags" },
];

const LiveChatSuite = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            title="Explore the full suite of ConverseAI live chat tools"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Beyond Live Chat —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                A Full Suite of Tools
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ConverseAI Live Chat connects messaging, automation, and AI into one unified 
              experience that supercharges your support team's productivity.
            </p>
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  title={feature.label}
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            title="Visual preview of ConverseAI's live chat interface showcasing key features"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-white/20">
              <div className="space-y-4">
                {/* Simulated Chat Interface */}
                <div className="bg-background/80 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">AI Assistant</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "I can help route this to the right team. Would you like me to connect you with billing support?"
                  </p>
                </div>

                <div className="bg-background/80 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <StickyNote className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Internal Note</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer is a VIP - prioritize response
                  </p>
                </div>

                <div className="flex gap-2">
                  <span title="Billing" className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">billing</span>
                  <span title="Urgent" className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">urgent</span>
                  <span title="VIP" className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full">vip</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveChatSuite;
