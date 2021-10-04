import React, { Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import "./App.scss";
import "./products.scss";
import className from "classnames";
import Spinner from "./components/UI/Spinner/Spinner";
import Sidebar from "./components/sidebar/sidebar";
// import Products from "./Pages/Products/Products";
// import Orders from "./Pages/Orders/Orders";
// import AddProduct from "./Pages/AddProduct/AddProducts";
// import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
// import Login from "./Pages/Login/Login";
// import Users from "./Pages/Users/Users";
// import Dashboard from "./Pages/Dashboard/Dashboard";

const Orders = React.lazy(() => {
    return import("./Pages/Orders/Orders");
});
const Users = React.lazy(() => {
    return import("./Pages/Users/Users");
});
const AddProduct = React.lazy(() => {
    return import("./Pages/AddProduct/AddProducts");
});
const UpdateProduct = React.lazy(() => {
    return import("./Pages/UpdateProduct/UpdateProduct");
});
const Products = React.lazy(() => {
    return import("./Pages/Products/Products");
});
const Dashboard = React.lazy(() => {
    return import("./Pages/Dashboard/Dashboard");
});
const Login = React.lazy(() => {
    return import("./Pages/Login/Login");
});

const App = (props) => {
    const [isSidebarClose, setIsSidebarClose] = useState(false);

    const { autoLogin, token } = props;
    useEffect(() => {
        autoLogin();
    }, [autoLogin, token]);

    const sidebarToggleHandler = () => {
        setIsSidebarClose(!isSidebarClose);
    };
    return (
        <div className="App">
            <header className="header">
                <div className="header-logo" onClick={sidebarToggleHandler}>
                    &#9776;
                </div>
                <div>Gro-Mart</div>
            </header>
            {props.token ? (
                <React.Fragment>
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
                                    path="/orders"
                                    render={(props) => <Orders {...props} />}
                                />
                                <Route
                                    path="/users"
                                    render={(props) => <Users {...props} />}
                                />
                                <Route
                                    path="/products/add+product/"
                                    exact
                                    render={(props) => (
                                        <AddProduct {...props} />
                                    )}
                                />
                                <Route
                                    path="/products/update+product/:pId"
                                    exact
                                    render={(props) => (
                                        <UpdateProduct {...props} />
                                    )}
                                />
                                <Route
                                    path="/products"
                                    exact
                                    render={(props) => <Products {...props} />}
                                />
                                <Route
                                    path="/"
                                    exact
                                    render={(props) => <Dashboard {...props} />}
                                />
                                <Redirect to="/" />
                            </Switch>
                        </Suspense>
                    </main>
                </React.Fragment>
            ) : (
                <div>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route
                                path="/login"
                                render={(props) => <Login {...props} />}
                            />
                            <Redirect to="/login" />
                        </Switch>
                    </Suspense>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { autoLogin: () => dispatch(actions.autoLogin()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
