import { motion } from "framer-motion";
import logoIcon from "@/assets/logo-icon.svg";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-violet/5 to-background" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-violet/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with pulse animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
          <img 
            src={logoIcon} 
            alt="ConverseAI" 
            className="relative h-16 w-auto"
          />
        </motion.div>
        
        {/* Loading spinner */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 w-10 h-10 rounded-full border-2 border-violet/20 border-b-violet"
          />
          
          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-violet" />
          </motion.div>
        </div>
        
        {/* Loading text with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative overflow-hidden"
        >
          <span className="text-sm font-medium text-muted-foreground">
            Loading experience...
          </span>
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
