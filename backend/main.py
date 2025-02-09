import os
import clip
import torch
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # Add this to serve images
from pydantic import BaseModel
from PIL import Image
from typing import List

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

IMAGE_DIR = "./images"
image_paths = []
image_features = []

# Serve static images
app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")

class SearchQuery(BaseModel):
    query: str

def load_images():
    """Loads all images from the directory and indexes them."""
    global image_paths, image_features

    all_files = sorted(os.listdir(IMAGE_DIR))
    image_files = [f for f in all_files if f.lower().endswith(('.png', '.jpg', '.jpeg'))]  # Load all images

    image_paths = [os.path.join(IMAGE_DIR, f) for f in image_files]
    features_list = []

    print(f"📂 Indexing {len(image_paths)} images...")

    for img_path in image_paths:
        try:
            image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
            with torch.no_grad():
                feature = model.encode_image(image).cpu().numpy()
            feature = feature / np.linalg.norm(feature)  # Normalize
            features_list.append(feature)
            print(f"✅ Indexed: {img_path}")
        except Exception as e:
            print(f"❌ Skipping {img_path}: {e}")

    image_features = np.vstack(features_list) if features_list else np.array([])

# Load all images on startup
load_images()

@app.post("/search")
async def search_images(data: SearchQuery):
    """Search for images using CLIP based on a text query."""
    query = data.query.strip()
    
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    print(f"🔍 Searching for: {query}")

    try:
        text_tokenized = clip.tokenize([query]).to(device)
        with torch.no_grad():
            text_features = model.encode_text(text_tokenized).cpu().numpy()
        text_features = text_features / np.linalg.norm(text_features)

        similarities = image_features @ text_features.T
        if similarities.size == 0:
            return {"error": "No images found."}

        indices = np.argsort(similarities[:, 0])[::-1][:5]

        if len(indices) == 0 or similarities[indices[0]][0] < 0.1:
            print("❌ No matching images found.")
            return {"error": "No matching images found. Try a different query."}

        results = [f"http://localhost:8000/images/{os.path.basename(image_paths[i])}" for i in indices]
        print(f"✅ Found matches: {results}")
        return {"images": results}

    except Exception as e:
        print(f"❌ Error during search: {e}")
        raise HTTPException(status_code=500, detail=str(e))
