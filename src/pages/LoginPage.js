import React, { useEffect, useReducer, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, error: '', loggedInUser: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, { loading: false, error: '', loggedInUser: null });

  const { user, setUser, backendAPI } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, loggedInUser } = state;

  const navigate = useNavigate();

  if (user) {
    navigate('/profile');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });
    const { data } = await axios.get(`${backendAPI}/users?email=${email}&password=${password}`);

    try {
      if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        dispatch({ type: 'LOGIN_SUCCESS', payload: data[0] });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate('/profile');
    }
  }, [loggedInUser, navigate, setUser, user, backendAPI]);

  return (
    <div>
      <h1>Login User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label></label>
          <button>Login</button>
        </div>
        {loading && (
          <div className="form-item">
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <label></label>
            <span className="error">{error}</span>
          </div>
        )}
        <div className="form-item">
          <label></label>
          <span>
            New User? <Link to="/register">Register</Link>
          </span>
        </div>
        <div className="form-item">
          <label></label>
          <span>Or use email: Sincere@april.biz and password: 123</span>
        </div>
      </form>
    </div>
  );
}
