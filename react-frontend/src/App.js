import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AuthProvider from './context/auth/AuthProvider'
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import setAuthToken from './utils/setAuthToken';

axios.defaults.baseURL = 'http://localhost:8000/api/';

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/users'} element={<Users />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
