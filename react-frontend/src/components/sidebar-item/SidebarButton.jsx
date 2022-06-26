import './SidebarItem.css';

const SidebarButton = ({ icon, title, onClick }) => {
    return (
        <div className="menu-item" onClick={onClick}>
            <span className="material-icons-round">{icon}</span>
            <h3>{title}</h3>
        </div>
    ) 
}

export default SidebarButton;
