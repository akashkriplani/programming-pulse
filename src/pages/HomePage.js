import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true };
    case 'POSTS_SUCCESS':
      return { ...state, posts: action.payload, error: '', loading: false };
    case 'POSTS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'USERS_REQUEST':
      return { ...state, loadingUsers: true };
    case 'USERS_SUCCESS':
      return { ...state, users: action.payload, errorUsers: '', loadingUsers: false };
    case 'USERS_FAILURE':
      return { ...state, errorUsers: action.payload, loadingUsers: false };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
    users: [],
    loadingUsers: false,
    errorUsers: ''
  });

  const { loading, error, posts, loadingUsers, errorUsers, users } = state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });

    try {
      const { data } = await axios.get('http://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'POSTS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'POSTS_FAILURE', payload: err.message });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });

    try {
      const { data } = await axios.get('http://jsonplaceholder.typicode.com/users');
      dispatch({ type: 'USERS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'USERS_FAILURE', payload: err.message });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  return (
    <div className="blog">
      <div className="content">
        <h1>Posts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : posts.length === 0 ? (
          <div>No post found</div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="sidebar">
        <h2>Authors</h2>
        {loadingUsers ? (
          <div>Loading...</div>
        ) : errorUsers ? (
          <div>Error: {errorUsers}</div>
        ) : users.length === 0 ? (
          <div>No author found</div>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
