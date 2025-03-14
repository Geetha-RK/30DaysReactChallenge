// const TriviaUrl='https://opentdb.com/api.php?amount=50&category=18&type=multiple';
import axios from 'axios';


export const gettriviacategory = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        const category = response.data.trivia_categories.filter((item)=>[9, 17, 18, 20, 21, 22, 23, 26, 25].includes(item.id))
        console.log(category);
        return category;
    } catch (error) {
        console.error("Error fetching trivia category",error);
        throw error;
    }
}


export const getTriviaAPI = async (categoryID, attempt = 1) => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${categoryID}&type=multiple`);
        console.log(response.data.results, "here"); 
        return response.data.results;
    } catch (error) {
        if (error.response && error.response.status === 429 && attempt < 2) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.error(`Rate limited, retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return getTriviaAPI(categoryID, attempt + 1); // Retry the request
          }
      
          // If another error occurs (non-429), log the error and rethrow it
          console.error("Error fetching trivia questions", error);
          throw error;
    }
};

// export const getTriviaAPI = async (categoryID) => {
//     // Create a unique cache key for each category
//     const cacheKey = `trivia-category-${categoryID}`;
    
//     // Check if cached data exists for the selected category
//     const cachedData = localStorage.getItem(cacheKey);
    
//     if (cachedData) {
//         console.log("Returning cached data for category", categoryID);
//         return JSON.parse(cachedData);  // Return cached data for this specific category
//     }

//     try {
//         // If there's no cached data, fetch from the API
//         const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${categoryID}&type=multiple`);
//         console.log(response.data.results, "here");

//         // Cache the data for this specific category
//         localStorage.setItem(cacheKey, JSON.stringify(response.data.results));  // Store data with a unique key
        
//         return response.data.results;  // Return fresh data
//     } catch (error) {
//         if (error.response && error.response.status === 429) {
//             console.error("Rate-limited! Returning cached data...");
            
//             // If cached data exists for the category, return it; otherwise, return an empty array
//             return cachedData ? JSON.parse(cachedData) : [];
//         }

//         console.error("Error fetching trivia questions", error);
//         throw error;  // Rethrow if it's another type of error
//     }
// };
