import React from "react";
import Card from "../../components/Card/Card";

const RegularItems = (props) => {
  return (
    <div className="subCategory__page">
      <h2 className="subCategory__page--heading">Regular items</h2>
      <div className="subCategory__page--img">
        <img
          className="bgImg"
          src="https://images.othoba.com/images/thumbs/0236958.jpeg"
          alt="imgage"
        />
      </div>
      <div className="subCategory__page--cards">
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default RegularItems;
