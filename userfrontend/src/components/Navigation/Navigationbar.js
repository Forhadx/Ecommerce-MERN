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
import Backdrop from "../UI/Backdrop/Backdrop";

const Navigationbar = (props) => {
    const [prodName, setProdName] = useState("");
    const [isUserShow, setIsUserShow] = useState(false);
    const [isMiniSearchShow, setIsMiniSearchShow] = useState(false);

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

    const searchProductHandler = (e) => {
        e.preventDefault();
        if (prodName) {
            console.log("p: ", prodName);
            props.onSearchProductByName(prodName);
            setIsMiniSearchShow(false);
            history.push(`/search/${prodName}`);
        }
    };

    const openMobileSearchHandler = () => {
        setIsMiniSearchShow(!isMiniSearchShow);
    };
    const searchClosekHandler = () => {
        setIsMiniSearchShow(!isMiniSearchShow);
    };

    return (
        <div className="navigationbar">
            <Backdrop show={isMiniSearchShow} clicked={searchClosekHandler} />
            <div className="nav__logo">
                <div
                    className="nav__logo-btn"
                    onClick={props.sidebarToggleHandler}
                >
                    &#9776;
                </div>
                <Link to="/" className="nav__logo-name">
                    Gro-Mart
                </Link>
            </div>
            <form className="nav__search" onSubmit={searchProductHandler}>
                <input
                    type="text"
                    placeholder="search"
                    onChange={(e) => setProdName(e.target.value)}
                />
                <button type="submit">
                    <BiSearchAlt />
                </button>
            </form>
            <button className="mini__search" onClick={openMobileSearchHandler}>
                <BiSearchAlt />
            </button>
            {isMiniSearchShow && (
                <form
                    className="mini__Search-form"
                    onSubmit={searchProductHandler}
                >
                    <input
                        type="text"
                        placeholder="search"
                        onChange={(e) => setProdName(e.target.value)}
                    />
                    <button type="submit">
                        <BiSearchAlt />
                    </button>
                </form>
            )}
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
        onSearchProductByName: (name) =>
            dispatch(actions.searchProductByName(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);
