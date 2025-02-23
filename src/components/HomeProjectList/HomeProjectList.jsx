// import React from 'react'
import './HomeProjectList.scss'

const HomeProjectList = ({ project }) => {
  return (
    <div className="project-card">
        <h2>{project.day}</h2>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p><strong>Concepts:</strong> {project.Concepts}</p>
    </div>
    
  )
}

export default HomeProjectList