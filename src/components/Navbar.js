import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <div className="header-item">
        <Link to="/">
          <strong>Programming Pulse</strong>
        </Link>
      </div>
      <div className="header-item">
        <a href="/login">Login</a>
        <button onClick={toggleTheme}>{theme === 'light' ? 'Theme:light' : 'Theme:dark'}</button>
      </div>
    </div>
  );
}
