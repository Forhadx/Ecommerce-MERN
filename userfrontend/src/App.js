import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Navigationbar from "./components/Navigation/Navigationbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Cartbar from "./components/Cartbar/Cartbar";
import MainCategories from "./Pages/MainCategories/MainCategories";
import SubCategies from "./Pages/SubCategories/SubCategories";
import DailyProducts from "./Pages/DailyProducts/DailyProducts";
import Signup from "./Pages/UserAuth/Signup/Signup";
import Login from "./Pages/UserAuth/Login/Login";
import Shipping from "./Pages/Shipping/Shipping";
import Payment from "./Pages/Shipping/Payment/payment";
import Home from "./Pages/Home/Home";
import orderSuccess from "./Pages/OrderSuccess/OrderSuccess";
import Orders from "./Pages/Orders/Orders";

import className from "classnames";
import "./App.scss";
import Backdrop from "./components/UI/Backdrop/Backdrop";

const App = (props) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartClickHandler = () => {
        setIsCartOpen(!isCartOpen);
    };

    const { autoLogin } = props;

    useEffect(() => {
        autoLogin();
    }, [autoLogin]);

    return (
        <div className="App">
            <Backdrop show={isCartOpen} clicked={cartClickHandler} />
            <header className="header">
                <Navigationbar cartClickHandler={cartClickHandler} />
            </header>
            <aside className="sidebar">
                <Sidebar />
            </aside>
            <main className="main">
                <Switch>
                    <Route path="/m/:name" component={MainCategories} />
                    <Route path="/s/:name" component={SubCategies} />
                    <Route
                        path="/Daily+Products"
                        exact
                        component={DailyProducts}
                    />
                    {props.token && (
                        <Route path="/orders" exact component={Orders} />
                    )}
                    {!props.token && (
                        <Route path="/signup" exact component={Signup} />
                    )}
                    {!props.token && (
                        <Route path="/login" exact component={Login} />
                    )}
                    {props.cartProducts.length && (
                        <Route path="/shipping" exact component={Shipping} />
                    )}
                    {props.receiver && (
                        <Route path="/payment" exact component={Payment} />
                    )}
                    {!props.orderSuccess && (
                        <Route
                            path="/order-success"
                            exact
                            component={orderSuccess}
                        />
                    )}
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </main>
            <aside className={className("cartbar", { open: isCartOpen })}>
                <Cartbar />
            </aside>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.cartProducts,
        receiver: state.cart.receiver,
        orderSuccess: state.order.orderSuccess,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => dispatch(actions.autoLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
