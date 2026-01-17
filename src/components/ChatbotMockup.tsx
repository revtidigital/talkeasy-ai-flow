import { useState, useEffect } from "react";
import { Bot, User, Send, Sparkles } from "lucide-react";

const ChatbotMockup = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const messages = [
    { type: "user", text: "Hi! I need help with my order" },
    { type: "ai", text: "Hello! I'd be happy to help you with your order. Could you please share your order number?" },
    { type: "user", text: "It's #ORD-2847" },
    { type: "ai", text: "I found your order! It's currently being prepared and will ship within 24 hours. Would you like tracking updates?" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative animate-slide-in-right">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-violet/20 to-pink-soft/30 rounded-3xl blur-2xl animate-pulse-soft" />
      
      {/* Main Chat Window */}
      <div className="relative glass-card rounded-3xl overflow-hidden shadow-glow">
        {/* Chat Header */}
        <div className="gradient-bg px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">ConverseAI Assistant</h3>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              Online • Typically replies instantly
            </div>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-5 h-5 text-primary-foreground/70" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-6 space-y-4 min-h-[320px] bg-gradient-to-b from-secondary/30 to-background">
          {messages.slice(0, currentMessage + 1).map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-fade-up ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-primary/10"
                    : "gradient-bg"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div
                className={
                  message.type === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                }
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="chat-bubble-ai flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/50 animate-typing" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/50 animate-typing" style={{ animationDelay: "200ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/50 animate-typing" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              disabled
            />
            <button className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground shadow-soft hover:shadow-glow transition-all">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -left-6 glass-card rounded-xl px-4 py-3 shadow-card animate-float">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-3 shadow-card animate-float-delayed">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Response time:</span>
          <span className="text-sm font-bold gradient-text">&lt;1s</span>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMockup;
