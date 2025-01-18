import React, { useState } from "react";
import "./Writing.css";

const WritingPage = () => {
  const [exercise, setExercise] = useState(null);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer logic
  React.useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStartExercise = (type) => {
    setExercise(type);
    setText("");
    setWordCount(0);
    setTimer(600); // Reset timer to 10 minutes
    setIsTimerRunning(false);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setWordCount(value.split(" ").filter((word) => word !== "").length);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  return (
    <div className="writing-page">
      <h1>Writing Practice</h1>
      <div className="exercise-selector">
        <button onClick={() => handleStartExercise("10min")}>10-Minute Writing</button>
        <button onClick={() => handleStartExercise("repeated")}>Repeated Writing</button>
      </div>

      {exercise === "10min" && (
        <div className="exercise">
          <h2>10-Minute Writing</h2>
          <p>Write as much as you can in 10 minutes. Don't worry about mistakes—just focus on writing.</p>
          <div className="timer">
            <p>Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</p>
            {!isTimerRunning ? (
              <button onClick={handleStartTimer}>Start</button>
            ) : (
              <button onClick={handleStopTimer}>Pause</button>
            )}
          </div>
          <textarea
            placeholder="Start writing here..."
            value={text}
            onChange={handleTextChange}
            disabled={!isTimerRunning}
          />
          <p>Word Count: {wordCount}</p>
        </div>
      )}

      {exercise === "repeated" && (
        <div className="exercise">
          <h2>Repeated Writing</h2>
          <p>Rewrite a piece of text to improve accuracy and fluency.</p>
          <textarea
            placeholder="Write here..."
            value={text}
            onChange={handleTextChange}
          />
          <p>Word Count: {wordCount}</p>
        </div>
      )}
    </div>
  );
};

export default WritingPage;
