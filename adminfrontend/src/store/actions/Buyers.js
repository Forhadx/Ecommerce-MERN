import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchAllBuyersStart = () => {
    return {
        type: actionTypes.FETCH_ALL_BUYERS_START,
    };
};
export const fetchAllBuyersSuccess = (buyers) => {
    return {
        type: actionTypes.FETCH_ALL_BUYERS_SUCCESS,
        buyers: buyers,
    };
};
export const fetchAllBuyersFail = (err) => {
    return {
        type: actionTypes.FETCH_ALL_BUYERS_FAIL,
        error: err,
    };
};
export const fetchAllBuyers = () => {
    return async (dispatch) => {
        dispatch(fetchAllBuyersStart());
        try {
            const result = await axios.get("http://localhost:5000/buyer/a");
            dispatch(fetchAllBuyersSuccess(result.data.buyers));
        } catch (err) {
            dispatch(fetchAllBuyersFail(err));
        }
    };
};

export const searchBuyerEmailStart = () => {
    return {
        type: actionTypes.SEARCH_BUYER_EMAIL_START,
    };
};
export const searchBuyerEmailSuccess = (buyer) => {
    return {
        type: actionTypes.SEARCH_BUYER_EMAIL_SUCCESS,
        buyer: buyer,
    };
};
export const searchBuyerEmailFail = (err) => {
    return {
        type: actionTypes.SEARCH_BUYER_EMAIL_FAIL,
        error: err,
    };
};
export const searchBuyerEmail = (emailName) => {
    return async (dispatch) => {
        dispatch(searchBuyerEmailStart());
        try {
            const result = await axios.post(
                "http://localhost:5000/buyer/a/email",
                {
                    email: emailName,
                }
            );
            dispatch(searchBuyerEmailSuccess(result.data.buyer));
        } catch (err) {
            dispatch(searchBuyerEmailFail(err));
        }
    };
};
