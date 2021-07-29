import React from "react";
import { ImCross } from "react-icons/im";
import "./CartProduct.scss";

const CartProduct = () => {
  return (
    <div className="cartbar__product">
      <div className="cartbar__product--qty">
        <button>+</button>
        <div>9</div>
        <button>-</button>
      </div>
      <div className="cartbar__product--img">
        <img
          className="bgImg"
          src="https://chaldn.com/_mpimage/nestle-nescafe-classic-instant-coffee-jar-50-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D70689&q=low&v=1&m=400&webp=1"
          alt="pic"
        />
      </div>
      <div className="cartbar__product--details">
        <h1>Nestlé Nescafe Creamy Latte Coffee Mix Sachet 18 gm</h1>
        <h2>200 gm</h2>
        <p>210 ৳</p>
      </div>
      <div className="cartbar__product--cancel">
        <div>
          <ImCross />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
