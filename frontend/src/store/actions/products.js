import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchProductSubCatStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUBCAT_START,
  };
};

export const fetchProductSubSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUBCAT_SUCCESS,
    products: data,
  };
};

export const fetchProductSubCatFail = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUBCAT_FAIL,
  };
};

export const fetchProductSubCat = (subName) => {
  return async (dispatch) => {
    dispatch(fetchProductSubCatStart());
    try {
      // http://localhost:5000/product/subCategory/milk?page=1
      const result = await axios.get(
        `http://localhost:5000/product/subCategory/${subName}?page=${"1"}`
      );
      console.log(result);
      dispatch(fetchProductSubSuccess(result.data.products));
    } catch (err) {
      console.log(err);
    }
  };
};
