import { useState, useEffect } from 'react';
import '../styles/global.css';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const handleAddProject = () => {
    const newProject = { title, description };
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then(response => response.json())
      .then(data => setProjects([...projects, data]));
  };

  const handleDeleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, { method: 'DELETE' })
      .then(() => setProjects(projects.filter(project => project.id !== id)));
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.title} <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
