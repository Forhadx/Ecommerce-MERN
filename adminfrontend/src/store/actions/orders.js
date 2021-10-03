import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};
export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err,
    };
};

export const fetchOrders = (token) => {
    return async (dispatch) => {
        dispatch(fetchOrdersStart());
        try {
            let result = await axios.get(
                "http://localhost:5000/order/a/allorders"
            );
            dispatch(fetchOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchOrdersFail(err));
        }
    };
};

export const rejectOrderStart = () => {
    return {
        type: actionTypes.REJECT_ORDER_START,
    };
};

export const rejectOrderSuccess = (id) => {
    return {
        type: actionTypes.REJECT_ORDER_SUCCESS,
        id: id,
    };
};

export const rejectOrderFail = (err) => {
    return {
        type: actionTypes.REJECT_ORDER_FAIL,
    };
};

export const rejectOrder = (id) => {
    return async (dispatch) => {
        dispatch(rejectOrderStart());
        try {
            await axios.patch(`http://localhost:5000/order/a/rejected/${id}`);
            dispatch(rejectOrderSuccess(id));
        } catch (err) {
            dispatch(rejectOrderFail(err));
        }
    };
};

export const onwayOrderStart = () => {
    return {
        type: actionTypes.ONWAY_ORDER_START,
    };
};

export const onwayOrderSuccess = (id) => {
    return {
        type: actionTypes.ONWAY_ORDER_SUCCESS,
        id: id,
    };
};

export const onwayOrderFail = (err) => {
    return {
        type: actionTypes.ONWAY_ORDER_FAIL,
        error: err,
    };
};

export const onwayOrder = (id) => {
    return async (dispatch) => {
        dispatch(onwayOrderStart());
        try {
            await axios.patch(`http://localhost:5000/order/a/onway/${id}`);
            dispatch(onwayOrderSuccess(id));
        } catch (err) {
            dispatch(onwayOrderFail(err));
        }
    };
};

export const deliverdOrderStart = () => {
    return {
        type: actionTypes.DELIVERD_ORDER_START,
    };
};

export const deliveredOrderSuccess = (id) => {
    return {
        type: actionTypes.DELIVERD_ORDER_SUCCESS,
        id: id,
    };
};

export const deliverdOrderFail = (err) => {
    return {
        type: actionTypes.DELIVERD_ORDER_FAIL,
        error: err,
    };
};

export const deliveredOrder = (id) => {
    return async (dispatch) => {
        dispatch(deliverdOrderStart());
        try {
            await axios.patch(`http://localhost:5000/order/a/delivered/${id}`);
            dispatch(deliveredOrderSuccess(id));
        } catch (err) {
            dispatch(deliverdOrderFail(err));
        }
    };
};
