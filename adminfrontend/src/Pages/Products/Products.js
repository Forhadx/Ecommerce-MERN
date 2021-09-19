import React from "react";
import ProductFilter from "../../components/productFilter/productFilter";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { IoMdAdd } from "react-icons/io";

import "./products.scss";
import { Link } from "react-router-dom";
import ProductTable from "../../components/productsTable/productsTable";

const Products = (props) => {
    return (
        <div className="products__page">
            <div className="products__page--header">Products</div>
            <div className="products__page--details">
                <Link
                    to="/products/add+product"
                    className="products__page--details-add"
                >
                    <IoMdAdd />
                    <span> Add Product</span>
                </Link>
                <ProductFilter />
                <ProductTable products={props.products} />
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
        onFetchAllProducts: () => dispatch(actions.fetchAllProducts()),
        onFetchMainProducts: (mainCatName) =>
            dispatch(actions.fetchMainProducts(mainCatName)),
        onFetchSubProducts: (subCatName) =>
            dispatch(actions.fetchSubProducts(subCatName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
