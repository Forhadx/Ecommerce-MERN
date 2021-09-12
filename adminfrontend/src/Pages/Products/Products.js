import React, { useEffect } from "react";
import ProductFilter from "../../components/productFilter/productFilter";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { IoMdAdd } from "react-icons/io";

import "./products.scss";
import { Link } from "react-router-dom";
import ProductTable from "../../components/productsTable/productsTable";

const Products = (props) => {
    const { onFetchMainProducts, products } = props;
    useEffect(() => {
        let data = {
            mainCatName: "Bread & Bakery",
        };
        onFetchMainProducts(data);
    }, [onFetchMainProducts]);

    //console.log("p: ", props.products);

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
                <ProductTable products={products} />
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
        onFetchMainProducts: (mainCatName) =>
            dispatch(actions.fetchMainProducts(mainCatName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
