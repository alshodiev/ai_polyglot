import React, { useState, useEffect } from "react";
import "./Speaking.css";
import { processAudio } from "../../services/api"; // Assuming API logic is in services/api.js

const SpeakingPage = () => {
  const [step, setStep] = useState(0); // Current round
  const [topic, setTopic] = useState("");
  const [timer, setTimer] = useState(240); // Default first round duration
  const [timeDurations, setTimeDurations] = useState([240, 180, 120]); // Default durations
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]); // Stores recording data
  const [feedback, setFeedback] = useState(""); // Feedback from backend
  const [overallFeedback, setOverallFeedback] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    let interval;
    if (isRecording && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isRecording) {
      stopRecording();
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const handleTopicChange = () => {
    const topics = [
      "Describe your favorite hobby.",
      "Talk about your hometown.",
      "Explain your daily routine.",
      "Describe a recent trip you went on."
    ];
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
  };

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    recorder.ondataavailable = (event) => setAudioChunks((prev) => [...prev, event.data]);
    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop the MediaRecorder
      console.log("Recording stopped.");
  
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        setRecordings((prev) => [...prev, { round: step, audio: audioURL }]);
        setAudioChunks([]); // Clear audio chunks for the next round
  
        // Analyze the recording
        await analyzeRecording(audioBlob);
      };
    }
  };

  const analyzeRecording = async (audioBlob) => {
    try {
      const result = await processAudio(audioBlob); // API call to backend
      setFeedback(result.feedback);
      setOverallFeedback((prev) => [...prev, result.feedback]);
    } catch (error) {
      console.error("Error analyzing recording:", error);
    }
  };

  const handleNextStep = () => {
    if (step < timeDurations.length - 1) {
      setStep((prev) => prev + 1);
      setTimer(timeDurations[step + 1]); // Move to next duration
      setFeedback(""); // Clear feedback for next round
    } else {
      setStep(0); // Reset after completing all rounds
      console.log("Activity complete!");
    }
  };

  return (
    <div className="speaking-page">
      <h1>4/3/2 Speaking Practice</h1>

      {step === 0 && (
        <div>
          <label>
            First Round Duration (seconds):
            <input
              type="number"
              value={timeDurations[0]}
              onChange={(e) => {
                const first = Number(e.target.value);
                const second = Math.floor(first * 0.75);
                const third = Math.floor(first * 0.5);
                setTimeDurations([first, second, third]);
                setTimer(first);
              }}
              min={60}
              max={600}
            />
          </label>
          <button onClick={handleTopicChange}>Get Topic</button>
          {topic && (
            <>
              <p>Topic: {topic}</p>
              <button onClick={() => setStep(1)}>Start Activity</button>
            </>
          )}
        </div>
      )}

      {step > 0 && step <= timeDurations.length && (
        <div>
          <h2>Round {step}: Speak for {timeDurations[step - 1] / 60} minutes</h2>
          <p>Topic: {topic}</p>
          <p>Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</p>
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      )}

      {feedback && (
        <div className="feedback">
          <h3>AI Feedback</h3>
          <pre>{feedback}</pre>
          <button onClick={handleNextStep}>
            {step < timeDurations.length ? "Next Round" : "Finish Activity"}
          </button>
        </div>
      )}

      {step === 0 && overallFeedback.length > 0 && (
        <div>
          <h3>Overall Feedback</h3>
          {overallFeedback.map((feedback, index) => (
            <div key={index}>
              <p><strong>Round {index + 1}:</strong></p>
              <p>{feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
