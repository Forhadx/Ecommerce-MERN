import * as actionTypes from "../actions/actionTypes";

const initialState = {
    products: [],
    singleProd: null,
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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

        case actionTypes.FETCH_ALL_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                products: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_MAIN_PRODUCTS_START:
            return {
                ...state,
                products: [],
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
                products: [],
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_SUB_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_SUB_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_SUB_PRODUCTS_FAIL:
            return {
                ...state,
                products: [],
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
