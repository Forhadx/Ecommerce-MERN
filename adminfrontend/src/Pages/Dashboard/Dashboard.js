import React from "react";
import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="dashboard__page">
            <div className="dashboard__page--item dashboard__page--item-user">
                <h1>User</h1>
                <p>1222</p>
            </div>
            <div className="dashboard__page--item dashboard__page--item-products">
                <h1>Products</h1>
                <p>232</p>
            </div>
            <div className="dashboard__page--item dashboard__page--item-revenue">
                <h1>revenue</h1>
                <p>23000 ৳</p>
            </div>
            <div className="dashboard__page--item dashboard__page--item-order">
                <h1>order done</h1>
                <p>420</p>
            </div>
        </div>
    );
};

export default Dashboard;
