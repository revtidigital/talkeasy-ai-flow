import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const LiveChatTestimonial = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-white/20">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 pt-4">
              "ConverseAI has transformed how we handle customer support. Our response times 
              dropped by 60% and customer satisfaction scores have never been higher. The 
              seamless integration between AI and human agents is a game-changer."
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                SK
              </div>
              <div>
                <p className="font-semibold text-foreground">Sarah Kumar</p>
                <p className="text-sm text-muted-foreground">Head of Customer Success, TechFlow Inc.</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveChatTestimonial;
