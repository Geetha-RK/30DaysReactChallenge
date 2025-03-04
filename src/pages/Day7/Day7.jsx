import React, { useState } from "react";
import "./Day7.scss";
import ButtonsContainer from "../../components/ButtonsContainer/ButtonsContainer";
import Display from "../../components/Display/Display";
import VoiceInput from "../../components/VoiceComponent/VoiceComponent";
import { Link } from "react-router-dom";

const wordToNumber = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "plus": "+", // This should map the word "plus" to the plus symbol
    "minus": "-",
    "times": "*",
    "divided": "/",
    "equals": "=",
    "point": ".",
};

const convertWordsToMath = (voiceInput) => {
    console.log("Received Voice Input:", voiceInput); // Log the raw input
    const words = voiceInput.toLowerCase().split(/\s+/); // Split by spaces or unexpected multiple spaces
    let mathExpression = "";

    let lastWasOperator = false; // Track if the last character was an operator

    words.forEach((word) => {
        const normalizedWord = word.trim(); // Trim any unwanted spaces

        // Handle special cases for known words
        if (normalizedWord === "onep") {
            mathExpression += "1"; // Replace "onep" with "1"
        } else if (normalizedWord === "equal" || normalizedWord === "equals") {
            mathExpression += "="; // Replace "equal" with "="
            lastWasOperator = false; // Reset operator state after "="
        } else if (wordToNumber[normalizedWord] !== undefined) {
            console.log(`Mapped word: ${normalizedWord} to: ${wordToNumber[normalizedWord]}`); // Log each mapping
            mathExpression += wordToNumber[normalizedWord]; // Append numbers/operators
            lastWasOperator = false; // Reset the operator flag when a number is added
        } else if (normalizedWord === "plus" || normalizedWord === "minus" || normalizedWord === "times" || normalizedWord === "divided") {
            const operator = wordToNumber[normalizedWord];

            // Prevent appending consecutive operators (e.g., '++', '--')
            if (!lastWasOperator && mathExpression !== "") {
                mathExpression += operator; // Add the operator
                lastWasOperator = true; // Mark that the last character is an operator
            } else {
                console.log(`Skipping operator: ${normalizedWord} due to consecutive operators.`);
            }
        } else {
            console.log(`Unknown word: ${normalizedWord}`); // Log any word that is not recognized
        }
    });

    console.log("Math Expression:", mathExpression); // Log the final expression
    return mathExpression;
};





const Day7 = () => {
    const [calVal, setCalVal] = useState(""); // State to hold the calculator value

    // Handle button click
    const onButtonClick = (buttonText) => {
        if (buttonText === "C") {
            setCalVal(""); // Clear the display
        } else if (buttonText === "=") {
            handleEqualsCommand();
        } else {
            setCalVal(calVal + buttonText); // Append button text to the display
        }
    };

    // Handle voice input
    const handleVoiceInput = (voiceInput) => {
        const convertedExpression = convertWordsToMath(voiceInput);
        console.log("Converted Expression:", convertedExpression);

        if (convertedExpression) {
            // Check if the last character is an operator, prevent consecutive operators
            if (isOperator(convertedExpression) && isOperator(calVal.slice(-1))) {
                return; // Don't append if the last character is already an operator
            }

            // Avoid appending multiple equals signs
            if (convertedExpression === "=" && calVal.includes("=")) {
                return; // Do not allow multiple equal signs
            }

            setCalVal((prevValue) => prevValue + convertedExpression); // Append the converted voice input to the current value
        }
    };

    // Function to check if a character is an operator
    const isOperator = (char) => {
        return ['+', '-', '*', '/', '='].includes(char);
    };

    const handleEqualsCommand = () => {
        try {
            console.log("Evaluating:", calVal);
            const result = eval(calVal); // Evaluate the expression
            setCalVal(result); // Show the result
        } catch (error) {
            setCalVal("Error"); // Handle invalid expressions
        }
    };

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
                    {/* <VoiceInput onVoiceInput={handleVoiceInput} onEqualsCommand={handleEqualsCommand} /> */}
                </div>
            </div>
        </>
    );
};

export default Day7;
