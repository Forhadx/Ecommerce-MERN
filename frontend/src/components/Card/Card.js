import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__details">
        <div className="card__details--img">
          <img
            className="bgImg"
            src="https://chaldn.com/_mpimage/nestle-nescafe-classic-instant-coffee-jar-50-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D70689&q=low&v=1&m=400&webp=1"
            alt="pic"
          />
        </div>
        <div className="card__details--info">
          <h1>Nestlé Nescafe Creamy Latte Coffee Mix Sachet 18 gm</h1>
          <p>18gm</p>
          <h2>৳120</h2>
        </div>
      </div>
      <div className="card__buttons">
        <div className="card__buttons--qty">
          <button className="btn-minus">-</button>
          <button>10</button>
          <button className="btn-plus">+</button>
        </div>
        <div className="card__buttons--cart">
          <button>add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
