import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Dashboard.scss";
import Spinner from "../../components/UI/Spinner/Spinner";

const Dashboard = (props) => {
    const { onFetchDashboard, token } = props;
    useEffect(() => {
        onFetchDashboard(token);
    }, [onFetchDashboard, token]);

    return (
        <div className="dashboard__page">
            {props.loading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <div className="dashboard__page--item dashboard__page--item-user">
                        <h1>User</h1>
                        <p>{props.totalBuyers}</p>
                    </div>
                    <div className="dashboard__page--item dashboard__page--item-products">
                        <h1>Products</h1>
                        <p>{props.totalProducts}</p>
                    </div>
                    <div className="dashboard__page--item dashboard__page--item-revenue">
                        <h1>revenue</h1>
                        <p>{props.revenue} ৳</p>
                    </div>
                    <div className="dashboard__page--item dashboard__page--item-order">
                        <h1>order done</h1>
                        <p>{props.totalOrders}</p>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        totalProducts: state.dash.totalProducts,
        totalBuyers: state.dash.totalBuyers,
        totalOrders: state.dash.totalOrders,
        revenue: state.dash.revenue,
        loading: state.dash.loading,
        error: state.dash.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchDashboard: (token) => dispatch(actions.fetchDashboard(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
