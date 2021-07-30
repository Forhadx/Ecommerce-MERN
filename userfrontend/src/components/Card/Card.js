import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__details">
        <div className="card__details--img">
          <img
            className="bgImg"
            src={props.product.image}
            alt={props.product.name}
          />
        </div>
        <div className="card__details--info">
          <h1>{props.product.name}</h1>
          <p>{props.product.amount}</p>
          <h2>{`${props.product.price} ৳`}</h2>
        </div>
      </div>
      <div className="card__buttons">
        <div className="card__buttons--qty">
          <button className="btn-minus">-</button>
          <button>10</button>
          <button className="btn-plus">+</button>
        </div>
        <div className="card__buttons--cart">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
