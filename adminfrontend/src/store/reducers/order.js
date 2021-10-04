import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    orderSuccess: false,
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        case actionTypes.REJECT_ORDER_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.REJECT_ORDER_SUCCESS:
            let updatedOrder = [...state.orders];
            let index = updatedOrder.findIndex((x) => x._id === action.id);
            updatedOrder[index].orderRejected = true;
            return {
                ...state,
                orders: updatedOrder,
                loading: false,
                error: false,
            };
        case actionTypes.REJECT_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.ONWAY_ORDER_START:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.ONWAY_ORDER_SUCCESS:
            let updatedOnwayOrder = [...state.orders];
            let indexOnway = updatedOnwayOrder.findIndex(
                (x) => x._id === action.id
            );
            updatedOnwayOrder[indexOnway].onWay = true;
            return {
                ...state,
                orders: updatedOnwayOrder,
                loading: false,
                error: false,
            };
        case actionTypes.ONWAY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.DELIVERD_ORDER_START:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.DELIVERD_ORDER_SUCCESS:
            let updatedDeliverdOrder = [...state.orders];
            let indexDeliverd = updatedDeliverdOrder.findIndex(
                (x) => x._id === action.id
            );
            updatedDeliverdOrder[indexDeliverd].isDelivered = true;
            return {
                ...state,
                orders: updatedDeliverdOrder,
                loading: false,
                error: false,
            };
        case actionTypes.DELIVERD_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_NEW_ORDER_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_NEW_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_NEW_ORDER_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_ONWAY_ORDER_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_ONWAY_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_ONWAY_ORDER_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_DELIVERD_ORDER_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_DELIVERD_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_DELIVERD_ORDER_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_REJECT_ORDER_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_REJECT_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_REJECT_ORDER_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_ORDERS_BY_ID_START:
            return {
                ...state,
                orders: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_ORDERS_BY_ID_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_ORDERS_BY_ID_FAIL:
            return {
                ...state,
                orders: [],
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
