import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTriviaAPI } from "../../services/TriviaService";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";

const CategoryQuestions = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!categoryId) {
        return;
      }

      // Check for cached data
      const cachedData = localStorage.getItem(`category-${categoryId}`);

      if (cachedData) {
        setQuestions(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const result = await getTriviaAPI(categoryId);
        setQuestions(result);
        // Save the fetched data in localStorage
        localStorage.setItem(`category-${categoryId}`, JSON.stringify(result));
        setLoading(false);
      } catch (error) {
        setError("Error fetching trivia questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]); 

  if (loading) {
    return <div>Loading trivia questions...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="trivia">
      <div className="todo__box1">
        <p className="todo__title">
          <Link className="todo__link" to="/Day13">Back</Link>
        </p>
        <div className="todo__title">Trivia Questions</div>
      </div>

      <div className="trivia__container">
        <QuestionContainer questions={questions} />
      </div>
    </div>
  );
};

export default CategoryQuestions;

