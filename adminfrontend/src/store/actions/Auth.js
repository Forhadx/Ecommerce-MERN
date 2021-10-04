import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const userLoginStart = () => {
    return {
        type: actionTypes.USER_LOGIN_START,
    };
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        token: token,
        userId: userId,
    };
};
export const userLoginFail = (err) => {
    return {
        type: actionTypes.USER_LOGIN_FAIL,
        error: err,
    };
};

export const userLogin = (userData) => {
    return async (dispatch) => {
        dispatch(userLoginStart());
        try {
            let result = await axios.post("/admin/login", userData);
            const expirationDate = new Date(
                new Date().getTime() + 365 * 24 * 3600 * 1000
            );
            localStorage.setItem("adminTnoken", result.data.token);
            localStorage.setItem("admintExpirationDate", expirationDate);
            localStorage.setItem("adminId", result.data.userId);
            dispatch(userLoginSuccess(result.data.token, result.data.userId));
            dispatch(checkAuthTimeout(365 * 24 * 3600));
        } catch (err) {
            dispatch(userLoginFail(err));
        }
    };
};

export const logout = () => {
    localStorage.removeItem("adminTnoken");
    localStorage.removeItem("admintExpirationDate");
    localStorage.removeItem("adminId");
    return {
        type: actionTypes.USER_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const autoLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem("adminTnoken");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("admintExpirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("adminId");
                dispatch(userLoginSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
