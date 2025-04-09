
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:8000";

interface ModelResponse {
  isReal: boolean;
  confidence: number;
  details?: string;
}

export async function analyzeImage(imageData: File): Promise<ModelResponse> {
  try {
    const formData = new FormData();
    formData.append("file", imageData);

    const response = await fetch(`${API_BASE_URL}/analyze/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return {
      isReal: result.is_real || false,
      confidence: result.confidence || 0.5,
      details: result.details || "Analysis complete."
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    toast({
      variant: "destructive",
      title: "Analysis Failed",
      description: "Error connecting to ML model. Is the server running?",
    });
    throw error;
  }
}

export async function analyzeVideo(videoData: File): Promise<ModelResponse> {
  try {
    const formData = new FormData();
    formData.append("file", videoData);

    const response = await fetch(`${API_BASE_URL}/analyze/video`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return {
      isReal: result.is_real || false,
      confidence: result.confidence || 0.5,
      details: result.details || "Video analysis complete."
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

export async function analyzeCameraFrame(imageData: string): Promise<ModelResponse> {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageData.split(',')[1];
    
    const response = await fetch(`${API_BASE_URL}/analyze/camera`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_data: base64Data }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return {
      isReal: result.is_real || false,
      confidence: result.confidence || 0.5,
      details: result.details || "Camera analysis complete."
    };
  } catch (error) {
    console.error("Error analyzing camera frame:", error);
    toast({
      variant: "destructive",
      title: "Analysis Failed",
      description: "Error connecting to ML model. Is the server running?",
    });
    throw error;
  }
}
