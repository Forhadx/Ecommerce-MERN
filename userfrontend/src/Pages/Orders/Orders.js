import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Orders.scss";

import OrderCard from "../../components/OrderCard/OrderCard";

const Orders = (props) => {
    const { onFetchOrders, token } = props;

    useEffect(() => {
        onFetchOrders(token);
    }, [onFetchOrders, token]);

    return (
        <div className="order__page">
            <h1>Your All Orders List</h1>
            <div className="order__page--items">
                {props.orders.map((ord) => (
                    <OrderCard key={ord._id} order={ord} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
