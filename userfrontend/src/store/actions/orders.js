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

export const addOrder = (orderData) => {
    return async (dispatch) => {
        dispatch(addOrderStart());
        try {
            axios.post("http://localhost:5000/order/b", orderData);
            dispatch(addOrderSuccess());
        } catch (err) {
            dispatch(addOrderFail(err));
        }
    };
};
