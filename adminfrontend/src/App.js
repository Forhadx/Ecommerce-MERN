import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Sidebar from "./components/sidebar/sidebar";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import AddProduct from "./Pages/AddProduct/AddProducts";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import "./App.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Redirect, Route, Switch } from "react-router";
import className from "classnames";

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
                        <Switch>
                            <Route path="/orders" component={Orders} />
                            <Route path="/users" component={Users} />
                            <Route
                                path="/products/add+product/"
                                exact
                                component={AddProduct}
                            />
                            <Route
                                path="/products/update+product/:pId"
                                exact
                                component={UpdateProduct}
                            />
                            <Route
                                path="/products"
                                exact
                                component={Products}
                            />
                            <Route path="/" exact component={Dashboard} />
                            <Redirect to="/" />
                        </Switch>
                    </main>
                </React.Fragment>
            ) : (
                <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
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
