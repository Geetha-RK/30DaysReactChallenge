import React, { useState } from "react";
import "./Day7.scss";
import ButtonsContainer from "../../components/ButtonsContainer/ButtonsContainer";
import Display from "../../components/Display/Display";
import VoiceInput from "../../components/VoiceComponent/VoiceComponent";
import { Link } from "react-router-dom";

const Day7 = () => {
  const [calVal, setCalVal] = useState("");

  const onButtonClick = (buttonText) => {
    if (buttonText === "C") {
      setCalVal(""); // Clear the display
    } else if (buttonText === "=") {
      try {
        const result = eval(calVal); // Evaluate the expression
        setCalVal(result); // Show the result
      } catch (error) {
        setCalVal("Error"); // Handle invalid expressions
      }
    } else {
      setCalVal(calVal + buttonText); // Add the button text to the display
    }
  };

  const handleVoiceInput = (voiceInput) => {
    setCalVal(voiceInput); // Set the voice input directly to the display
  };

  const handleEqualsCommand = () => {
    try {
      const result = eval(calVal); // Evaluate the expression
      setCalVal(result); // Show the result
    } catch (error) {
      setCalVal("Error"); // Handle invalid expressions
    }
  };

//   const onButtonClick = (buttonText) => {
//     if (buttonText === "C") {
//       setCalVal("");
//     } else if (buttonText === "=") {
//       const result = eval(calVal);
//       setCalVal(result);
//     } else {
//       const newDisplayValue = calVal + buttonText;
//       setCalVal(newDisplayValue);
//     }
//   };

  return (
    <>
    <div className="voice-calculator">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Voice Calculator</div>
      </div>
      <div className="calculator">
        <Display displayValue={calVal} />
        <ButtonsContainer onButtonClick={onButtonClick} />
        <VoiceInput onVoiceInput={handleVoiceInput} 
        onEqualsCommand={handleEqualsCommand} />
      </div>
      </div>
      
    </>
  );
};

export default Day7;
