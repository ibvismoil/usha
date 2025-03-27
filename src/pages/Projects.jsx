import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/project.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader">Loading projects...</div>;
  }

  return (
    <div className="projects-container">
      <h1 className="title">My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <Link to={`/project/${project.id}`} className="button">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
