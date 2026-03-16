import { Bell, MessageCircle, CheckCircle, Smartphone } from "lucide-react";

const MobileExperience = () => {
  return (
   <section 
  className="section-padding overflow-hidden"
  title="Manage customer conversations on mobile using ConverseAI app"
>
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Mobile First
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Manage conversations{" "}
              <span className="gradient-text">anywhere</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stay connected with your customers on the go. Our mobile app gives you 
              full control over conversations, notifications, and team management.
            </p>

            <div className="space-y-4">
              {[
                { icon: Bell, text: "Real-time push notifications" },
                { icon: MessageCircle, text: "Reply to messages instantly" },
                { icon: CheckCircle, text: "Assign and resolve tickets" },
                { icon: Smartphone, text: "Available on iOS and Android" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon 
                        className="w-5 h-5 text-primary"
                        title={item.text}
                      />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Mockup */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-violet/20 to-mint/20 rounded-full blur-3xl" />
            
            <div className="relative flex justify-center">
              {/* Phone Frame */}
              <div className="relative w-72 h-[580px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground rounded-full z-20" />
                
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-12 bg-primary/5 flex items-center justify-between px-6 pt-8">
                    <span className="text-xs">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-foreground/80 rounded-sm" />
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="gradient-bg px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle 
                        className="w-4 h-4 text-white"
                        title="Customer conversations"
                      />
                   </div>
                    <div>
                      <div className="text-sm font-semibold text-white">ConverseAI</div>
                      <div className="text-xs text-white/70">3 active chats</div>
                    </div>
                  </div>

                  {/* Chat List */}
                  <div className="p-4 space-y-3">
                    {[
                      { name: "Sarah Johnson", message: "Thanks for the quick help!", time: "2m", unread: true },
                      { name: "Mike Chen", message: "When will my order arrive?", time: "15m", unread: true },
                      { name: "Emma Wilson", message: "AI: I can help with that...", time: "1h", unread: false },
                    ].map((chat, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl ${
                          chat.unread ? "bg-primary/10" : "bg-secondary"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">
                          {chat.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{chat.name}</span>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
                        </div>
                        {chat.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Notification Pop-up */}
                  <div className="mx-4 glass-card rounded-xl p-3 shadow-lg animate-bounce-soft">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                        <Bell 
                            className="w-4 h-4 text-white"
                            title="New message notification"
                          />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">New message</div>
                        <div className="text-xs text-muted-foreground">David: Hello, I need...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileExperience;
