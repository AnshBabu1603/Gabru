import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
import numpy as np
import cv2
from collections import deque
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from tempfile import NamedTemporaryFile

# FastAPI instance
app = FastAPI()

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to ["http://127.0.0.1:5500"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Select device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"[1] Device Selected: {device}", flush=True)

# Define transformations for video frames
test_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Define Model Class
class DeepfakeDetector(nn.Module):
    def __init__(self):
        super(DeepfakeDetector, self).__init__()
        self.model = models.resnet50(weights=None)  # Load ResNet50 without pre-trained weights
        self.model.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(2048, 2)
        )

    def forward(self, x):
        return self.model(x)

# Load trained model
def load_model(model_path):
    print("[3] Loading Trained Model...", flush=True)
    model = DeepfakeDetector().to(device)
    model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
    model.eval()
    print("    - Model Loaded Successfully!", flush=True)
    return model

model_path = r"C:\Users\coola\OneDrive\Desktop\ML_Project\best_deepfake_model.pth"  # Change to your actual model path
model = load_model(model_path)

# Video Prediction Function
def predict_video(video_path, model, frame_sample_rate=5):
    cap = cv2.VideoCapture(video_path)
    frame_scores = deque()

    if not cap.isOpened():
        return {"error": "Could not open video"}

    frame_count = 0
    with torch.no_grad():
        while True:
            ret, frame = cap.read()
            if not ret:
                break  # End of video

            if frame_count % frame_sample_rate == 0:  # Sample every Nth frame
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
                pil_image = Image.fromarray(frame_rgb)  # Convert to PIL Image

                input_tensor = test_transform(pil_image).unsqueeze(0).to(device)  # Apply transformations

                # Predict
                output = model(input_tensor)
                prob = torch.softmax(output, dim=1)[0]  # Convert to probability
                fake_score = prob[0].item()  # Fake class probability

                frame_scores.append(fake_score)

            frame_count += 1

    cap.release()

    # Compute average fake score
    avg_fake_score = np.mean(frame_scores) if frame_scores else 0

    # Classification logic
    result = "FAKE" if avg_fake_score > 0.5 else "REAL"

    return {"prediction": result}

# API Endpoint for Video Upload
@app.post("/predict-video/")
async def upload_video(file: UploadFile = File(...)):
    try:
        # Use NamedTemporaryFile for better handling
        with NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name  # Get file path

        # Run video prediction
        prediction = predict_video(temp_file_path, model)

        # Remove temp file after processing
        os.remove(temp_file_path)

        return prediction

    except Exception as e:
        return {"error": str(e)}
