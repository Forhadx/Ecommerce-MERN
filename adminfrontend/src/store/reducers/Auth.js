import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: 1,
    userId: null,
    error: false,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_START:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
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
            };
        default:
            return state;
    }
};

export default reducer;
