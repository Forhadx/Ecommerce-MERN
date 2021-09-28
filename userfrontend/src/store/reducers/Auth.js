import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: "",
    token: null,
    userId: null,
    error: false,
    loading: false,
    authRedirectPath: "",
    isSignup: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_INIT:
            return {
                ...state,
                error: false,
                loading: false,
                isSignup: false,
            };
        case actionTypes.USER_SIGNUP_START:
            return {
                ...state,
                error: false,
                loading: true,
                isSignup: false,
            };
        case actionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                isSignup: true,
            };
        case actionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                isSignup: true,
            };
        case actionTypes.USER_LOGIN_START:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token,
                userId: action.userId,
                error: false,
                loading: false,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            };
        case actionTypes.USER_LOGOUT:
            return {
                token: null,
                userId: null,
                error: false,
                loading: false,
                authRedirectPath: "",
            };
        case actionTypes.AUTH_REDIRECT_PATH:
            return {
                authRedirectPath: action.path,
            };
        default:
            return state;
    }
};

export default reducer;
