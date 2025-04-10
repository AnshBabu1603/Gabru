
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MediaUploadSection from "@/components/MediaUploadSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import ThemeSelector from "@/components/ThemeSelector";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

type Theme = "teal" | "dark" | "blue" | "green" | "purple";

const Index = () => {
  const [theme, setTheme] = useState<Theme>("teal");
  const [isLoading, setIsLoading] = useState(true);
  const detectSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Apply theme to body
    const body = document.body;
    body.className = ""; // Clear existing theme classes
    
    switch (newTheme) {
      case "teal":
        body.classList.add("bg-teal-gradient");
        break;
      case "dark":
        body.classList.add("bg-dark-gradient", "text-white");
        break;
      case "blue":
        body.classList.add("bg-blue-gradient", "text-white");
        break;
      case "green":
        body.classList.add("bg-green-gradient", "text-white");
        break;
      case "purple":
        body.classList.add("bg-purple-gradient", "text-white");
        break;
      default:
        body.classList.add("bg-teal-gradient");
    }
  };
  
  const scrollToDetect = () => {
    detectSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Loading screen variants
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" } 
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            key="loading"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 1],
                opacity: [0, 1, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="text-5xl font-bold text-teal-500"
            >
              Gabru
              <span className="ml-2 inline-block w-3 h-3 bg-teal-500 rounded-full animate-bounce"></span>
              <span className="ml-1 inline-block w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="ml-1 inline-block w-3 h-3 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleBackground theme={theme} />
      
      <motion.div 
        className="min-h-screen flex flex-col"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <Header />
        
        <main className="flex-grow">
          <HeroSection scrollToDetect={scrollToDetect} />
          
          <div ref={detectSectionRef}>
            <MediaUploadSection />
          </div>
          
          <AboutSection />
          <HowToSection />
          <FaqSection />
          <ThemeSelector currentTheme={theme} onChange={handleThemeChange} />
        </main>
        
        <Chatbot />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
