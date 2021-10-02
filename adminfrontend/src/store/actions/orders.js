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
