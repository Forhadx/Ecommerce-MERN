import React from "react";
import { connect } from "react-redux";
import ProductGallary from "../../components/ProductGallary/ProductGallary";

const SearchProducts = (props) => {
    return (
        <div className="subCategory__page">
            <h2 className="subCategory__page--heading">
                <span>{props.match.params.name}</span>
            </h2>
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

export default connect(mapStateToProps)(SearchProducts);
