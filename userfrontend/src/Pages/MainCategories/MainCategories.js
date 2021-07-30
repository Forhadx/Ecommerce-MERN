import React from "react";
import "./MainCategories.scss";

const mainCat = (props) => {
  //console.log(props.history.location.pathname)
  console.log("maincat: ", props.match.params.name.replace(/[+]/g, " "));
  let mainCategoryName = props.match.params.name.replace(/[+]/g, " ");

  return (
    <div className="mainCategory__page">
      <h1 className="mainCategory__page--heading">
        <span>{mainCategoryName}</span>
      </h1>
      <div className="mainCategory__page--sub">
        <div className="mainCategory__page--sub-details">
          <img
            className="bgImg"
            src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
            alt="img"
          />
          <h1>Cake</h1>
        </div>
        <div className="mainCategory__page--sub-details">
          <img
            className="bgImg"
            src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
            alt="img"
          />
          <h1>Cake</h1>
        </div>
        <div className="mainCategory__page--sub-details">
          <img
            className="bgImg"
            src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
            alt="img"
          />
          <h1>Cake</h1>
        </div>
      </div>
    </div>
  );
};

export default mainCat;
