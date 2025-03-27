import { useState, useEffect } from 'react';
import '../styles/admin.css';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    text: ''
  });
  const [imageType, setImageType] = useState('url');
  const [editingId, setEditingId] = useState(null); // ID редактируемого проекта

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (editingId) {
      handleEditProject(editingId, formData);
    } else {
      fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          setProjects([...projects, data]);
          setFormData({ title: '', description: '', image: '', link: '', text: '' });
        });
    }
  };

  const handleDeleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, { method: 'DELETE' })
      .then(() => setProjects(projects.filter(project => project.id !== id)));
  };

  const handleEditProject = (id, updatedProject) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then(response => response.json())
      .then((data) => {
        setProjects(projects.map(project => (project.id === id ? data : project)));
        setFormData({ title: '', description: '', image: '', link: '', text: '' });
        setEditingId(null);
      });
  };

  const handleEditClick = (project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="form-group">
        <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="link" placeholder="Project Link" value={formData.link} onChange={handleChange} />
        <textarea name="text" placeholder="Project Text" value={formData.text} onChange={handleChange} />
        
        <div className="image-selector">
          <button className={imageType === 'url' ? 'active' : ''} onClick={() => setImageType('url')}>URL</button>
          <button className={imageType === 'file' ? 'active' : ''} onClick={() => setImageType('file')}>Upload</button>
        </div>

        {imageType === 'url' ? (
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        )}

        <button onClick={handleAddProject}>
          {editingId ? 'Save Changes' : 'Add Project'}
        </button>
      </div>
      
      <ul className="projects-list">
        {projects.map(project => (
          <li key={project.id}>
            <img src={project.image} alt={project.title} className="project-image" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
            <p>{project.text}</p>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
            <button onClick={() => handleEditClick(project)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
