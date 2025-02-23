const weatherapi_base_url="https://api.openweathermap.org/data/2.5/weather";

import axios from 'axios';

export const getWeatherData = async(city) => {
    try {
        const response = await axios.get(`${weatherapi_base_url}/?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}