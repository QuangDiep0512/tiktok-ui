import { NavLink } from 'react-router-dom';
function MenuItem({ title, to, icon }) {
    return (
        <NavLink to={to} activeclassname="active">
            <span className="menu_items">
                {icon}
                <h3>{title}</h3>
            </span>
        </NavLink>
    );
}

export default MenuItem;
