import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Image, Video, Check, X } from "lucide-react";
import { analyzeImage, analyzeVideo } from "@/utils/mlModelApi";

const MediaUploadSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("video");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isPredictionDone: boolean;
    isReal: boolean;
    confidence: number;
    details?: string;
  } | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 100 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Videos must be smaller than 100MB",
        });
        return;
      }

      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Images must be smaller than 20MB",
        });
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    const fileToAnalyze = activeTab === "video" ? videoFile : imageFile;
    if (!fileToAnalyze) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: `Please select a ${activeTab} to analyze`,
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      let analysisResult;
      
      if (activeTab === "video") {
        analysisResult = await analyzeVideo(fileToAnalyze);
      } else {
        analysisResult = await analyzeImage(fileToAnalyze);
      }
      
      setResult({
        isPredictionDone: true,
        isReal: analysisResult.isReal,
        confidence: analysisResult.confidence,
        details: analysisResult.details
      });

      toast({
        title: "Analysis Complete",
        description: `The ${activeTab} has been analyzed successfully.`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileSelect = () => {
    if (activeTab === "video" && videoInputRef.current) {
      videoInputRef.current.click();
    } else if (activeTab === "image" && imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <section id="detect" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="section-title">Upload Media for Analysis</h2>
      <p className="text-center text-gray-700 mb-10">
        Select a video or image file to check for deepfake manipulations
      </p>

      <Tabs 
        defaultValue="video" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="video">Video Analysis</TabsTrigger>
          <TabsTrigger value="image">Image Analysis</TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-2 gap-6">
          <TabsContent value="video" className="m-0">
            <Card className="media-upload-container">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Video Analysis</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload MP4, AVI, or MOV files (max 100MB)
                </p>
                
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                  className="hidden"
                />
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:border-teal-500 transition-colors"
                  onClick={triggerFileSelect}
                >
                  {videoPreview ? (
                    <video 
                      src={videoPreview} 
                      controls 
                      className="max-h-[200px] mx-auto rounded-md mb-4"
                    />
                  ) : (
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  )}
                  <p className="text-sm text-gray-500">
                    {videoFile ? videoFile.name : "Click to browse or drop video here"}
                  </p>
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!videoFile || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!isAnalyzing && <Upload className="mr-2 h-4 w-4" />}
                  {isAnalyzing ? "Analyzing..." : "Analyze Video"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="m-0">
            <Card className="media-upload-container">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Image Analysis</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload JPG, PNG, or WEBP files (max 20MB)
                </p>
                
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:border-teal-500 transition-colors"
                  onClick={triggerFileSelect}
                >
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-[200px] mx-auto rounded-md mb-4 object-contain" 
                    />
                  ) : (
                    <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  )}
                  <p className="text-sm text-gray-500">
                    {imageFile ? imageFile.name : "Click to browse or drop image here"}
                  </p>
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!imageFile || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!isAnalyzing && <Upload className="mr-2 h-4 w-4" />}
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

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
                      This {activeTab} is{" "}
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
      </Tabs>
    </section>
  );
};

export default MediaUploadSection;
