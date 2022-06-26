import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import './MainContainer.css';

const MainContainer = ({ children }) => {
    const { token, user, getUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (token && !user) getUser();
    });

    return (
        <div className="container">
            <Sidebar />            
            {children}
        </div>
    )
}

export default MainContainer