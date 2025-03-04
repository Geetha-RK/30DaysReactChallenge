import axios from 'axios';

export const generateColorScheme = async(color,mode) => {
    try {
        const response = await axios.get(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=6`);
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.error("Error in Axios Color API call" , error);
    }
}