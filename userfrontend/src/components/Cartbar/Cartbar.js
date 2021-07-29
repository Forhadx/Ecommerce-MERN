import React from "react";
import CartProduct from "../CartProduct/CartProduct";
import "./Cartbar.scss";

const Cartbar = () => {
  return (
    <div className="cartbar__details">
      <div className="cartbar__heading">8 items</div>
      <div className="cartbar__products">
        <CartProduct />
      </div>
      <div className="cartbar__checkout">
        <div className="cartbar__checkout--price">
          <div>Total price</div>
          <div>=</div>
          <div>1230 tk</div>
        </div>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cartbar;
