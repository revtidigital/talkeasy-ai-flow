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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustSignals />
        <FeaturesGrid />
        <UserBehaviorInsight />
        <ProductModules />
        <MidCTA />
        <WhyConverseAI />
        <HowItWorks />
        <MobileExperience />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
