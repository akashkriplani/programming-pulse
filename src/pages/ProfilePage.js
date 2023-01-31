import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loading: false, updatedUser: action.payload, error: '', success: true };
    case 'UPDATE_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const { user, backendAPI, setUser } = useContext(ThemeContext);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    updatedUser: null,
    error: '',
    success: false
  });

  const { loading, error, success, updatedUser } = state;

  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [updatedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(`${backendAPI}/users/${user.id}`, {
        ...user,
        email,
        name,
        password,
        phone,
        website
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE', payload: err.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name || ''} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={phone || ''} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-item">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-item">
          <button>Update</button>
        </div>
        <div className="form-item">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
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
        {success && (
          <div className="form-item">
            <label></label>
            <span className="success">Profile updated successfully</span>
          </div>
        )}
      </form>
    </div>
  );
}
