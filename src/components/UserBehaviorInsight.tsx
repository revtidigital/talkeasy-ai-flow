import { MessageSquare, TrendingUp, Clock, Smile } from "lucide-react";

const UserBehaviorInsight = () => {
  const benefits = [
    { icon: MessageSquare, text: "Faster responses" },
    { icon: TrendingUp, text: "Higher engagement" },
    { icon: Smile, text: "Better conversions" },
    { icon: Clock, text: "24/7 availability" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary via-violet to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 right-10 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white rounded-full" />
      </div>

      <div className="container-tight relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            Industry Insight
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            9 out of 10
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 mb-12">
            users prefer chat over calls or emails
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserBehaviorInsight;
