import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MainContainer from '../../components/main-container/MainContainer';
import AuthContext from '../../context/auth/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate replace to='/login' />;

  return (
    <MainContainer>
      <h1>Dashboard</h1>
    </MainContainer>
  )
}

export default Dashboard;
