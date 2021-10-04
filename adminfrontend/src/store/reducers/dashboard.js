import * as actionTypes from "../actions/actionTypes";

const initialState = {
    totalProducts: 0,
    totalBuyers: 0,
    totalOrders: 0,
    revenue: 0,
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DASHBOARD_START:
            return {
                ...state,
                totalProducts: 0,
                totalBuyers: 0,
                totalOrders: 0,
                revenue: 0,
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                totalProducts: action.totalProducts,
                totalBuyers: action.totalBuyers,
                totalOrders: action.totalOrders,
                revenue: action.revenue,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_DASHBOARD_FAIL:
            return {
                ...state,
                totalProducts: 0,
                totalBuyers: 0,
                totalOrders: 0,
                revenue: 0,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
