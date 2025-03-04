import React, { useState, useEffect } from "react";

const VoiceInput = ({ onVoiceInput, onEqualsCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = true;

  useEffect(() => {
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.resultIndex][0].transcript;
      setTranscript(currentTranscript);
      console.log("Recognized Text: ", currentTranscript); // Debugging line
      onVoiceInput(currentTranscript);

      if (currentTranscript.toLowerCase().includes("equals") || currentTranscript.toLowerCase().includes("equal")) {
        console.log("Equals command detected"); 
        onEqualsCommand();
      }
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in speech recognition: ", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, [isListening, onVoiceInput, onEqualsCommand]);

  const toggleListening = () => {
    if (!isListening) {
        setIsListening(true);
    } else {
        setIsListening(false);
    }
  };

  return (
    <div>
      <button className="recipe__button" onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p style={{ color: "whitesmoke" }}>Recognized Text: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
