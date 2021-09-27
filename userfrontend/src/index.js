import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./index.scss";
import App from "./App";

import productsReducer from "./store/reducers/products";
import dailyProductsReducer from "./store/reducers/dailyProducts";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/Auth";

const rootReducer = combineReducers({
    prods: productsReducer,
    dailyProd: dailyProductsReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
