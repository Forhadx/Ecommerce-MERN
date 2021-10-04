import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import className from "classnames";
import "./App.scss";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Spinner from "./components/UI/Spinner/Spinner";
import Sidebar from "./components/Sidebar/Sidebar";
import Navigationbar from "./components/Navigation/Navigationbar";
import Cartbar from "./components/Cartbar/Cartbar";

// import MainCategories from "./Pages/MainCategories/MainCategories";
// import SubCategies from "./Pages/SubCategories/SubCategories";
// import Signup from "./Pages/UserAuth/Signup/Signup";
// import Login from "./Pages/UserAuth/Login/Login";
// import Shipping from "./Pages/Shipping/Shipping";
// import Payment from "./Pages/Shipping/Payment/payment";
// import Home from "./Pages/Home/Home";
// import orderSuccess from "./Pages/OrderSuccess/OrderSuccess";
// import Orders from "./Pages/Orders/Orders";
// import SearchProducts from "./Pages/SearchProducts/SearchProducts";

const MainCategories = React.lazy(() => {
    return import("./Pages/MainCategories/MainCategories");
});
const SubCategies = React.lazy(() => {
    return import("./Pages/SubCategories/SubCategories");
});
const SearchProducts = React.lazy(() => {
    return import("./Pages/SearchProducts/SearchProducts");
});
const Orders = React.lazy(() => {
    return import("./Pages/Orders/Orders");
});
const Signup = React.lazy(() => {
    return import("./Pages/UserAuth/Signup/Signup");
});
const Login = React.lazy(() => {
    return import("./Pages/UserAuth/Login/Login");
});
const Shipping = React.lazy(() => {
    return import("./Pages/Shipping/Shipping");
});
const Payment = React.lazy(() => {
    return import("./Pages/Shipping/Payment/payment");
});
const OrderSuccess = React.lazy(() => {
    return import("./Pages/OrderSuccess/OrderSuccess");
});
const Home = React.lazy(() => {
    return import("./Pages/Home/Home");
});

const App = (props) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSidebarClose, setIsSidebarClose] = useState(false);

    const cartClickHandler = () => {
        setIsCartOpen(!isCartOpen);
    };

    const { autoLogin } = props;

    useEffect(() => {
        autoLogin();
    }, [autoLogin]);

    const sidebarToggleHandler = () => {
        setIsSidebarClose(!isSidebarClose);
    };

    return (
        <div className="App">
            <Backdrop show={isCartOpen} clicked={cartClickHandler} />
            <header className="header">
                <Navigationbar
                    cartClickHandler={cartClickHandler}
                    sidebarToggleHandler={sidebarToggleHandler}
                />
            </header>
            <aside
                className={className("sidebar", {
                    close: isSidebarClose,
                })}
            >
                <Sidebar />
            </aside>
            <main className="main">
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route
                            path="/m/:name"
                            render={(props) => <MainCategories {...props} />}
                        />
                        <Route
                            path="/s/:name"
                            render={(props) => <SubCategies {...props} />}
                        />
                        <Route
                            path="/search/:name"
                            render={(props) => <SearchProducts {...props} />}
                        />
                        {props.token && (
                            <Route
                                path="/orders"
                                exact
                                render={(props) => <Orders {...props} />}
                            />
                        )}
                        {!props.token && (
                            <Route
                                path="/signup"
                                exact
                                render={(props) => <Signup {...props} />}
                            />
                        )}
                        {!props.token && (
                            <Route
                                path="/login"
                                exact
                                render={(props) => <Login {...props} />}
                            />
                        )}
                        {props.cartProducts.length && (
                            <Route
                                path="/shipping"
                                exact
                                render={(props) => <Shipping {...props} />}
                            />
                        )}
                        {props.receiver && (
                            <Route
                                path="/payment"
                                exact
                                render={(props) => <Payment {...props} />}
                            />
                        )}
                        {!props.orderSuccess && (
                            <Route
                                path="/order-success"
                                exact
                                render={(props) => <OrderSuccess {...props} />}
                            />
                        )}
                        <Route
                            path="/"
                            render={(props) => <Home {...props} />}
                        />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
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
