import { Shield, Zap, Clock } from "lucide-react";
import { memo } from "react";

const TrustSignals = memo(() => {
  const stats = [
    { icon: Clock, value: "99.9%", label: "Uptime Guarantee", ariaLabel: "99.9 percent uptime guarantee" },
    { icon: Zap, value: "<1s", label: "Response Time", ariaLabel: "Less than 1 second response time" },
    { icon: Shield, value: "SOC 2", label: "Enterprise Security", ariaLabel: "SOC 2 certified enterprise security" },
  ];

  return (
    <section className="py-12 border-y border-border bg-secondary/30" aria-labelledby="trust-heading">
      <div className="container-tight">
        <div className="text-center mb-8">
          <h2 id="trust-heading" className="sr-only">Trust and reliability metrics</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by fast-growing teams worldwide
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-8 md:gap-16" role="list" aria-label="Key trust metrics">
          {stats.map((stat, index) => (
            <li
              key={index}
              className="flex items-center gap-4 group"
              aria-label={stat.ariaLabel}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground" aria-hidden="true">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

TrustSignals.displayName = 'TrustSignals';

export default TrustSignals;
