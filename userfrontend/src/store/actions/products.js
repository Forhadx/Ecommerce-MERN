import * as actionTypes from "./actionTypes";
import axios from "axios";

export const singleProductInit = () => {
    return {
        type: actionTypes.SINGLE_PRODUCT_INIT,
    };
};

export const singleProductStore = (prod) => {
    return {
        type: actionTypes.SINGLE_PRODUCT_STORE,
        singleProd: prod,
    };
};

export const fetchAllProductsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCTS_START,
    };
};
export const fetchAllProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
        products: products,
    };
};
export const fetchAllProductsFail = (err) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCTS_FAIL,
        error: err,
    };
};
export const fetchAllProducts = () => {
    return async (dispatch) => {
        dispatch(fetchAllProductsStart());
        try {
            const result = await axios.get("http://localhost:5000/products");
            dispatch(fetchAllProductsSuccess(result.data.products));
        } catch (err) {
            dispatch(fetchAllProductsFail(err));
        }
    };
};

export const fetchMainProductsStart = () => {
    return {
        type: actionTypes.FETCH_MAIN_PRODUCTS_START,
    };
};

export const fetchMainProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_MAIN_PRODUCTS_SUCCESS,
        products: products,
    };
};

export const fetchMainProductsFail = () => {
    return {
        type: actionTypes.FETCH_MAIN_PRODUCTS_FAIL,
    };
};

export const fetchMainProducts = (mainCatName) => {
    return async (dispatch) => {
        dispatch(fetchMainProductsStart());
        try {
            const result = await axios.post(
                "http://localhost:5000/products/mainCategory",
                { mainCatName: mainCatName }
            );
            dispatch(fetchMainProductsSuccess(result.data.products));
        } catch (err) {
            dispatch(fetchMainProductsFail());
        }
    };
};

export const fetchSubProductsStart = () => {
    return {
        type: actionTypes.FETCH_SUB_PRODUCTS_START,
    };
};
export const fetchSubProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_SUB_PRODUCTS_SUCCESS,
        products: products,
    };
};
export const fetchSubProductsFail = (err) => {
    return {
        type: actionTypes.FETCH_SUB_PRODUCTS_FAIL,
        error: err,
    };
};
export const fetchSubProducts = (subCatName) => {
    return async (dispatch) => {
        dispatch(fetchSubProductsStart());
        try {
            const result = await axios.post(
                "http://localhost:5000/products/subCategory",
                { subCatName: subCatName }
            );
            dispatch(fetchSubProductsSuccess(result.data.products));
        } catch (err) {
            dispatch(fetchSubProductsFail(err));
        }
    };
};
