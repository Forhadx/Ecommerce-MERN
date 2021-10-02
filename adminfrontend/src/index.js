import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import productsReducer from "./store/reducers/Products";
import authReducer from "./store/reducers/Auth";
import buyerReducer from "./store/reducers/Buyers";
import orderReducer from "./store/reducers/order";

const rootReducer = combineReducers({
    prods: productsReducer,
    auth: authReducer,
    buyer: buyerReducer,
    order: orderReducer,
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
