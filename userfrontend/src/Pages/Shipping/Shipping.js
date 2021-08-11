import React from "react";
import "./shipping.scss";

const Shipping = () => {
  return (
    <div className="shipping">
      <div className="shipping__header">
        <h1>9 Items Selected</h1>
        <h1>Total Price 2323tk</h1>
      </div>
      <form className="shipping__form">
        <h1>Give Us Your Delivery Information</h1>
        <label>Receiver Name</label>
        <input type="text" placeholder="enter receiver name" />
        <label>Phone</label>
        <input type="number" placeholder="enter your phone number" />
        <label>Address</label>
        <textarea type="text" placeholder="enter delivery address" rows="5" />
        <button>continue</button>
      </form>
    </div>
  );
};

export default Shipping;
