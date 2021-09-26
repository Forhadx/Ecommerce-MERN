import * as actionTypes from "./actionTypes";

export const addToCart = (prodData) => {
    return {
        type: actionTypes.ADD_TO_CART,
        prodData: prodData,
    };
};

export const cancelTheCart = (prodData) => {
    return {
        type: actionTypes.CANCEL_THE_CART,
        prodData: prodData,
    };
};

export const increaseProdQty = (prodData) => {
    return {
        type: actionTypes.INCREASE_PRODUCT_QTY,
        prodData: prodData,
    };
};

export const decreaseProdQty = (prodData) => {
    return {
        type: actionTypes.DECREASE_PRODUCT_QTY,
        prodData: prodData,
    };
};

export const addReceiverInfo = (info) => {
    return {
        type: actionTypes.ADD_RECEIVER_INFO,
        info: info,
    };
};

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    };
};
