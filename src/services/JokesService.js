import axios from 'axios';

export const generateRandomJokes= async(category) => {
    try {
        const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        return response.data;
        console.log(response)
    } catch (error) {
        console.error("Error in Axios Random jokes API call" , error);
    }
}

export const generateCategory= async() => {
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories');
        return response.data;
        console.log(response)
    } catch (error) {
        console.error("Error in Axios Random jokes category  API call" , error);
    }
}