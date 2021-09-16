import React from "react";
import { connect } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import "./ProductDetails.scss";

const ProductDetails = (props) => {
    return props.singleProd ? (
        <div className="single__prod">
            <div className="single__prod--btn" onClick={props.modalClosed}>
                <ImCancelCircle />
            </div>
            <div className="single__prod--img">
                <img
                    src="https://chaldn.com/_mpimage/china-fuji-apple-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D54849&q=low&v=1&m=400&webp=1"
                    alt="product"
                />
            </div>
            <div className="single__prod--info">
                <div className="single__prod--info-line">
                    <span className="bold">Name:</span>
                    {props.singleProd.name}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Brand:</span>
                    {props.singleProd.brand}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Amount:</span>
                    {props.singleProd.amount}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Price:</span>
                    {`${props.singleProd.price} ৳`}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Main Category:</span>
                    {props.singleProd.mainCategory}
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">Sub Category:</span>
                    {props.singleProd.subCategory}
                </div>
            </div>
            <div className="single__prod--details">
                <div className="single__prod--details-description">
                    <span className="bold">Description:</span>
                    {props.singleProd.description}
                </div>
            </div>
        </div>
    ) : (
        <p>No Product in available</p>
    );
};

const mapStateToProps = (state) => {
    return {
        singleProd: state.prods.singleProd,
    };
};

export default connect(mapStateToProps)(ProductDetails);
