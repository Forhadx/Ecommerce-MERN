import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import UserFilter from "../../components/UsersFilter/UsersFilter";
import UsersTable from "../../components/UsersTable/UsersTable";

const Users = (props) => {
    const { onFetchAllBuyers } = props;
    useEffect(() => {
        onFetchAllBuyers();
    }, [onFetchAllBuyers]);

    return (
        <div className="page">
            <div className="page--header">All register Users</div>
            <div className="page--details">
                <UserFilter />
                {props.loading ? <Spinner /> : <UsersTable />}
            </div>
        </div>
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

const mapDispatchToProps = (dispatch) => {
    return { onFetchAllBuyers: () => dispatch(actions.fetchAllBuyers()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
