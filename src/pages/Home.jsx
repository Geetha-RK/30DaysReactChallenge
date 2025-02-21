// import React from 'react'
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <div>
        <ul>
            <li><Link to='/day1'>Day1</Link></li>
            <li>Day2</li>
        </ul>
    </div>
  )
}

export default Home