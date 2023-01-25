import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const PrivateRoute = () => {
  const { user } = useContext(ThemeContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
