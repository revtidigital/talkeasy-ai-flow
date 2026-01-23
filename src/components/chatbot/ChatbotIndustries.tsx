import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, GraduationCap, Plane, Building2, Truck, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormDialog from "@/components/ContactFormDialog";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boost sales with personalized product recommendations, order tracking, and instant customer support.",
    color: "from-primary to-violet",
  },
  {
    icon: GraduationCap,
    title: "EdTech",
    description: "Enhance student engagement with AI tutors, course recommendations, and administrative automation.",
    color: "from-mint to-primary",
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Streamline bookings, provide real-time updates, and offer personalized travel recommendations.",
    color: "from-violet to-pink-400",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Qualify leads, schedule viewings, and provide instant property information to prospects.",
    color: "from-primary to-mint",
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Track shipments, handle delivery queries, and automate customer communications at scale.",
    color: "from-mint to-violet",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Simplify claims processing, policy inquiries, and customer onboarding with AI assistance.",
    color: "from-violet to-primary",
  },
];

const ChatbotIndustries = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 text-violet text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Industry Solutions
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Tailored{" "}
              <span className="gradient-text">Industry Solutions</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Purpose-built AI solutions designed for your industry's unique challenges and opportunities.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="group glass-card-hover rounded-2xl p-6 h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                
                <p className="text-muted-foreground">{industry.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <ContactFormDialog>
              <Button variant="hero" size="xl" className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary">
                Request a Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </ContactFormDialog>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ChatbotIndustries;
