import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchDashboardStart = () => {
    return {
        type: actionTypes.FETCH_DASHBOARD_START,
    };
};
export const fetchDashboardSuccess = (
    totalProducts,
    totalBuyers,
    totalOrders,
    revenue
) => {
    return {
        type: actionTypes.FETCH_DASHBOARD_SUCCESS,
        totalProducts: totalProducts,
        totalBuyers: totalBuyers,
        totalOrders: totalOrders,
        revenue: revenue,
    };
};
export const fetchDashboardFail = (err) => {
    return {
        type: actionTypes.FETCH_DASHBOARD_FAIL,
    };
};
export const fetchDashboard = (token) => {
    return async (dispatch) => {
        dispatch(fetchDashboardStart());
        try {
            const result = await axios.get("/dashboard", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(
                fetchDashboardSuccess(
                    result.data.totalProducts,
                    result.data.totalBuyers,
                    result.data.totalOrders,
                    result.data.revenue
                )
            );
        } catch (err) {
            dispatch(fetchDashboardFail(err));
        }
    };
};
