import * as actionTypes from "./actionTypes";
import axios from "axios";

export const userInit = () => {
    return {
        type: actionTypes.USER_INIT,
    };
};

export const userSignupStart = () => {
    return {
        type: actionTypes.USER_SIGNUP_START,
    };
};
export const userSignupSuccess = () => {
    return {
        type: actionTypes.USER_SIGNUP_SUCCESS,
    };
};
export const userSignupFail = (err) => {
    return {
        type: actionTypes.USER_SIGNUP_FAIL,
        error: err,
    };
};

export const userSignup = (userData) => {
    return async (dispatch) => {
        dispatch(userSignupStart());
        try {
            axios.post("http://localhost:5000/buyer/signup", userData);
            dispatch(userSignupSuccess());
        } catch (err) {
            dispatch(userSignupFail(err));
        }
    };
};

export const userLoginStart = () => {
    return {
        type: actionTypes.USER_LOGIN_START,
    };
};

export const userLoginSuccess = (email, user, token, userId) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        email: email,
        user: user,
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
            let result = await axios.post(
                "http://localhost:5000/buyer/login",
                userData
            );
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", result.data.userId);
            localStorage.setItem("user", result.data.user);
            localStorage.setItem("email", result.data.email);
            dispatch(
                userLoginSuccess(
                    result.data.email,
                    result.data.user,
                    result.data.token,
                    result.data.userId
                )
            );
            dispatch(checkAuthTimeout(3600));
        } catch (err) {
            dispatch(userLoginFail(err));
        }
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
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
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                const user = localStorage.getItem("user");
                const email = localStorage.getItem("email");
                dispatch(userLoginSuccess(email, user, token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path,
    };
};
