# SBSA-Case-Study

## Overview
This project is a **multi-modal image retrieval system** that allows users to search for images using **text and speech queries**. It leverages **OpenAI's CLIP model** to perform **image-text similarity matching**, making it an efficient tool for retrieving relevant images based on user input.

## Features
- **Text-Based Search**: Users can enter textual descriptions to find matching images.
- **Speech Query Support**: Users can search for images using **voice commands**.
- **Accessibility Assistance**: Helps users, including those with disabilities, interact using speech.
- **Fast & Efficient Retrieval**: Uses **CLIP embeddings** for rapid image search.
- **Cross-Platform Compatibility**: Works on **multiple devices** with a web-based interface.

---

## **Installation Guide**
### **Prerequisites**
Ensure you have the following installed:
- **Python 3.8+**
- **Node.js & npm** (for the frontend)
- **Virtual environment** (optional but recommended)

### **Backend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/SBSA-Case-Study.git
   cd SBSA-Case-Study
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Create and activate a virtual environment:
   ```sh
   python -m venv .venv
   source .venv/bin/activate  # macOS/Linux
   .venv\Scripts\activate     # Windows
   ```
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Start the backend server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # Installs dependencies from package.json
   ```
3. Start the React app:
   ```sh
   npm start
   ```

---

## **Usage Guide**
1. **Ensure the backend is running**:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
2. Open `http://localhost:3000` in your browser.
3. Type a query in the search bar or use the **voice search feature**.
4. If no images are retrieved, ensure:
   - The backend is reachable (`http://localhost:8000`).
   - The `images` folder contains valid images.
   - There are no **CORS errors** in the browser console.

---

## **API Endpoints**
### **1. Search for Images**
**POST `/search`**  
- **Request Body (JSON)**:
  ```json
  {
    "query": "sunset"
  }
  ```
- **Response (JSON)**:
  ```json
  {
    "images": ["http://localhost:8000/images/sunset.jpg"]
  }
  ```
- Returns a **list of matching image URLs** or an error message.

### **2. Retrieve an Image**
**GET `/images/{filename}`**  
- **Example**: `GET http://localhost:8000/images/sunset.jpg`
- Serves a static image file from the `./images` directory.

---

## **Troubleshooting**
### **Backend Issues**
- **Error: "No images found."**
  - Ensure you have images in the `./images` directory.
  - Restart the backend after adding images.

- **Error: "CUDA out of memory"**
  - If running on a **GPU**, lower the batch size or use **CPU mode** by modifying:
    ```python
    device = "cuda" if torch.cuda.is_available() else "cpu"
    ```
  - Change to:
    ```python
    device = "cpu"
    ```

### **Frontend Issues**
- **CORS Errors**
  - Ensure the backend allows `CORS` (`localhost:8000` should be accessible from `localhost:3000`).
  - Check if the `main.py` contains:
    ```python
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    ```

- **Speech Recognition Not Working**
  - Check browser support for **webkitSpeechRecognition**.

---

## **Contributing**
- Fork this project, submit issues, and contribute by creating pull requests.

---

## **Acknowledgments**
- **OpenAI** for CLIP
- **FastAPI** for the backend framework
- **React** for the frontend

