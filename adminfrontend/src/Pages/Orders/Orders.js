import React, { useEffect } from "react";
import { connect } from "react-redux";
import OrderCard from "../../components/OrderCard/OrderCard";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
    const { onFetchOrders, token } = props;

    useEffect(() => {
        onFetchOrders(token);
    }, [onFetchOrders, token]);

    return (
        <div className="page">
            <div className="page--header">Manage Orders</div>
            <div className="page--details">
                <div>af adf</div>
                {props.loading ? (
                    <Spinner />
                ) : (
                    props.orders.map((ord) => (
                        <OrderCard key={ord._id} order={ord} />
                    ))
                )}
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
