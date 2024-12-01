import React, { useState, useEffect, useRef } from 'react';

const TypingSpeedTest = () => {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [currentSentence, setCurrentSentence] = useState('');
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The only thing we have to fear is fear itself."
  ];

  useEffect(() => {
    // Choose a random sentence when the component mounts
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
  }, []);

  useEffect(() => {
    if (isTyping && input === currentSentence) {
      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime) / 1000; // Time in seconds
      const wordsTyped = input.trim().split(/\s+/).length; // Split on whitespace
      const accuracyPercent = (input.length / currentSentence.length) * 100;

      setTime(timeTaken);
      setSpeed((wordsTyped / timeTaken) * 60); // Words per minute
      setAccuracy(accuracyPercent.toFixed(2));
      setIsTyping(false);
    }
  }, [input, currentSentence, isTyping, startTime]);

  const handleChange = (e) => {
    setInput(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      setStartTime(new Date().getTime());
    }
  };

  const handleRestart = () => {
    setInput('');
    setTime(0);
    setSpeed(0);
    setAccuracy(0);
    setIsTyping(false);
    setStartTime(null);

    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);

    // Focus on the input field
    inputRef.current.focus();
  };

  return (
    <div className="typing-speed-test">
      <h1>Typing Speed Test</h1>
      <p className="sentence">{currentSentence}</p>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        rows="5"
        cols="50"
        disabled={isTyping && input !== currentSentence}
      />
      <div className="results">
        {isTyping && input !== currentSentence ? (
          <p>Typing...</p>
        ) : (
          <>
            {input === currentSentence && !isTyping && (
              <>
                <p>Time: {time.toFixed(2)} seconds</p>
                <p>Speed: {speed.toFixed(2)} WPM</p>
                <p>Accuracy: {accuracy}%</p>
              </>
            )}
            <button onClick={handleRestart}>Restart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTest;
