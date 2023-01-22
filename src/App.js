import { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ThemeContext } from './ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`}>
      <Navbar />
      <div className="main">
        <ul>
          <li>
            <h2>Post 1</h2>
            <p>Post 1 content</p>
          </li>
          <li>
            <h2>Post 2</h2>
            <p>Post 2 content</p>
          </li>
        </ul>
      </div>
      <div className="footer">Programming Pulse. All rights reserved.</div>
    </div>
  );
}

export default App;
