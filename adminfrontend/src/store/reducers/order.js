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
        default:
            return state;
    }
};

export default reducer;
