import React, { useEffect, useReducer, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, error: '', loggedInUser: action.payload };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, { loading: false, error: '', loggedInUser: null });

  const { user, setUser, backendAPI } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, loggedInUser } = state;

  const navigate = useNavigate();

  if (user) {
    navigate('/profile');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_REQUEST' });

    try {
      const { data } = await axios.post(`${backendAPI}/users`, {
        name,
        email,
        password,
        id: Math.floor(Math.random() * 1000000)
      });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.message });
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
      <h1>Register User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} required onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label></label>
          <button>Register</button>
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
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
