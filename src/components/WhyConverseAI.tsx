import { Zap, Users, Lock, LineChart } from "lucide-react";

const WhyConverseAI = () => {
  const advantages = [
    {
      icon: Zap,
      title: "Faster Support Resolution",
      description: "Reduce response times by 80% with AI-powered instant answers to common questions.",
    },
    {
      icon: Users,
      title: "AI + Human Collaboration",
      description: "Perfect balance between automation efficiency and human empathy when it matters most.",
    },
    {
      icon: Lock,
      title: "Secure & Scalable Backend",
      description: "Enterprise-grade security with a modern architecture built to handle millions of conversations.",
    },
    {
      icon: LineChart,
      title: "Real-Time Insights",
      description: "Make data-driven decisions with comprehensive analytics and customer behavior tracking.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Built for businesses that{" "}
              <span className="gradient-text">value their customers</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've helped thousands of businesses transform their customer experience 
              with intelligent automation that doesn't compromise on quality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "80%", label: "Faster resolution" },
                { value: "45%", label: "Cost reduction" },
                { value: "98%", label: "Customer satisfaction" },
                { value: "3x", label: "Team productivity" },
              ].map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="glass-card-hover rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyConverseAI;
