import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import './MainContainer.css';

const MainContainer = ({ children }) => {
    const { token, user, getUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (token && !user) getUser();
    });

    if (!token) return <Navigate replace to='/login' />;

    return (
        <div className="container">
            <Sidebar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default MainContainer