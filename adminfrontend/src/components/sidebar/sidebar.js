import React from "react";
import * as actions from "../../store/actions/Auth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faShoppingBasket,
    faShoppingCart,
    faSignOutAlt,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
    const logoutHandler = () => {
        props.onLogout();
    };

    return (
        <div className="sidebar__items">
            <NavLink to="/" exact>
                <FontAwesomeIcon icon={faHome} />
                <span>Dasboard</span>
            </NavLink>
            <NavLink to="/orders">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Orders</span>
            </NavLink>
            <NavLink to="/products">
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span>Products</span>
            </NavLink>
            <NavLink to="/users">
                <FontAwesomeIcon icon={faUsers} />
                <span>Users</span>
            </NavLink>
            <NavLink to="/logout" onClick={logoutHandler}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
            </NavLink>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { onLogout: () => dispatch(actions.logout()) };
};

export default connect(null, mapDispatchToProps)(Sidebar);
