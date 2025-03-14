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
        console.log("selected category name:",cat)
        navigate(`/Day13/category/${cat.id}`);  
    };

  return (
    <div className="category__container">
            <h3 className='category__title'>Select a Category</h3>
            <ul className='category__container2'>
                {category.map((cat) => {
                    return (
                    <li className="category__list" key={cat.id} onClick={() => handleCategoryClick(cat)}>
                    <div className='category__boxes'>
                        {cat.name}  
                    </div>
                </li>
                    )
})}
            </ul>
        </div>
  )
}

export default Category