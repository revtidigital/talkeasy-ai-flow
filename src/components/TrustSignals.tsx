import { Shield, Zap, Clock } from "lucide-react";

const TrustSignals = () => {
  const stats = [
    { icon: Clock, value: "99.9%", label: "Uptime Guarantee" },
    { icon: Zap, value: "<1s", label: "Response Time" },
    { icon: Shield, value: "SOC 2", label: "Enterprise Security" },
  ];

  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container-tight">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by fast-growing teams worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
