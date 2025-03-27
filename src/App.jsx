import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { message } from 'antd'; // Импортируем уведомления Ant Design
import 'antd/dist/reset.css'; // Новый стиль Ant Design
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import ProjectDetails from './pages/ProjectDetails';
// import NotFound from './pages/NotFound';
import './styles/global.css' 
import '@ant-design/v5-patch-for-react-19';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin') {
      setIsAuthenticated(true);
      message.success('Login successful!'); // ✅ Успешное уведомление
    } else {
      message.error('Wrong password!'); // ❌ Ошибка при вводе пароля
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
            <div className="login-container fade-in">
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
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
