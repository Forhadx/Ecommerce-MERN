import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Card from "../../components/Card/Card";
import "./SubCategies.scss";

const SubCat = (props) => {
  const { onFetchSubProd } = props;
  let subCategoryName = props.match.params.name.replace(/[+]/g, " ");

  useEffect(() => {
    // console.log("params: ", subCategoryName);
    onFetchSubProd(subCategoryName);
  }, [onFetchSubProd, subCategoryName]);

  return (
    <div className="subCategory__page">
      <h2 className="subCategory__page--heading">{`Bread & Bakery | ${subCategoryName}`}</h2>
      <div className="subCategory__page--img">
        <img
          className="bgImg"
          src="https://images.othoba.com/images/thumbs/0236958.jpeg"
          alt="imgage"
        />
      </div>
      <div className="subCategory__page--cards">
        {props.products.map((prod) => (
          <div className="subCategory__page--cards-single" key={prod._id}>
            <Card product={prod} />
          </div>
        ))}
      </div>
      {props.products.length === 0 && (
        <div className="subCategory__page--noProduct">
          {`${subCategoryName}'s stock is empty.`}
        </div>
      )}
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
