import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import '../styles/ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then(response => response.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching project:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="project-details-container">
      <div className="project-card">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-info">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p className="project-text">{project.text}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="button">Visit Project</a>
          <Link to="/projects" className="button back">Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
