import React, { useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import moment from "moment";
import className from "classnames";
import "./OrderCard.scss";

const OrderCard = (props) => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const detailsShowHandler = () => {
        setIsOpenDetails(!isOpenDetails);
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
                    {props.order.orderRejected && <h5>REJECTED</h5>}
                    {!props.order.onWay && !props.order.orderRejected && (
                        <h5>Hold</h5>
                    )}
                    {props.order.onWay && !props.order.isDelivered && (
                        <h5>ON Way</h5>
                    )}
                    {props.order.isDelivered && <h5>DELIVERD</h5>}
                </div>
                <div className="single__order--header-item">
                    <h2>ID: {props.order._id}</h2>
                    <h3>{`${props.order.totalPrice} ৳`}</h3>
                    <p>
                        {moment(props.order.createdAt).format(
                            "h:m, DD-MMM-YYYY"
                        )}
                    </p>
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
                                        src={
                                            process.env.REACT_APP_BASE_URL +
                                            i.image
                                        }
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

export default OrderCard;
