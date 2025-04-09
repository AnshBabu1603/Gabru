
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

    // Note: We're using predict-video endpoint for all media types since that's what's available
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
      details: `Analysis complete. Model prediction: ${result.prediction}`
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

export async function analyzeCameraFrame(imageData: string): Promise<ModelResponse> {
  try {
    // Convert base64 data to a Blob then to a File
    const base64Data = imageData.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    
    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    
    // Create a File from the Blob
    const file = new File([blob], "camera-capture.jpg", { type: 'image/jpeg' });
    
    // Use the existing video prediction endpoint since that's what's available
    const formData = new FormData();
    formData.append("file", file);
    
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
      details: `Camera analysis complete. Model prediction: ${result.prediction}`
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
