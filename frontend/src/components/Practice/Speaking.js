import React, { useState } from "react";
import "./Speaking.css";

const SpeakingPage = () => {
  const [step, setStep] = useState(1); // Step in 4/3/2 activity
  const [topic, setTopic] = useState("");
  const [recording, setRecording] = useState(null); // To store recording data
  const [feedback, setFeedback] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const topics = [
    "Describe your favorite hobby.",
    "Talk about your hometown.",
    "Explain your daily routine.",
    "Describe a recent trip you went on."
  ];

  const startRecording = () => {
    setIsRecording(true);
    // Logic to start recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Logic to stop recording and save the file
    const fakeRecording = "user_recording_file.mp3"; // Replace with actual recording logic
    setRecording(fakeRecording);
    sendToAgenticAI(fakeRecording);
  };

  const sendToAgenticAI = async (file) => {
    // Simulate sending file to Agentic AI
    console.log("Sending file to AI:", file);

    // Replace with actual API integration
    const fakeFeedback = {
      fluency: "Great pacing, but try reducing pauses.",
      pronunciation: "Clear, but work on 'r' and 'th' sounds.",
      fillerWords: "Used 'um' 3 times and 'like' 2 times.",
    };

    setTimeout(() => {
      setFeedback(fakeFeedback);
    }, 2000);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(1); // Reset to first step
    }
    setFeedback(null);
    setRecording(null);
  };

  const handleTopicChange = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setTopic(randomTopic);
  };

  return (
    <div className="speaking-page">
      <h1>Speaking Practice</h1>

      <div className="step-info">
        <p>Step {step} of 4/3/2 Activity</p>
        <p>{step === 1 ? "4 minutes" : step === 2 ? "3 minutes" : "2 minutes"} Speaking</p>
      </div>

      {!topic && (
        <button className="topic-button" onClick={handleTopicChange}>
          Get Topic
        </button>
      )}

      {topic && (
        <>
          <p className="topic">Topic: {topic}</p>
          <button
            className={`record-button ${isRecording ? "recording" : ""}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </>
      )}

      {recording && !feedback && <p>Analyzing your recording...</p>}

      {feedback && (
        <div className="feedback">
          <h3>AI Feedback</h3>
          <p><strong>Fluency:</strong> {feedback.fluency}</p>
          <p><strong>Pronunciation:</strong> {feedback.pronunciation}</p>
          <p><strong>Filler Words:</strong> {feedback.fillerWords}</p>
        </div>
      )}

      {topic && recording && feedback && (
        <button className="next-button" onClick={handleNextStep}>
          Next Step
        </button>
      )}
    </div>
  );
};

export default SpeakingPage;
