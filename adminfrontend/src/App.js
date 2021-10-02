import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Sidebar from "./components/sidebar/sidebar";
import Products from "./Pages/Products/Products";
import Category from "./Pages/Category/Category";
import Orders from "./Pages/Orders/Orders";
import DailyNeeds from "./Pages/DailyNeeds/DailyNeeds";
import AddProduct from "./Pages/AddProduct/AddProducts";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import "./App.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Redirect, Route, Switch } from "react-router";

const App = (props) => {
    const { autoLogin, token } = props;
    useEffect(() => {
        autoLogin();
    }, [autoLogin, token]);

    return (
        <div className="App">
            <header className="header">
                <div>Gro-Mart</div>
            </header>
            {props.token ? (
                <React.Fragment>
                    <aside className="sidebar">
                        <Sidebar />
                    </aside>
                    <main className="main">
                        <Switch>
                            <Route path="/category" component={Category} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/daily+needs" component={DailyNeeds} />
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
