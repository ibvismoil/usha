import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/projects') // JSON Server
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Link to={`/project/${project.id}`} className="button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;