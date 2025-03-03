import React, { useState, useEffect } from 'react';

const VoiceInput = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Create a SpeechRecognition instance
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Setup recognition properties
  recognition.continuous = true;  // Keep listening until stopped
  recognition.lang = 'en-US';  // You can change this to the language you need
  recognition.interimResults = true; // Show results as the user is speaking

  useEffect(() => {
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.resultIndex][0].transcript;
      setTranscript(currentTranscript);
      onVoiceInput(currentTranscript);  // Pass the transcript to parent component
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in speech recognition: ", event.error);
    };

    return () => {
      recognition.stop();  
    };
  }, [isListening, onVoiceInput]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Recognized Text: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
