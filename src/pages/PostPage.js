import React, { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_REQUEST':
      return { ...state, loading: true };
    case 'POST_SUCCESS':
      return { ...state, loading: false, error: '', post: action.payload };
    case 'POST_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function PostPage() {
  const { backendAPI } = useContext(ThemeContext);
  const { postId } = useParams();
  const [state, dispatch] = useReducer(reducer, { loading: false, error: '', post: { user: {} } });
  const { post, error, loading } = state;

  const fetchPost = async () => {
    dispatch({ type: 'POST_REQUEST' });

    try {
      const { data } = await axios.get(`${backendAPI}/posts/${postId}`);
      // Based on above request, we get the user details from the post
      const { data: userData } = await axios.get(`${backendAPI}/users/${data.userId}`);
      dispatch({ type: 'POST_SUCCESS', payload: { ...data, user: userData } });
    } catch (err) {
      dispatch({ type: 'POST_FAILURE', payload: err.message });
    }
  };

  useEffect(() => {
    fetchPost();
  }, [backendAPI]);

  return (
    <div>
      <Link to="/">Back to posts</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="blog">
          <div className="content">
            <h1>Posts</h1>

            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </div>
          <div className="sidebar">
            <div>
              <h2>{post.user.name}</h2>
              <ul>
                <li>Email: {post.user.email}</li>
                <li>Phone: {post.user.phone}</li>
                <li>Website: {post.user.website}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
