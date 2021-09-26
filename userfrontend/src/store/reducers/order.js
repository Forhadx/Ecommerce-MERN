import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    orderSuccess: false,
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDER_INIT:
            return {
                ...state,
                orderSuccess: false,
            };
        case actionTypes.ADD_ORDER_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.ADD_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: true,
                loading: false,
                error: false,
            };
        case actionTypes.ADD_ORDER_FAIL:
            return {
                ...state,
                orderSuccess: false,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default reducer;
