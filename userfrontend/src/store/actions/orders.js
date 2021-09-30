import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addOrderInit = () => {
    return {
        type: actionTypes.ADD_ORDER_INIT,
    };
};

export const addOrderStart = () => {
    return {
        type: actionTypes.ADD_ORDER_START,
    };
};
export const addOrderSuccess = () => {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
    };
};
export const addOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCTS_FAIL,
        error: err,
    };
};

export const addOrder = (orderData, token) => {
    return async (dispatch) => {
        dispatch(addOrderStart());
        try {
            await axios.post("http://localhost:5000/order/b", orderData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(addOrderSuccess());
        } catch (err) {
            dispatch(addOrderFail(err));
        }
    };
};

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
                "http://localhost:5000/order/b/allorders",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            dispatch(fetchOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchOrdersFail(err));
        }
    };
};
