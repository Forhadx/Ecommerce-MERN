import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const SubCat = (props) => {
  const { onFetchSubProd } = props;
  let paramName = props.match.params.name;
  useEffect(() => {
    // console.log("params: ", paramName);
    onFetchSubProd(paramName);
  }, [onFetchSubProd, paramName]);
  return (
    <div>
      sub cat
      <h2>{props.match.params.name}</h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prods: state.prods.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSubProd: (subName) => dispatch(actions.fetchProductSubCat(subName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCat);
