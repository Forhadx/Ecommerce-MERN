import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./shipping.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Shipping = (props) => {
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        receiver: Yup.string()
            .required("receiver name is required")
            .min(3, "too small name, minimum 3 character")
            .max(60, "too big name, maximum 60 character "),
        phone: Yup.number()
            .required("phone number is required")
            .typeError("phone number is required"),
        //.min(11, "+880XXXXXXXXXX")
        // .max(11, "+880XXXXXXXXXX"),
        address: Yup.string()
            .required("address is required")
            .min(3, "too small name, minimum 3 character")
            .max(60, "too big name, maximum 60 character "),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const continueHandler = (data) => {
        props.onAddReceiverInfo(data);
        reset();
        history.push("/payment");
    };

    return (
        <div className="shipping">
            <div className="shipping__header">
                <h1>9 Items Selected</h1>
                <h1>Total Price 2323tk</h1>
            </div>
            <form
                className="shipping__form"
                onSubmit={handleSubmit(continueHandler)}
            >
                <h1>Give Us Your Delivery Information</h1>
                <label>Receiver Name</label>
                <input
                    type="text"
                    placeholder="enter receiver name"
                    {...register("receiver")}
                />
                <p>{errors.receiver?.message}</p>
                <label>Phone</label>
                <input
                    type="number"
                    placeholder="enter your phone number"
                    {...register("phone")}
                />
                <p>{errors.phone?.message}</p>
                <label>Address</label>
                <textarea
                    type="text"
                    placeholder="enter delivery address"
                    rows="5"
                    {...register("address")}
                />
                <p>{errors.address?.message}</p>
                <button type="submit">continue</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddReceiverInfo: (subName) =>
            dispatch(actions.addReceiverInfo(subName)),
    };
};
export default connect(null, mapDispatchToProps)(Shipping);
