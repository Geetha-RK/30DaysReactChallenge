
import './HomeProjectList.scss'

const HomeProjectList = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-title">
        <h2>{project.day}</h2>
        <h2>{project.title}</h2>
        </div>
        <hr className='project-card__hr'/>
        <div className='project-card__details'>
          <p>{project.description}</p>
          <p><strong>Concepts:</strong> {project.Concepts}</p>
        </div>
    </div>
    
  )
}

export default HomeProjectList