import * as actionTypes from "./actionTypes";
import axios from "../../axios";

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
            let result = await axios.get("/order/a/allorders", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchOrdersFail(err));
        }
    };
};

export const fectchNewOrderStart = () => {
    return {
        type: actionTypes.FETCH_NEW_ORDER_START,
    };
};
export const fetchNewOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_NEW_ORDER_SUCCESS,
        orders: orders,
    };
};
export const fetchNewOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_NEW_ORDER_FAIL,
        error: err,
    };
};
export const fetchNewOrders = (token) => {
    return async (dispatch) => {
        dispatch(fectchNewOrderStart());
        try {
            let result = await axios.get("/order/a/new", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchNewOrdersFail(err));
        }
    };
};

export const fetchOnwayOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ONWAY_ORDER_START,
    };
};
export const fetchOnwayOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ONWAY_ORDER_SUCCESS,
        orders: orders,
    };
};
export const fetchOnwayOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ONWAY_ORDER_FAIL,
        error: err,
    };
};
export const fetchOnwayorder = (token) => {
    return async (dispatch) => {
        dispatch(fetchOnwayOrdersStart());
        try {
            let result = await axios.get("/order/a/onway", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchOnwayOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchOnwayOrdersFail(err));
        }
    };
};

export const fetchDeliverdOrdersStart = () => {
    return {
        type: actionTypes.FETCH_DELIVERD_ORDER_START,
    };
};
export const fetchDeliverdOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_DELIVERD_ORDER_SUCCESS,
        orders: orders,
    };
};
export const fetchDeliverdOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_DELIVERD_ORDER_FAIL,
        error: err,
    };
};
export const fetchDeleverdOrders = (token) => {
    return async (dispatch) => {
        dispatch(fetchDeliverdOrdersStart());
        try {
            let result = await axios.get("/order/a/delivered", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchDeliverdOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchDeliverdOrdersFail());
        }
    };
};

export const fetchRejectedOrdersStart = () => {
    return {
        type: actionTypes.FETCH_REJECT_ORDER_START,
    };
};
export const fetchRejectedOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_REJECT_ORDER_SUCCESS,
        orders: orders,
    };
};
export const fetchRejectedOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_REJECT_ORDER_FAIL,
        error: err,
    };
};
export const fetchRejectedOrders = (token) => {
    return async (dispatch) => {
        dispatch(fetchRejectedOrdersStart());
        try {
            let result = await axios.get("/order/a/rejected", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchRejectedOrdersSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchRejectedOrdersFail(err));
        }
    };
};

export const fetchOrdersByIdStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_BY_ID_START,
    };
};
export const fetchOrdersByIdSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_BY_ID_SUCCESS,
        orders: orders,
    };
};
export const fetchOrdersByIdFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_BY_ID_FAIL,
        error: err,
    };
};
export const fetchOrdersById = (id, token) => {
    return async (dispatch) => {
        dispatch(fetchOrdersByIdStart);
        try {
            let result = await axios.get(`/order/a/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(fetchOrdersByIdSuccess(result.data.orders));
        } catch (err) {
            dispatch(fetchOrdersByIdFail());
        }
    };
};

/** UPDATE ORDERS */
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
export const rejectOrder = (id, token) => {
    return async (dispatch) => {
        dispatch(rejectOrderStart());
        try {
            console.log("t: ", token);
            console.log("id: ", id);
            await axios.get(`/order/a/rejected/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
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
export const onwayOrder = (id, token) => {
    return async (dispatch) => {
        dispatch(onwayOrderStart());
        try {
            await axios.get(`/order/a/onway/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
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
export const deliveredOrder = (id, token) => {
    return async (dispatch) => {
        dispatch(deliverdOrderStart());
        try {
            await axios.get(`/order/a/delivered/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(deliveredOrderSuccess(id));
        } catch (err) {
            dispatch(deliverdOrderFail(err));
        }
    };
};
