import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AuthProvider from './context/auth/AuthProvider'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MainContainer from './components/main-container/MainContainer';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import UserCreate from './pages/user-create/UserCreate';
import UserEdit from './pages/user-edit/UserEdit';
import Roles from './pages/roles/Roles';
import setAuthToken from './utils/setAuthToken';
import './App.css';

axios.defaults.baseURL = 'http://localhost:8000/api/';

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainContainer />} >
            <Route index element={<Dashboard />} />
            <Route path={'users'} element={<Users />} />
            <Route path={'users/create'} element={<UserCreate />} />
            <Route path={'users/:id/edit'} element={<UserEdit />} />
            <Route path={'roles'} element={<Roles />} />
          </Route>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
