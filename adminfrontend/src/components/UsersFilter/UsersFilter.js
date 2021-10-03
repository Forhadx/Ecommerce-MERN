import React, { useState } from "react";
import { connect } from "react-redux";
import "./UserFilter.scss";
import { BiSearchAlt } from "react-icons/bi";
import * as actions from "../../store/actions/index";
import { BiRefresh } from "react-icons/bi";

const UserFilter = (props) => {
    const [email, setEmail] = useState("");

    const searchBuyerHandler = (e) => {
        e.preventDefault();
        if (email) props.onSearchBuyerEmail(email);
    };

    const refreshHandler = () => {
        props.onFetchAllBuyers();
    };

    return (
        <div className="users__filter">
            <form
                className="users__filter--search"
                onSubmit={searchBuyerHandler}
            >
                <input
                    type="text"
                    placeholder="users email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">
                    <BiSearchAlt />
                </button>
            </form>
            <button className="refresh-btn" onClick={refreshHandler}>
                <BiRefresh />
            </button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchBuyerEmail: (email) =>
            dispatch(actions.searchBuyerEmail(email)),
        onFetchAllBuyers: () => dispatch(actions.fetchAllBuyers()),
    };
};

export default connect(null, mapDispatchToProps)(UserFilter);
