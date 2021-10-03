import React, { useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import moment from "moment";
import className from "classnames";
import "./OrderCard.scss";
import { connect } from "react-redux";
import * as actions from "../../store/actions/orders";

const OrderCard = (props) => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const detailsShowHandler = () => {
        setIsOpenDetails(!isOpenDetails);
    };

    const rejectOrderHandler = (id) => {
        props.onRejectOrder(id);
    };

    const acceptOrderHandler = (id) => {
        props.onOnwayOrder(id);
    };

    const deliverOrderHandler = (id) => {
        props.onDeliveredOrder(id);
    };

    return (
        <div className="single__order">
            <div
                className={className("single__order--header", {
                    red: props.order.orderRejected,
                    blue: !props.order.onWay && !props.order.orderRejected,
                    green: props.order.onWay && !props.order.isDelivered,
                    gray: props.order.isDelivered,
                })}
            >
                <div className="single__order--header-item">
                    {!props.order.orderRejected &&
                        !props.order.onWay &&
                        !props.order.isDelivered && (
                            <div>
                                <button
                                    className="acc-btn"
                                    onClick={() =>
                                        acceptOrderHandler(props.order._id)
                                    }
                                >
                                    Accept
                                </button>
                                <button
                                    className="dec-btn"
                                    onClick={() =>
                                        rejectOrderHandler(props.order._id)
                                    }
                                >
                                    Decline
                                </button>
                            </div>
                        )}
                    {!props.order.orderRejected &&
                        props.order.onWay &&
                        !props.order.isDelivered && (
                            <div>
                                <button
                                    className="way-btn"
                                    onClick={() =>
                                        deliverOrderHandler(props.order._id)
                                    }
                                >
                                    ON WAY
                                </button>
                            </div>
                        )}
                    {!props.order.orderRejected &&
                        props.order.onWay &&
                        props.order.isDelivered && (
                            <div>
                                <span className="deliver">Deliverd</span>
                            </div>
                        )}
                    {props.order.orderRejected &&
                        !props.order.onWay &&
                        !props.order.isDelivered && (
                            <div>
                                <span className="reject">Rejected</span>
                            </div>
                        )}
                </div>
                <div className="single__order--header-item">
                    <h2>ID: {props.order._id}</h2>
                    <p>
                        {moment(props.order.createdAt).format(
                            "h:m, DD-MMM-YYYY"
                        )}
                    </p>
                </div>
                <div className="single__order--header-item">
                    <h2>Total Price</h2>
                    <p>{`${props.order.totalPrice} ৳`}</p>
                </div>
                <div className="single__order--header-item">
                    <button onClick={detailsShowHandler}>
                        {isOpenDetails ? <FiMinusSquare /> : <FiPlusSquare />}
                    </button>
                </div>
            </div>
            <div
                className={className("single__order--details", {
                    open: isOpenDetails,
                })}
            >
                <table className="single__order--details-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.order.items.map((i) => (
                            <tr key={i._id}>
                                <td>
                                    <img
                                        className="bgImg"
                                        src={`http://localhost:5000/${i.image}`}
                                        alt="product"
                                    />
                                </td>
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{`${i.quantity} qty`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="single__order--details-address">
                    <h3>Receiver Info</h3>
                    <h4>
                        <span>Phone: </span>
                        {props.order.phone}
                    </h4>
                    <p>
                        <span>Address: </span>
                        {props.order.address}
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRejectOrder: (id) => dispatch(actions.rejectOrder(id)),
        onOnwayOrder: (id) => dispatch(actions.onwayOrder(id)),
        onDeliveredOrder: (id) => dispatch(actions.deliveredOrder(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
