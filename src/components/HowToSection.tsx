
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2, CheckSquare } from "lucide-react";

const HowToSection = () => {
  const uploadSteps = [
    { title: "Choose File", description: "Click the upload area to select a video file" },
    { title: "Wait for Processing", description: "Our AI analyzes your video for deepfake signatures" },
    { title: "View Results", description: "See detailed analysis with confidence score and insights" },
    { title: "Take Action", description: "Save the results or try with different media" }
  ];

  return (
    <section id="how-to" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">How To Use</h2>
        
        <div className="flex justify-center">
          <div className="max-w-xl w-full">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md overflow-hidden">
              <div className="bg-teal-500 p-4">
                <h3 className="text-xl font-medium text-white flex items-center">
                  <Upload className="h-5 w-5 mr-2" /> Upload Method
                </h3>
              </div>
              <CardContent className="p-6">
                <ol className="relative border-l border-gray-200 ml-3">
                  {uploadSteps.map((step, index) => (
                    <li key={index} className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full -left-4 ring-4 ring-white">
                        {index + 1}
                      </span>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-medium mb-4 text-center">What to Expect</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Loader2 className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <h4 className="font-medium">Processing Time</h4>
                <p className="text-sm text-gray-600">Analysis typically takes 2-10 seconds depending on video length and complexity.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckSquare className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <h4 className="font-medium">Results Format</h4>
                <p className="text-sm text-gray-600">You'll see an authenticity verdict, confidence score, and specific detection details.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Accuracy Note</h4>
                <p className="text-sm text-gray-600">While highly accurate, results should be considered with context and used responsibly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
