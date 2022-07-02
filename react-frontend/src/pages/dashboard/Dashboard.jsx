import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import InsightCard from '../../components/insight-card/InsightCard';
import MainContainer from '../../components/main-container/MainContainer';
import RecentOrders from '../../components/recent-orders/RecentOrders';
import AuthContext from '../../context/auth/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate replace to='/login' />;

  return (
    <MainContainer>
      <h1>Dashboard</h1>
      <div className="insights">
        <InsightCard icon="account_box" color="primary" title="Total Users" quantity="21" percentage="90" />
        <InsightCard icon="inventory_2" color="danger" title="Total Products" quantity="30" percentage="45" />
        <InsightCard icon="local_shipping" color="success" title="Total Orders" quantity="15" percentage="62" />
      </div>
      <RecentOrders />
    </MainContainer>
  )
}

export default Dashboard;
