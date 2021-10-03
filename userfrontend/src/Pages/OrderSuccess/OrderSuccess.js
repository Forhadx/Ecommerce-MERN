import React from "react";
import "./OrderSucess.scss";

const orderSuccess = () => {
    return (
        <div className="order__success">
            <h2>Order Successfully Sent</h2>
            <img
                className="bgImg"
                src="https://i.stack.imgur.com/ZRTb6.gif"
                alt="success"
            />
        </div>
    );
};

export default orderSuccess;
