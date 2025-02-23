// import React from 'react'
import { Link } from 'react-router-dom';
import { project } from '../../assets';
import './Home.scss';
import HomeProjectList from '../../components/HomeProjectList/HomeProjectList';

const Home = () => {
  
  return (
    <div>
      <h1 className='title'>30 Days React Challenge</h1>
      <div className='project-container'>  
            {project.map((proj,index) => (
                    <Link className='project-link' key={index} to={`/${proj.day}`}> 
                         <HomeProjectList project={proj} />
                    </Link>   
           ))}  
      </div>
        
    </div>
  )
}

export default Home