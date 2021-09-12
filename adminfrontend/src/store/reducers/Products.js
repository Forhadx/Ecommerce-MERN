import * as actionTypes from "../actions/actionTypes";

const initialState = {
    products: [],
    singleProd: null,
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.concat(action.product),
                loading: false,
                error: false,
            };
        case actionTypes.ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.SINGLE_PRODUCT_INIT: {
            return {
                ...state,
                singleProd: null,
            };
        }
        case actionTypes.SINGLE_PRODUCT_STORE:
            return {
                ...state,
                singleProd: action.singleProd,
            };
        case actionTypes.DELETE_PRODUCT_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            let afterDeleteProducts = state.products.filter(
                (p) => p._id !== action.pId
            );
            return {
                ...state,
                products: afterDeleteProducts,
                loading: false,
                error: false,
            };
        case actionTypes.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.UPDATE_PRODUCT_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            };
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actionTypes.FETCH_MAIN_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_MAIN_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_MAIN_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
