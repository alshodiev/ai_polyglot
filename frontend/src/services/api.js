const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getLessons = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching lessons:", error);
        throw error;
    }
};

export const processAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
  
    const response = await fetch("http://127.0.0.1:8000/api/process-audio/", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to process audio");
    }
  
    return await response.json();
  };