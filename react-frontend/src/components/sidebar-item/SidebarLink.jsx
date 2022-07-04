import { NavLink } from 'react-router-dom';
import './SidebarItem.css';

const SidebarLink = ({icon, title, to}) => {
  return (
    <NavLink to={to} className="menu-item">
        <span className="material-icons-round">{icon}</span>
        <h3>{title}</h3>
    </NavLink>
  )
}

export default SidebarLink;
