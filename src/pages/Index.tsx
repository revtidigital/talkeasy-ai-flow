import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import FeaturesGrid from "@/components/FeaturesGrid";
import UserBehaviorInsight from "@/components/UserBehaviorInsight";
import ProductModules from "@/components/ProductModules";
import MidCTA from "@/components/MidCTA";
import WhyConverseAI from "@/components/WhyConverseAI";
import HowItWorks from "@/components/HowItWorks";
import MobileExperience from "@/components/MobileExperience";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TrustSignals />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <FeaturesGrid />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <UserBehaviorInsight />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ProductModules />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <MidCTA />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <WhyConverseAI />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <MobileExperience />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <FinalCTA />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
