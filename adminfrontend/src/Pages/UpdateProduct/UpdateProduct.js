import React from "react";
import { connect } from "react-redux";
import ProductFrom from "../../components/ProductFrom/ProductFrom";

const UpdateProduct = (props) => {
    return (
        <ProductFrom
            headline="UPDATE A PRODUCT"
            singleProd={props.singleProd}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        singleProd: state.prods.singleProd,
    };
};

export default connect(mapStateToProps)(UpdateProduct);
