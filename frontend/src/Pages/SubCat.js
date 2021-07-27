import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import Card from "../components/Card/Card";

const SubCat = (props) => {
  const { onFetchSubProd } = props;
  let paramName = props.match.params.name;
  useEffect(() => {
    // console.log("params: ", paramName);
    onFetchSubProd(paramName);
  }, [onFetchSubProd, paramName]);
  console.log("prd: ", props.products);
  return (
    <div style={{ padding: "5rem" }}>
      sub cat
      <h2>{props.match.params.name}</h2>
      <Card />
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
