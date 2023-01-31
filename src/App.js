import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { ThemeContext } from './ThemeContext';
import CreatePostPage from './pages/CreatePostPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route exact path="/create" element={<PrivateRoute />}>
              <Route exact path="/create" element={<CreatePostPage />} />
            </Route>
            <Route exact path="/profile" element={<PrivateRoute />}>
              <Route exact path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
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
