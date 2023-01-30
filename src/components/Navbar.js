import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme, user, backendAPI, toggleBackendAPI } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <div className="header">
      <div className="header-item">
        <Link to="/">
          <strong>Programming Pulse</strong>
        </Link>
      </div>
      <div className="header-item">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            value={query}
            placeholder="Search posts"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Go</button>
        </form>
      </div>
      <div className="header-item">
        {user ? (
          <>
            <NavLink to="/profile" className={(navData) => (navData.isActive ? 'active' : '')}>
              {user.name}
            </NavLink>{' '}
            <NavLink to="/create" className={(navData) => (navData.isActive ? 'active' : '')}>
              Create Post
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className={(navData) => (navData.isActive ? 'active' : '')}>
            Login
          </NavLink>
        )}{' '}
        <button onClick={toggleTheme}>{theme === 'light' ? 'Theme:Light' : 'Theme:Dark'}</button>{' '}
        <button onClick={toggleBackendAPI}>{backendAPI === '/api' ? 'API:Real' : 'API:Mock'}</button>
      </div>
    </div>
  );
}
