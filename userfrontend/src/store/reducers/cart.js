import * as actiontypes from "../actions/actionTypes";

const initialState = {
    cartProducts: [],
    totalItem: 0,
    totalPrice: 0,
    receiver: "",
    phone: "",
    address: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.ADD_TO_CART:
            return {
                ...state,
                cartProducts: state.cartProducts.concat({ ...action.prodData }),
                totalPrice:
                    state.totalPrice +
                    action.prodData.price * action.prodData.quantity,
                totalItem: state.totalItem + 1,
            };
        case actiontypes.CANCEL_THE_CART:
            return {
                ...state,
                cartProducts: state.cartProducts.filter(
                    (x) => x._id !== action.prodData._id
                ),
                totalPrice:
                    state.totalPrice -
                    action.prodData.price * action.prodData.quantity,
                totalItem: state.totalItem - 1,
            };
        case actiontypes.INCREASE_PRODUCT_QTY:
            let cartProducts_INC = [...state.cartProducts];
            let prodIndex_INC = state.cartProducts.findIndex(
                (p) => p._id === action.prodData._id
            );
            cartProducts_INC[prodIndex_INC].quantity += 1;
            return {
                ...state,
                cartProducts: cartProducts_INC,
                totalPrice: state.totalPrice + action.prodData.price,
            };
        case actiontypes.DECREASE_PRODUCT_QTY:
            let cartProducts_DEC = [...state.cartProducts];
            let prodIndex_DEC = state.cartProducts.findIndex(
                (p) => p._id === action.prodData._id
            );
            cartProducts_DEC[prodIndex_DEC].quantity -= 1;
            return {
                ...state,
                cartProducts: cartProducts_DEC,
                totalPrice: state.totalPrice - action.prodData.price,
            };
        case actiontypes.ADD_RECEIVER_INFO:
            return {
                ...state,
                receiver: action.info.receiver,
                phone: action.info.phone,
                address: action.info.address,
            };
        case actiontypes.CLEAR_CART:
            return {
                ...state,
                cartProducts: [],
                totalItem: 0,
                totalPrice: 0,
                receiver: "",
                phone: "",
                address: "",
            };
        default:
            return state;
    }
};

export default reducer;
