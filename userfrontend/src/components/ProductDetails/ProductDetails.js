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
                <div className="single__prod--info-line">
                    <span className="bold">Name:</span>
                    {props.prod.name}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Brand:</span>
                    {props.prod.brand}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Amount:</span>
                    {props.prod.amount}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Price:</span>
                    {`${props.prod.price} ৳`}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Main Category:</span>
                    {props.prod.mainCategory}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Sub Category:</span>
                    {props.prod.subCategory}
                </div>
            </div>
            <div className="single__prod--details">
                <div className="single__prod--details-description">
                    <span className="bold">Description:</span>
                    {props.prod.description}
                </div>
            </div>
        </div>
    ) : (
        <p>No Product in available</p>
    );
};

export default ProductDetails;
