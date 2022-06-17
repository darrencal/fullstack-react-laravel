import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const {  isAuthenticated, user, getUser, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && !user) getUser();
  });

  const handleClick = () => logout();

  if (!isAuthenticated) return <Navigate replace to='/login' />;

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <p>Welcome {user?.first_name}</p>
      <button className='btn-primary' onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Dashboard;
