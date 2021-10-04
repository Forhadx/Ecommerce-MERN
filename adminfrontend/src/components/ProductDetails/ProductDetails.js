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
                    className="bgImg"
                    src={`http://localhost:5000/${props.singleProd.image}`}
                    alt="product"
                />
            </div>
            <div className="single__prod--info">
                <div className="single__prod--info-line">
                    {props.singleProd.name}
                </div>
                <div className="single__prod--info-line">
                    <p>{props.singleProd.brand}</p>
                </div>
                <div className="single__prod--info-line">
                    <p> {props.singleProd.amount} </p>
                </div>
                <div className="single__prod--info-line">
                    <span className="bold">
                        {`${props.singleProd.price} ৳`}
                    </span>
                </div>
            </div>
            <div className="single__prod--details">
                <div className="single__prod--details-description">
                    <span className="bold">Details:</span>
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
