import { Link } from "react-router-dom"
import './Day5.scss'
import { useState, useRef } from "react"
import { generateRecipeCard } from "../../services/RecipeService"

const Day5 = () => {
  const [loading, setLoading] = useState(false);
  const [recipeCardUrl, setRecipeCardUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const formRef = useRef()
  const titleRef = useRef();
  const ingredientsRef = useRef();
  const instructionsRef = useRef();
  const imageRef = useRef();
  const authorRef = useRef();


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); 
      setImageUrl(url); 
      
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
   setLoading(true);
   const title = titleRef.current.value;
    const ingredients = ingredientsRef.current.value;
    const instructions = instructionsRef.current.value;
    const author = authorRef.current.value;

    if (!title || !ingredients || !instructions || !author || !imageRef.current.files[0] ) {
      alert("Please fill out all fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("readyInMinutes", 60); // Default time
    formData.append("servings", 2); // Default servings
    formData.append("mask", "ellipseMask"); // Default mask
    formData.append("backgroundImage", "none"); // Default background image
    formData.append("backgroundColor", "#FFB6C1"); // White background color
    formData.append("fontColor", "#333333"); // Dark font color
    formData.append("author",author);
    
    if (imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0]); // Append the image file
    }

    try {
      const result = await generateRecipeCard(formData);
      console.log(result, "generated");

      if (result) {
        setRecipeCardUrl(result.url); 
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error generating recipe card:", error);
      alert("There was an error generating the recipe card. Please try again.");
    }

    setLoading(false);

  }

  return (
    <div className="recipe">
      <div className='todo__box1'>
                <p className='todo__title'><Link to="/">Back</Link></p>
                <div className='todo__title'>Build Recipe Card</div>
        </div>
        
        <div className="recipe__container">
          <form className="recipe__form" onSubmit={handleSubmit} ref={formRef}>
              <label className="recipe__label" htmlFor="title">  Enter the Title of your Recipe
              </label>
              <input className="recipe__input" type="text" name="title" id="title" ref={titleRef}  placeholder="Recipe Title"/>
              <label  className="recipe__label" htmlFor="ingredients">  Enter the Ingredients(one per line):
              </label>
              <textarea className="recipe__input recipe__textarea" type="text" name="ingredients" id="ingredients" ref={ingredientsRef} placeholder="e.g. 2 cups of flour, 1 egg, etc."/>
              <label  className="recipe__label" htmlFor="instructions">  Enter the Instructions(one per line):  
              </label>
              <textarea className="recipe__input recipe__textarea" type="text" name="instructions" id="instructions" ref={instructionsRef} placeholder="e.g. Mix all ingredients, bake for 30 minutes."/>
              <label className="recipe__label" htmlFor="imgupload">Upload Recipe Image</label>
              <input 
                className="recipe__input"
                type="file"
                name="imgupload"
                id="imgupload"
                accept="image/*" 
                ref={imageRef} 
                onChange={handleImageUpload}
              />
              <label className="recipe__label" htmlFor="author"> Author Name
              </label>
              <input className="recipe__input" type="text" name="author" id="author" ref={authorRef}  placeholder="Author's name"/>
              <button className="recipe__button" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Recipe Card" }
              </button>
          </form>
          {recipeCardUrl && (
        <div className="recipe__card">
          <h3>Generated Recipe Card</h3>
          <img className="recipe__img" src={recipeCardUrl} alt="Generated Recipe Card" />
        </div>
       )} 
        </div>
        
    </div>
  )
}

export default Day5