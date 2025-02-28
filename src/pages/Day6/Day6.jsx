import { Link } from 'react-router-dom'
import './Day6.scss'
import { useEffect, useState } from 'react'
import { generateRandomJokes, generateCategory } from '../../services/JokesService'

const Day6 = () => {
    const [jokes, setJokes] = useState(null); 
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    // Fetch jokes based on category
    const fetchJokes = async (category) => {
        setLoading(true); 
        setError(null);
        try {
            const response = await generateRandomJokes(category);
            setJokes(response); 
        } catch (error) {
            console.error("Error in Random jokes API call", error);
            setError("Error generating jokes, please try again later.");
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await generateCategory();
                setCategories(categoryData); 
            } catch (error) {
                console.error("Error in Random jokes category API call", error);
                setError("Error generating joke categories, please try again later.");
            }
        };
        fetchCategory();
    }, []);

    return (
        <div className="jokes">
            <div className="todo__box1">
                <p className="todo__title"><Link to="/">Back</Link></p>
                <div className="todo__title">Random Jokes Generator</div>
            </div>
            <div className="jokes__container">
                <div className='jokes__category'>
                    <h3>Joke Categories:</h3>
                    {categories.length > 0 ? (
                        <ul>
                            {categories.map((category, index) => (
                                <li className='jokes__category-list'
                                    key={index}
                                    onClick={() => fetchJokes(category)}   
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </div>
                <div  className='jokes__random'>
                    {loading ? (
                        <h3>Loading joke...</h3> 
                    ) : error ? (
                        <h3>{error}</h3> 
                    ) : (
                        jokes ? (
                            <>
                                <h3>Random Joke:</h3>
                                <p>{jokes.value}</p>
                            </>
                        ) : (
                            <p>Choose a Category </p>
                        )

                    )}
                </div>
            </div>
        </div>
    );
}

export default Day6;
