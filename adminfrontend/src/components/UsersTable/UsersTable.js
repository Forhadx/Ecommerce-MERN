import React from "react";
import "./UsersTable.scss";
import { connect } from "react-redux";
import moment from "moment";

const UsersTable = (props) => {
    return (
        <table className="users__table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Spent</th>
                    <th>Join</th>
                </tr>
            </thead>
            <tbody>
                {props.buyers.map((b) => (
                    <tr key={b._id}>
                        <td>{b.name}</td>
                        <td>{b.email}</td>
                        <td>{`${b.totalbuy} ৳`}</td>
                        <td>{moment(b.createdAt).format("DD-MMM-YYYY")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const mapStateToProps = (state) => {
    return {
        buyers: state.buyer.buyers,
        loading: state.buyer.loading,
        error: state.buyer.error,
        token: state.buyer.token,
    };
};

export default connect(mapStateToProps)(UsersTable);
