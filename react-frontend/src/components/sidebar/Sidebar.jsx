import { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import SidebarButton from '../sidebar-item/SidebarButton';
import SidebarLink from '../sidebar-item/SidebarLink';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => logout();

  return (
    <aside>
        <div className="top">
            <div className="logo">
                <img src="/assets/logo.svg" alt="logo" />
                <h2>LaRe <span className="text-primary">Admin</span></h2>
            </div>
            <div className="close" id="close-btn">
                <span className="material-icons-round">close</span>
            </div>
        </div>

        <div className="sidebar">
            <SidebarLink icon="dashboard" title="Dashboard" to={'/'} />
            <SidebarLink icon="group" title="Users" to={'/users'} />
            <SidebarLink icon="category" title="Roles" to={'/roles'} />
            <SidebarLink icon="inventory" title="Products" to={'/products'} />
            <SidebarLink icon="shopping_basket" title="Orders" to={'/orders'} />

            <SidebarButton icon="logout" title="Log Out" onClick={handleLogout} />
        </div>
    </aside>
  )
}

export default Sidebar;
