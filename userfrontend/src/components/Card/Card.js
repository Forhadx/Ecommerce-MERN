import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Card.scss";
import ProductDetails from "../ProductDetails/ProductDetails";
import Modal from "../UI/Modal/Modal";

const Card = (props) => {
    const [modalFlag, setModalFlag] = useState(false);
    const [qty, setQty] = useState(1);
    const [isAddCart, setIsAddCart] = useState(true);

    const { cartProducts, product } = props;

    useEffect(() => {
        let haveProd = cartProducts.filter((p) => p._id === product._id);
        if (haveProd.length !== 0) {
            setIsAddCart(false);
            let prod = cartProducts.find((p) => p._id === product._id);
            setQty(prod.quantity);
        } else {
            setQty(1);
            setIsAddCart(true);
        }
    }, [cartProducts, product]);

    const addCartHandler = (data) => {
        props.onAddToCart({ ...data, quantity: qty });
    };

    const cancelTheCart = (data) => {
        setQty(1);
        props.onCancelTheCart({ ...data, quantity: qty });
    };

    const increaseQty = () => {
        setQty(qty + 1);
        if (!isAddCart) props.onIncreaseProdQty(product);
    };

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
            if (!isAddCart) props.onDecreaseProdQty(product);
        }
    };

    const modalClosedHandler = () => {
        setModalFlag(false);
    };

    const showProductHandler = () => {
        setModalFlag(true);
    };

    return (
        <React.Fragment>
            <Modal show={modalFlag} modalClosed={modalClosedHandler}>
                <ProductDetails
                    modalClosed={modalClosedHandler}
                    prod={props.product}
                />
            </Modal>
            <div className="card">
                <div className="card__details" onClick={showProductHandler}>
                    <div className="card__details--img">
                        <img
                            className="bgImg"
                            src={`http://localhost:5000/${product.image}`}
                            alt={product.name}
                        />
                    </div>
                    <div className="card__details--info">
                        <h1>{product.name}</h1>
                        <p>{product.amount}</p>
                        <h2>{`${product.price} ৳`}</h2>
                    </div>
                </div>
                <div className="card__buttons">
                    <div className="card__buttons--qty">
                        <button className="btn-minus" onClick={decreaseQty}>
                            -
                        </button>
                        <button className="btn-qty">{qty}</button>
                        <button className="btn-plus" onClick={increaseQty}>
                            +
                        </button>
                    </div>
                    <div className="card__buttons--cart">
                        {isAddCart ? (
                            <button onClick={() => addCartHandler(product)}>
                                Add to Cart
                            </button>
                        ) : (
                            <button onClick={() => cancelTheCart(product)}>
                                Cancel the Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.cartProducts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (data) => dispatch(actions.addToCart(data)),
        onCancelTheCart: (prod) => dispatch(actions.cancelTheCart(prod)),
        onIncreaseProdQty: (pId) => dispatch(actions.increaseProdQty(pId)),
        onDecreaseProdQty: (pId) => dispatch(actions.decreaseProdQty(pId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
