# SBSA-Case-Study

## Overview
This project is a multi-modal image retrieval system that allows users to search for images using text and speech queries. It leverages OpenAI's CLIP model to perform image-text similarity matching, making it an efficient tool for finding relevant images based on user input.

## Features
- **Text-Based Search**: Users can enter textual descriptions to find matching images.
- **Speech Query Support**: Users can search for images using voice commands, making the system more accessible.
- **Accessibility Assistance**: Designed to help assist disabled users by providing an alternative way to interact with the system using speech.
- **Fast & Efficient Retrieval**: Utilizes CLIP embeddings for rapid image search.
- **Cross-Platform Compatibility**: Works on multiple devices with a web-based interface.

## Installation

### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- Node.js & npm (for the frontend)
- Virtual environment (optional but recommended)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/multi-modal-image-retrieval.git
   cd multi-modal-image-retrieval/backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv .venv
   source .venv/bin/activate  # For macOS/Linux
   .venv\Scripts\activate    # For Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Type a query in the search bar or use the voice search feature to find images.
- Results will be displayed as matching images retrieved from the dataset.

## API Endpoints
- **`POST /search`**: Accepts a text or speech query and returns relevant images.
- **`GET /images/{filename}`**: Serves images stored in the backend.

## Contributing
Feel free to fork this project, submit issues, and contribute by creating pull requests.


## Acknowledgments
- OpenAI for CLIP
- FastAPI for the backend framework
- React for the frontend
