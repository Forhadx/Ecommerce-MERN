import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addProductStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START,
    };
};

export const addProductSuccess = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product: product,
    };
};

export const addProductFail = () => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
    };
};

export const addProduct = (prodData) => {
    return async (dispatch) => {
        dispatch(addProductStart());
        try {
            const result = await axios.post(
                "http://localhost:5000/product/",
                prodData
            );
            console.log("res: ", result.data.product);
            dispatch(addProductSuccess(result.data.product));
        } catch (err) {
            dispatch(addProductFail());
        }
    };
};

export const singleProductInit = () => {
    return {
        type: actionTypes.SINGLE_PRODUCT_INIT,
    };
};

export const singleProductStore = (prods) => {
    return {
        type: actionTypes.SINGLE_PRODUCT_STORE,
        singleProd: prods,
    };
};

export const deleteProductStart = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START,
    };
};

export const deleteProductSuccess = (pId) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        pId: pId,
    };
};

export const deleteProductFail = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error,
    };
};

export const deleteProduct = (pId) => {
    return async (dispatch) => {
        dispatch(deleteProductStart());
        try {
            await axios.delete(`http://localhost:5000/product/${pId}`);
            dispatch(deleteProductSuccess(pId));
        } catch (err) {
            dispatch(deleteProductFail(err));
        }
    };
};

export const updateProductStart = () => {
    return {
        type: actionTypes.UPDATE_PRODUCT_START,
    };
};

export const updateProductSuccess = (prod) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    };
};

export const updateProductFail = (err) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        error: err,
    };
};

export const updateProduct = (pId, prod) => {
    return async (dispatch) => {
        dispatch(updateProductStart());
        try {
            //console.log("a p: ", pId, " ", prod);
            let result = await axios.put(
                `http://localhost:5000/product/${pId}`,
                prod
            );
            console.log("res: ", result);
            dispatch(updateProductSuccess());
        } catch (err) {
            dispatch(updateProductFail(err));
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
        dispatch(fetchMainProductsSuccess());
        try {
            const result = await axios.post(
                "http://localhost:5000/products/mainCategory",
                mainCatName
            );
            dispatch(fetchMainProductsSuccess(result.data.products));
        } catch (err) {
            dispatch(fetchMainProductsFail());
        }
    };
};
