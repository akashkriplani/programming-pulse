import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { ThemeContext } from './ThemeContext';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/post/:postId" element={<PostPage />}></Route>
            <Route path="/search/:query?" element={<HomePage />}></Route>
            <Route path="/user/:userId" element={<HomePage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
        <div className="footer">Programming Pulse. All rights reserved.</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
