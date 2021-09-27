import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userName: "",
    token: null,
    userId: null,
    error: false,
    loading: false,
    authRedirectPath: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_INIT:
            return {
                ...state,
                error: false,
                loading: false,
                authRedirectPath: "",
            };
        case actionTypes.USER_SIGNUP_START:
            return {
                ...state,
                error: false,
                loading: true,
                authRedirectPath: "",
            };
        case actionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                authRedirectPath: "/login",
            };
        case actionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
                authRedirectPath: "",
            };
        default:
            return state;
    }
};

export default reducer;
