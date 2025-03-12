import React, { useEffect, useState } from "react";
import "./Day13.scss";
import { useParams, Link } from "react-router-dom";
import { getTriviaAPI, gettriviacategory } from "../../services/TriviaService";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import Category from "../../components/QuestionContainer/Category";

const Day13 = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
       
      try {
        const result = await gettriviacategory();
        setCategory(result.data.trivia_categories);
        console.log("Category fetched", result);
        
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Trivia Category");
        setLoading(false);
        setError("Error fetching trivia Category");
      }
    };
    fetchCategory();
  }, []);


useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedCategory && !categoryName) {
        return; 
      }

      const categoryToFetch = selectedCategory || category.find(cat => cat.name === categoryName);
      
      if (categoryToFetch) {
        const cachedQuestions = localStorage.getItem(`triviaQuestions-${categoryToFetch.id}`);
        if (cachedQuestions) {
          setQuestions(JSON.parse(cachedQuestions)); // Use cached data if available
          setLoading(false);
        } else {
          try {
            const result = await getTriviaAPI(categoryToFetch.id); 
            setQuestions(result);
            localStorage.setItem(`triviaQuestions-${categoryToFetch.id}`, JSON.stringify(result)); 
            setLoading(false);
          } catch (error) {
            setError("Error fetching trivia questions.");
            setLoading(false);
          }
        }
      }
    };

    fetchQuestions();
  }, [selectedCategory, categoryName]);
  

  if (loading) {
    return <div>Loading trivia questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="trivia">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Trivia Quiz App</div>
      </div>

      {console.log("questions.length", questions.length,"selected category:",selectedCategory)}

      <div className="trivia__container">
        {/* Pass category and function to change selected category */}
        <Category category={category} onSelectCategory={setSelectedCategory} />

        <QuestionContainer questions={questions} />
      </div>
    </div>
  );
};

export default Day13;
