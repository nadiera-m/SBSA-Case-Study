import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // 🎤 Handle Voice Recognition
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setQuery(speechText);
      setIsListening(false);
      handleSearch(speechText); // Auto search after voice input
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech recognition error", event.error);
    };

    recognition.start();
  };

  // 🖊️ Handle Text Search
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const response = await axios.post("http://localhost:8000/search", 
        { query: searchQuery }, 
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.images) {
        setImages(response.data.images);
      } else {
        setError(response.data.error || "No matching images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to retrieve images. Check your backend.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 tabIndex="0">🔍 Multi-Modal Image Retrieval</h1>
      
      <div className="search-bar">
        <label htmlFor="searchInput" className="sr-only">Search for an image</label>
        <input 
          id="searchInput"
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for an image (e.g. 'sunset', 'dog')"
          aria-label="Search for an image"
          role="searchbox"
        />
        
        <button onClick={() => handleSearch()} aria-label="Search Button" role="button">
          🔍 Search
        </button>

        {/* 🎤 Speech Recognition Button */}
        <button 
          onClick={handleVoiceSearch} 
          aria-label="Voice Search"
          role="button"
          className={`mic-button ${isListening ? "listening" : ""}`}
        >
          🎙️
        </button>
      </div>

      {loading && <p className="loading" aria-live="polite">Loading images...</p>}
      {error && <p className="error" role="alert">{error}</p>}

      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Result ${index + 1}`} 
              className="rounded-lg shadow-md" 
              tabIndex="0"
              role="img"
            />
          ))
        ) : (
          !loading && !error && <p>No images found. Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
