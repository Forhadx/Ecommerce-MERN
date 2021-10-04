import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ImCross } from "react-icons/im";
import * as actions from "../../../store/actions/index";
import "./CartProduct.scss";

const CartProduct = (props) => {
    const [qty, setQty] = useState(1);

    const { cartProducts, product } = props;

    useEffect(() => {
        let prod = cartProducts.find((p) => p._id === product._id);
        setQty(prod.quantity);
    }, [cartProducts, product]);

    const cancelTheCart = (data) => {
        setQty(1);
        props.onCancelTheCart({ ...data, quantity: qty });
    };
    const increaseQty = () => {
        setQty(qty + 1);
        props.onIncreaseProdQty(product);
    };
    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
            props.onDecreaseProdQty(product);
        }
    };

    return (
        <div className="cartbar__product">
            <div className="cartbar__product--qty">
                <button onClick={increaseQty}>+</button>
                <div>{qty}</div>
                <button onClick={decreaseQty}>-</button>
            </div>
            <div className="cartbar__product--img">
                <img
                    className="bgImg"
                    src={process.env.REACT_APP_BASE_URL + product.image}
                    alt="product"
                />
            </div>
            <div className="cartbar__product--details">
                <h1>{product.name}</h1>
                <h2>{product.amount}</h2>
                <p>{`${product.price} ৳`}</p>
            </div>
            <div className="cartbar__product--cancel">
                <div>
                    <ImCross onClick={() => cancelTheCart(product)} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.cartProducts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCancelTheCart: (prod) => dispatch(actions.cancelTheCart(prod)),
        onIncreaseProdQty: (pId) => dispatch(actions.increaseProdQty(pId)),
        onDecreaseProdQty: (pId) => dispatch(actions.decreaseProdQty(pId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
