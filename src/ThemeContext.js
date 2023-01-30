import { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [backendAPI, setBackendAPI] = useState('https://jsonplaceholder.typicode.com');

  const toggleBackendAPI = () => setBackendAPI(backendAPI === '/api' ? 'https://jsonplaceholder.typicode.com' : '/api');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, user, setUser, backendAPI, toggleBackendAPI }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
