import React from "react";
import { ImCancelCircle } from "react-icons/im";
import "./ProductDetails.scss";

const ProductDetails = (props) => {
    return props.prod ? (
        <div className="single__prod">
            <div className="single__prod--btn" onClick={props.modalClosed}>
                <ImCancelCircle />
            </div>
            <div className="single__prod--img">
                <img
                    className="bgImg"
                    src={`http://localhost:5000/${props.prod.image}`}
                    alt="product"
                />
            </div>
            <div className="single__prod--info">
                <div className="single__prod--info-line">{props.prod.name}</div>
                <div className="single__prod--info-line">
                    <p>{props.prod.brand}</p>
                </div>
                <div className="single__prod--info-line">
                    <p> {props.prod.amount} </p>
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">{`${props.prod.price} ৳`}</span>
                </div>
            </div>
            <div className="single__prod--details">
                <div className="single__prod--details-description">
                    <span className="bold">Details:</span>
                    {props.prod.description}
                </div>
            </div>
        </div>
    ) : (
        <p>No Product in available</p>
    );
};

export default ProductDetails;
