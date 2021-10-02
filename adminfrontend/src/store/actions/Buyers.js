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
