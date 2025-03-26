import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/admin" element={
          isAuthenticated ? <Admin /> : (
            <div className="login-container">
              <h2>Enter Admin Password</h2>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
