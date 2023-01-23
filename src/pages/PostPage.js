import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const { postId } = useParams();
  const [state, dispatch] = useReducer(reducer, { loading: false, error: '', post: {} });
  const { post, error, loading } = state;

  const fetchPost = async () => {
    dispatch({ type: 'POST_REQUEST' });

    try {
      const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}`);
      dispatch({ type: 'POST_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'POST_FAILURE', payload: err.message });
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <Link to="/">Back to posts</Link>
      <div className="blog">
        <div className="content">
          <h1>Posts</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          )}
        </div>
        <div className="sidebar"></div>
      </div>
    </div>
  );
}
