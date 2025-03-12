const TriviaUrl='https://opentdb.com/api.php?amount=50&category=18&type=multiple';
import axios from 'axios';


export const gettriviacategory = async () => {
    try {
        const category = await axios.get('https://opentdb.com/api_category.php');
        return category;
    } catch (error) {
        console.error("Error fetching trivia category");
    }
}

export const getTriviaAPI = async(categoryID) => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${categoryID}&type=multiple`);
        console.log(response.data.results,"here"); //displayes result here
        return response.data.results;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limit error: retry after 10 seconds
            console.error("Rate limited, retrying in 10 seconds...");
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            return getTriviaAPI();
          }
        console.error("Error fetchin trivia questions",error);
        throw error;
    }
}