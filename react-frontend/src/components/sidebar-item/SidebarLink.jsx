import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './SidebarItem.css';

const SidebarLink = ({icon, title, to}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={`menu-item ${match ? 'active' : ''}`}>
        <span className="material-icons-round">{icon}</span>
        <h3>{title}</h3>
    </Link>
  )
}

export default SidebarLink;
