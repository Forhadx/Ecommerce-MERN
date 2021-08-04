import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchDailyProdStart = () => {
  return {
    type: actionTypes.FETCH_DAILYPRODUCTS_START,
  };
};

export const fetchDailyProdSuccess = (products, details) => {
  return {
    type: actionTypes.FETCH_DAILYPRODUCTS_SUCCESS,
    products: products,
    details: details,
  };
};

export const fetchDailyProdFail = () => {
  return {
    type: actionTypes.FETCH_DAILYPRODUCTS_FAIL,
  };
};

export const fetchDailyProd = () => {
  return async (dispatch) => {
    dispatch(fetchDailyProdStart);
    try {
      const result = await axios.get("http://localhost:5000/daily-products");
      dispatch(
        fetchDailyProdSuccess(result.data.products, result.data.details)
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDailyProdFail);
    }
  };
};
