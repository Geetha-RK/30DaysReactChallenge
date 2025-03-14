import React, { useState } from 'react';
import './QuestionContainer.scss';

const QuestionContainer = ({ questions }) => {
  // State for selected answer, answer status (correct/incorrect), and current question index
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question

  // Decode HTML entities in the question and answers
  const decodeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || doc.documentElement.innerText;
  };

  // Handle when an answer is selected
  const handleAnswer = (answer, correctAnswer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
  };

  // Handle going to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
      setAnswerStatus(null); // Reset answer status
    }
  };

  const question = questions[currentQuestionIndex];

  // Combine correct answer and incorrect answers into one array
  const allAnswers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  // Shuffle the answers to randomize their order
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="questions">
      {questions.length > 0 ? (
        <div key={currentQuestionIndex} className="questions__question">
          <p>{decodeHTML(question.question)}</p>

          <div className="questions__options">
            {shuffledAnswers.map((answer, idx) => {
              const isSelected = selectedAnswer === answer;
              const isCorrect = answer === question.correct_answer;

              // Determine the color for the selected answer
              let answerColor = '';
              if (isSelected) {
                answerColor = isCorrect ? 'green' : 'red';
              }

              return (
                <p
                  key={idx}
                  className={`questions__answers ${answerColor}`}
                  onClick={() => handleAnswer(answer, question.correct_answer)}
                >
                  {decodeHTML(answer)}
                </p>
              );
            })}
          </div>

          {/* Show the correct answer once an answer is selected */}
          {answerStatus && (
            <div className="questions__answer-status">
              {answerStatus === 'correct' ? (
                <p>Correct! 🎉</p>
              ) : (
                <p>Incorrect! The correct answer is: {decodeHTML(question.correct_answer)}</p>
              )}
            </div>
          )}

          {/* Button to move to the next question */}
          {answerStatus && (
            <button className="questions__button" onClick={handleNextQuestion}>Next Question</button>
          )}
        </div>
      ) : (
        <div className="questions__question">
          <p>No Questions Available</p>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
