
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollToDetect: () => void;
}

const HeroSection = ({ scrollToDetect }: HeroSectionProps) => {
  return (
    <section 
      id="home" 
      className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 md:px-8 py-20 md:py-32"
    >
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
          Advanced DeepFake Detection
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Our cutting-edge AI technology helps you identify manipulated media with over 95% accuracy. 
          Protect yourself from misinformation in today's digital world.
        </p>
        <Button 
          onClick={scrollToDetect}
          size="lg"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
        >
          Start Detection Now
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-24 h-24 rounded-full bg-teal-300/20 blur-xl hidden md:block"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-blue-300/20 blur-xl hidden md:block"></div>
    </section>
  );
};

export default HeroSection;
