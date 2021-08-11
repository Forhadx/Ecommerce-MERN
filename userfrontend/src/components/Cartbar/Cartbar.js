import React from "react";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct/CartProduct";
import { connect } from "react-redux";
import "./Cartbar.scss";

const Cartbar = (props) => {
  return (
    <div className="cartbar__details">
      <div className="cartbar__heading"> {props.totalItem} items</div>
      <div className="cartbar__products">
        {props.cartProducts.map((prod, i) => (
          <CartProduct product={prod} key={prod._id + i} />
        ))}
      </div>
      <div className="cartbar__checkout">
        <div className="cartbar__checkout--price">
          <div>Total price</div>
          <div>=</div>
          <div>{`${props.totalPrice} ৳`}</div>
        </div>
        <Link to="/shipping">Checkout</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    totalPrice: state.cart.totalPrice,
    totalItem: state.cart.totalItem,
  };
};

export default connect(mapStateToProps)(Cartbar);
