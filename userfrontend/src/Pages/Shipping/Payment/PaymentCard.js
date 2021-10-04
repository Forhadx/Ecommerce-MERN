import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.scss";
import { useHistory } from "react-router";

const Payment = (props) => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [isClick, setIsClick] = useState(false);

    const { onAddOrderInit, orderSuccess, onClearCart } = props;

    useEffect(() => {
        if (orderSuccess) {
            onClearCart();
            history.push("/order-success");
        }
        onAddOrderInit();
    }, [onAddOrderInit, orderSuccess, onClearCart, history]);

    const handleSubmit = async (event) => {
        setIsClick(true);
        if (!stripe || !elements) {
            return;
        }
        const res = await axios.post(process.env.REACT_APP_BASE_URL + "pay", {
            email: props.email,
        });
        // console.log("res: ", res);
        const clientSecret = res.data["client_secret"];
        // console.log("clientSecret: ", clientSecret);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: props.email,
                    //cartProduct: props.cartProducts,
                },
            },
        });
        if (result.error) {
            setIsClick(false);
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === "succeeded") {
                //console.log("Money is in the bank!");
                //console.log("payment Id: ", result.paymentIntent.id);
                // save payment id on db
                // clear all cart data
                // go to new page that show success payment
                let items = [];
                for (let i of props.cartProducts) {
                    items.push({ productId: i._id, quantity: i.quantity });
                }
                let orderData = {
                    paymentId: result.paymentIntent.id,
                    items: items,
                    receiver: props.receiver,
                    phone: props.phone,
                    address: props.address,
                    totalPrice: props.totalPrice,
                    buyerId: props.userId,
                };
                props.onAddOrder(orderData, props.token);
            }
        }
    };

    return (
        <React.Fragment>
            <h1>Complete Your Payment</h1>
            <label>
                Payment<span>(4242 4242 4242 4242)</span>
            </label>
            <div>
                <CardElement />
            </div>
            {!isClick ? (
                <button onClick={handleSubmit}>
                    Pay <span>434 ৳ </span>
                </button>
            ) : (
                <button>
                    Pay <span>434 ৳ </span>
                </button>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.cartProducts,
        totalPrice: state.cart.totalPrice,
        receiver: state.cart.receiver,
        phone: state.cart.phone,
        address: state.cart.address,
        orderSuccess: state.order.orderSuccess,
        email: state.auth.email,
        token: state.auth.token,
        user: state.auth.user,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddOrderInit: () => dispatch(actions.addOrderInit()),
        onAddOrder: (orderData, token) =>
            dispatch(actions.addOrder(orderData, token)),
        onClearCart: () => dispatch(actions.clearCart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
