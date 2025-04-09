
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const features = [
    "Real-time video analysis",
    "Image forgery detection",
    "Detailed confidence scoring",
    "Privacy-focused processing",
    "Multiple filter options",
    "Browser-based analysis"
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">About Our Technology</h2>
        
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mb-10">
          <CardContent className="p-6 md:p-8">
            <p className="text-lg leading-relaxed text-gray-700">
              DeFakeX uses state-of-the-art deep learning models trained on thousands of real and manipulated media samples. 
              Our algorithm analyzes subtle artifacts in facial movements, lighting inconsistencies, 
              and compression patterns to detect deepfakes with industry-leading accuracy.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex-1 min-w-[280px]">
                <div className="p-4 bg-teal-50 rounded-lg h-full">
                  <h3 className="text-xl font-medium mb-4 text-teal-800">How It Works</h3>
                  <p className="text-gray-700">
                    Our AI models are trained to detect inconsistencies that human eyes might miss:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-sm">Facial feature analysis for unnatural movements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-sm">Pixel-level inconsistency detection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-sm">Temporal coherence verification in videos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-sm">Digital artifact recognition</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex-1 min-w-[280px]">
                <div className="p-4 bg-blue-50 rounded-lg h-full">
                  <h3 className="text-xl font-medium mb-4 text-blue-800">Key Features</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-teal-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Highly Accurate</h3>
              <p className="text-gray-600">
                Our detection technology achieves 95-98% accuracy on standard deepfake benchmarks.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border border-teal-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Privacy Focused</h3>
              <p className="text-gray-600">
                All processing happens in your browser with no storage of uploaded media.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border border-teal-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Processing</h3>
              <p className="text-gray-600">
                Get results in seconds with our optimized analysis algorithms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
