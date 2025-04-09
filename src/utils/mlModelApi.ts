
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:8000";

interface ModelResponse {
  isReal: boolean;
  confidence: number;
  details?: string;
}

export async function analyzeVideo(videoData: File): Promise<ModelResponse> {
  try {
    const formData = new FormData();
    formData.append("file", videoData);

    const response = await fetch(`${API_BASE_URL}/predict-video/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    
    // Transform the API response to match our interface
    return {
      isReal: result.prediction === "REAL",
      confidence: result.prediction === "REAL" ? 0.7 : 0.8, // Using fixed confidence since actual model doesn't return it
      details: `Video analysis complete. Model prediction: ${result.prediction}`
    };
  } catch (error) {
    console.error("Error analyzing video:", error);
    toast({
      variant: "destructive",
      title: "Analysis Failed",
      description: "Error connecting to ML model. Is the server running?",
    });
    throw error;
  }
}
