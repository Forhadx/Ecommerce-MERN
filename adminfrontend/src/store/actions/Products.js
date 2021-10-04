import * as actionTypes from "./actionTypes";
import axios from "../../axios";

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
            const result = await axios.post("/product/", prodData);
            //console.log("res: ", result.data.product);
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

export const singleProductStore = (prod) => {
    return {
        type: actionTypes.SINGLE_PRODUCT_STORE,
        singleProd: prod,
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
            await axios.delete(`/product/${pId}`);
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

export const updateProductSuccess = () => {
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
            console.log("up a");
            await axios.patch(`/product/${pId}`, prod);
            dispatch(updateProductSuccess());
        } catch (err) {
            dispatch(updateProductFail(err));
        }
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
            const result = await axios.get("/products");
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
        dispatch(fetchMainProductsSuccess());
        try {
            const result = await axios.post("/products/mainCategory", {
                mainCatName: mainCatName,
            });
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
            const result = await axios.post("/products/subCategory", {
                subCatName: subCatName,
            });
            dispatch(fetchSubProductsSuccess(result.data.products));
        } catch (err) {
            dispatch(fetchSubProductsFail(err));
        }
    };
};

export const searchProductByNameStart = () => {
    return {
        type: actionTypes.SEARCH_PRODUCT_BY_NAME_START,
    };
};
export const searchProductByNameSuccess = (products) => {
    return {
        type: actionTypes.SEARCH_PRODUCT_BY_NAME_SUCCESS,
        products: products,
    };
};
export const searchProductByNameFail = (err) => {
    return {
        type: actionTypes.SEARCH_PRODUCT_BY_NAME_FAIL,
        error: err,
    };
};
export const searchProductByName = (name) => {
    return async (dispatch) => {
        dispatch(searchProductByNameStart());
        try {
            const result = await axios.get(`/product/name/${name}`);
            dispatch(searchProductByNameSuccess(result.data.products));
        } catch (err) {
            dispatch(searchProductByNameFail(err));
        }
    };
};
