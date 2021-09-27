import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./SubCategies.scss";
import ProductGallary from "../../components/ProductGallary/ProductGallary";

const SubCat = (props) => {
    const { onFetchSubProducts } = props;
    let subCatName = props.match.params.name.replace(/[+]/g, " ");

    useEffect(() => {
        console.log("params: ", subCatName);
        onFetchSubProducts(subCatName);
    }, [onFetchSubProducts, subCatName]);

    return (
        <div className="subCategory__page">
            <h2 className="subCategory__page--heading">
                Bread & Bakery | <span>{subCatName}</span>
            </h2>
            <div className="subCategory__page--img">
                <img
                    className="bgImg"
                    src="https://images.othoba.com/images/thumbs/0236958.jpeg"
                    alt="imgage"
                />
            </div>
            <ProductGallary products={props.products} loading={props.loading} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.prods.products,
        loading: state.prods.loading,
        error: state.prods.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchSubProducts: (subName) =>
            dispatch(actions.fetchSubProducts(subName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCat);
