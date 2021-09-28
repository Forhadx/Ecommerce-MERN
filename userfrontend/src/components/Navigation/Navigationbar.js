import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { BiSearchAlt } from "react-icons/bi";
import * as actions from "../../store/actions/index";
import "./Navigationbar.scss";

const Navigationbar = (props) => {
    const history = useHistory();

    const logoutHandler = () => {
        props.onLogout();
        history.push("/");
    };

    const loginHandler = () => {
        history.push("/login");
    };

    return (
        <div className="navigationbar">
            <div className="nav__logo">
                <div className="nav__logo-btn">&#9776;</div>
                <Link to="/" className="nav__logo-name">
                    Gro-Mart
                </Link>
            </div>
            <form className="nav__search">
                <input type="text" placeholder="search" />
                <button type="submit">
                    <BiSearchAlt />
                </button>
            </form>
            <div className="nav__options">
                <div className="nav__options--item">Help</div>
                <div className="nav__options--item">
                    {props.token ? (
                        <div onClick={logoutHandler}>Logout</div>
                    ) : (
                        <div onClick={loginHandler}>Login</div>
                    )}
                </div>
                <div
                    className="nav__options--item"
                    onClick={props.cartClickHandler}
                >
                    <i className="fa nav__options--item-i">&#xf07a;</i>
                    <span className="badge badge-warning" id="lblCartCount">
                        {props.totalItem}
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        totalItem: state.cart.totalItem,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);
