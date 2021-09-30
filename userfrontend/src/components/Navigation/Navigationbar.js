import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { BiSearchAlt } from "react-icons/bi";
import * as actions from "../../store/actions/index";
import "./Navigationbar.scss";
import { BiUserCircle } from "react-icons/bi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import className from "classnames";

const Navigationbar = (props) => {
    const [isUserShow, setIsUserShow] = useState(false);
    const history = useHistory();

    const logoutHandler = () => {
        setIsUserShow(false);
        props.onLogout();
        history.push("/");
    };

    const loginHandler = () => {
        history.push("/login");
    };

    const userDetailsShowhandler = () => {
        setIsUserShow(!isUserShow);
    };

    const orderHandler = () => {
        setIsUserShow(false);
        history.push("/orders");
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
                        <div
                            className="user_logo"
                            onClick={userDetailsShowhandler}
                        >
                            <BiUserCircle />
                            {isUserShow ? (
                                <VscTriangleDown />
                            ) : (
                                <VscTriangleUp />
                            )}
                        </div>
                    ) : (
                        <div onClick={loginHandler}>login</div>
                    )}
                    <div
                        className={className("user__info", {
                            open: isUserShow,
                        })}
                    >
                        <div className="user__info--item-name">
                            <span>{props.user}</span>
                            <span>{props.email}</span>
                        </div>
                        <div
                            className="user__info--item"
                            onClick={orderHandler}
                        >
                            orders
                        </div>
                        <div
                            className="user__info--item"
                            onClick={logoutHandler}
                        >
                            logout
                        </div>
                    </div>
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
        user: state.auth.user,
        userId: state.auth.userId,
        email: state.auth.email,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);
