const recipeUrl='https://api.spoonacular.com/recipes/visualizeRecipe'
import axios from 'axios';

export const generateRecipeCard = async(formData) => {
    try {
        const response = await axios.post(`${recipeUrl}?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    // console.log('Generated Recipe Card:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error generating recipe card:", error);
        return null;
    }
}