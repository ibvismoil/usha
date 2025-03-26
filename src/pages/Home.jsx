import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to My Portfolio</h1>
      <p>Discover my work and projects</p>
      <Link to="/projects" className="button">View Projects</Link>
    </div>
  );
}

export default Home;
