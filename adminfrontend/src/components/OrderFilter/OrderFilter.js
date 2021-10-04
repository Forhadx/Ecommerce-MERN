import React, { useState } from "react";
import "./OrderFilter.scss";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { BiSearchAlt } from "react-icons/bi";
import { BiRefresh } from "react-icons/bi";

const OrderFilter = (props) => {
    const [oid, setOid] = useState("");

    const filterTypeHandler = (e) => {
        if (e.target.value === "all") {
            props.onFetchOrders(props.token);
        } else if (e.target.value === "new") {
            props.onFetchNewOrders(props.token);
        } else if (e.target.value === "onway") {
            props.onFetchOnwayorder(props.token);
        } else if (e.target.value === "delivered") {
            props.onFetchDeleverdOrders(props.token);
        } else if (e.target.value === "rejected") {
            props.onFetchRejectedOrders(props.token);
        }
    };

    const refreshHandler = () => {
        props.onFetchOrders(props.token);
    };

    const fetchOrderbyIdHandler = (e) => {
        e.preventDefault();
        if (oid) props.onFetchOrdersById(oid, props.token);
    };

    return (
        <div className="orders__filter">
            <div className="orders__filter--category">
                <select onChange={filterTypeHandler}>
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="onway">On way</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <form
                className="orders__filter--search"
                onSubmit={fetchOrderbyIdHandler}
            >
                <input
                    type="text"
                    placeholder="order id"
                    onChange={(e) => setOid(e.target.value)}
                />
                <button type="submit">
                    <BiSearchAlt />
                </button>
            </form>
            <button className="refresh-btn" onClick={refreshHandler}>
                <BiRefresh />
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onFetchNewOrders: (token) => dispatch(actions.fetchNewOrders(token)),
        onFetchOnwayorder: (token) => dispatch(actions.fetchOnwayorder(token)),
        onFetchDeleverdOrders: (token) =>
            dispatch(actions.fetchDeleverdOrders(token)),
        onFetchRejectedOrders: (token) =>
            dispatch(actions.fetchRejectedOrders(token)),
        onFetchOrdersById: (id, token) =>
            dispatch(actions.fetchOrdersById(id, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilter);
