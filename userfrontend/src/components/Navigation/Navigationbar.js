import React from "react";
import { connect } from "react-redux";

import { BiSearchAlt } from "react-icons/bi";

import "./Navigationbar.scss";

const Navigationbar = (props) => {
  return (
    <div className="navigationbar">
      <div className="nav__logo">
        <div className="nav__logo-btn">&#9776;</div>
        <div className="nav__logo-name">Gro-Mart</div>
      </div>
      <form className="nav__search">
        <input type="text" placeholder="search" />
        <button type="submit">
          <BiSearchAlt />
        </button>
      </form>
      <div className="nav__options">
        <div>Help</div>
        <div>Signin</div>
        <div className="cart__icon" onClick={props.cartClickHandler}>
          <i className="fa cart__icon-i">&#xf07a;</i>
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
  };
};

export default connect(mapStateToProps)(Navigationbar);
