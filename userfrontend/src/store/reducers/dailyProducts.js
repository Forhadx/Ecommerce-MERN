import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  name: "",
  image: "",
  description: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DAILYPRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
        name: action.details.name,
        description: action.details.description,
        image: action.details.image,
      };
    default:
      return state;
  }
};

export default reducer;
