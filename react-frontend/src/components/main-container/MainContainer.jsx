import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import './MainContainer.css';

const MainContainer = () => {
    const { token, user, getUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (token && !user) getUser();
    });

    if (!token) return <Navigate replace to='/login' />;

    return (
        <div className="container">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default MainContainer