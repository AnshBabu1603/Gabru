
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Loader2, Check, X } from "lucide-react";

type FilterType = "none" | "grayscale" | "sepia" | "blur";

const filters: Record<FilterType, string> = {
  none: "none",
  grayscale: "grayscale(100%)",
  sepia: "sepia(100%)",
  blur: "blur(5px)",
};

const CameraSection = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("none");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [result, setResult] = useState<{
    isPredictionDone: boolean;
    isReal: boolean;
    confidence: number;
    details?: string;
  } | null>(null);

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setIsInitializing(true);
    
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
      }
      
      setStream(cameraStream);
      setIsCameraStarted(true);
      toast({
        title: "Camera Started",
        description: "Your camera is now active and ready for analysis.",
      });
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access camera. Please check permissions and try again.",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      setIsCameraStarted(false);
      setResult(null);
    }
  };

  const applyFilter = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Apply the current filter to the canvas context
    switch (currentFilter) {
      case "grayscale":
        ctx.filter = "grayscale(100%)";
        break;
      case "sepia":
        ctx.filter = "sepia(100%)";
        break;
      case "blur":
        ctx.filter = "blur(3px)";
        break;
      default:
        ctx.filter = "none";
    }
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a random result
      const isReal = Math.random() > 0.5;
      const confidence = 0.5 + Math.random() * 0.45; // 50-95%
      
      setResult({
        isPredictionDone: true,
        isReal,
        confidence,
        details: isReal 
          ? "Live analysis shows natural facial expressions and consistent lighting patterns."
          : "Analysis detected potential manipulation in facial expressions and unnatural eye movements."
      });

      toast({
        title: "Analysis Complete",
        description: "Live camera capture has been analyzed.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your camera capture.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="section-title">Live Camera Detection</h2>
      <p className="text-center text-gray-700 mb-10">
        Use your webcam for real-time deepfake analysis
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="media-upload-container">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-3">Camera Feed</h3>
            
            <div className="relative mb-4">
              {!isCameraStarted ? (
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full rounded-lg aspect-video object-cover"
                    style={{ filter: filters[currentFilter] }}
                  ></video>
                  <canvas ref={canvasRef} className="hidden"></canvas>
                </>
              )}
            </div>
            
            {!isCameraStarted ? (
              <Button 
                onClick={startCamera} 
                disabled={isInitializing}
                className="w-full"
              >
                {isInitializing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isInitializing ? "Starting Camera..." : "Start Camera"}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(filters).map(([key, _]) => (
                    <Button
                      key={key}
                      variant={currentFilter === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => applyFilter(key as FilterType)}
                      className={currentFilter === key ? "bg-teal-500 hover:bg-teal-600" : ""}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={captureAndAnalyze} 
                    disabled={isAnalyzing}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isAnalyzing ? "Analyzing..." : "Capture & Analyze"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={stopCamera}
                  >
                    Stop Camera
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className={`media-upload-container ${result?.isPredictionDone ? 'animate-fade-in' : 'hidden'}`}>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-6">Analysis Results</h3>
            
            {result?.isPredictionDone && (
              <div className="text-center">
                <div className="mb-4">
                  {result.isReal ? (
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                      <Check className="h-8 w-8" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-2">
                      <X className="h-8 w-8" />
                    </div>
                  )}
                  <h4 className="text-xl font-bold">
                    This feed is{" "}
                    <span className={result.isReal ? "text-green-600" : "text-red-600"}>
                      {result.isReal ? "AUTHENTIC" : "MANIPULATED"}
                    </span>
                  </h4>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Confidence Score</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className={`h-4 rounded-full ${result.isReal ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-right">{Math.round(result.confidence * 100)}%</p>
                </div>
                
                <div className="text-left p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm mb-2 font-medium">Analysis Details:</p>
                  <p className="text-sm text-gray-700">{result.details}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CameraSection;
