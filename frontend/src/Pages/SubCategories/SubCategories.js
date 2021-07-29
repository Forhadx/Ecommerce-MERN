import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Card from "../../components/Card/Card";
import "./SubCategies.scss";

const SubCat = (props) => {
  const { onFetchSubProd } = props;
  let paramName = props.match.params.name;
  useEffect(() => {
    // console.log("params: ", paramName);
    onFetchSubProd(paramName);
  }, [onFetchSubProd, paramName]);
  console.log("prd: ", props.products);
  return (
    <div className="subCategory__page">
      <h2 className="subCategory__page--heading">{`Bread & Bakery | ${paramName}`}</h2>
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
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
        <div className="subCategory__page--cards-single">
          <Card />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.prods.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSubProd: (subName) => dispatch(actions.fetchProductSubCat(subName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCat);

/*


{props.products.map((prod) => (
        <img
          src={prod.image}
          alt=" "
          style={{ width: "10rem", border: "1px solid black" }}
        />
      ))}

      
*/
