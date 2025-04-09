
import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MediaUploadSection from "@/components/MediaUploadSection";
import CameraSection from "@/components/CameraSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import ThemeSelector from "@/components/ThemeSelector";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

type Theme = "teal" | "dark" | "blue" | "green" | "purple";

const Index = () => {
  const [theme, setTheme] = useState<Theme>("teal");
  const detectSectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection scrollToDetect={scrollToDetect} />
        
        <div ref={detectSectionRef}>
          <MediaUploadSection />
        </div>
        
        <CameraSection />
        <AboutSection />
        <HowToSection />
        <FaqSection />
        <ThemeSelector currentTheme={theme} onChange={handleThemeChange} />
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
