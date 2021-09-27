import React from "react";
import Card from "../Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import "./ProductGallary.scss";

const ProductGallary = (props) => {
    return (
        <div className="Products__gallary">
            {props.loading ? (
                <Spinner />
            ) : props.products.length ? (
                props.products.map((prod) => (
                    <div className="Products__gallary--single" key={prod._id}>
                        <Card product={prod} />
                    </div>
                ))
            ) : (
                <div className="Products__gallary--noProduct">
                    stock is empty
                </div>
            )}
        </div>
    );
};

export default ProductGallary;
