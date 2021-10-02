import * as actionTypes from "../actions/actionTypes";

const initialState = {
    buyers: [],
    error: false,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BUYERS_START:
            return {
                buyers: [],
                loading: true,
                error: false,
            };
        case actionTypes.FETCH_ALL_BUYERS_SUCCESS:
            return {
                buyers: action.buyers,
                loading: false,
                error: false,
            };
        case actionTypes.FETCH_ALL_BUYERS_FAIL:
            return {
                buyers: [],
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
