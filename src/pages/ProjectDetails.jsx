import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/global.css';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then(response => response.json())
      .then(data => setProject(data));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <Link to="/projects" className="button">Back to Projects</Link>
    </div>
  );
}

export default ProjectDetails;