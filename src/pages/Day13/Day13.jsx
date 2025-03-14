import React, { useEffect, useState } from "react";
import "./Day13.scss";
import { Link } from "react-router-dom";
import { gettriviacategory } from "../../services/TriviaService";
import Category from "../../components/QuestionContainer/Category";

const Day13 = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


  useEffect(() => {
    const fetchCategory = async () => {
       
      try {
        const result = await gettriviacategory();
        setCategory(result);        
        setLoading(false);
        setError(false);
        
      } catch (error) {
        setLoading(false);
        setError("Error fetching trivia Category");
      }
    };
    fetchCategory();
  }, []);


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
          <Link className='todo__link' to="/">Back</Link>
        </p>
        <div className="todo__title">Trivia Quiz App</div>
      </div>
      <div className="trivia__container">
        <Category category={category} onSelectCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default Day13;
