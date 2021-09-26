import React from "react";
import { useHistory } from "react-router-dom";
import CartProduct from "./CartProduct/CartProduct";
import { connect } from "react-redux";
import "./Cartbar.scss";

const Cartbar = (props) => {
    let history = useHistory();

    const checkoutHandler = () => {
        if (props.cartProducts.length !== 0) {
            console.log("c: ", props.cartProducts);
            history.push("/shipping");
        }
    };

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
                <div
                    className="cartbar__checkout--btn"
                    onClick={checkoutHandler}
                >
                    Checkout
                </div>
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
