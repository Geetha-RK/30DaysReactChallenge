import React from 'react'
import './Category.scss';
import { useNavigate } from 'react-router-dom';

const Category = ({ category,onSelectCategory }) => {
    const navigate = useNavigate();

    if (!category || category.length === 0) {
        return <div>Loading categories...</div>;
    }

    const handleCategoryClick = (cat) => {
        onSelectCategory(cat);
        navigate(`/Day13/category/${cat.name}`); 
    };

  return (
    <div className="category__container">
            <h3>Select a Category</h3>
            <ul>
                {category.map((cat) => (
                    <li key={cat.id} onClick={handleCategoryClick}>
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default Category