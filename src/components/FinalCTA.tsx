import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ContactFormDialog from "./ContactFormDialog";

const FinalCTA = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet/10 to-mint/10 rounded-3xl blur-3xl" />
          
          <div className="relative z-10 glass-card rounded-3xl p-12 md:p-16 lg:p-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Get Started Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Start meaningful conversations{" "}
              <span className="gradient-text">today</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust ConverseAI to connect with their 
              customers. No credit card required to get started.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactFormDialog>
                <Button variant="hero" size="xl" className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </ContactFormDialog>
              <ContactFormDialog>
                <Button variant="hero-outline" size="xl" className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent hover:text-primary">
                  Contact Sales
                </Button>
              </ContactFormDialog>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Free 14-day trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
