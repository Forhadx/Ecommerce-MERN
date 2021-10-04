import React from "react";
import ProductFilter from "../../components/productFilter/productFilter";
import { connect } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Link } from "react-router-dom";
import ProductTable from "../../components/productsTable/productsTable";

const Products = (props) => {
    return (
        <div className="page">
            <div className="page--header">Products</div>
            <div className="page--details">
                <Link to="/products/add+product" className="page--details-add">
                    <IoMdAdd />
                    <span> Add Product</span>
                </Link>
                <ProductFilter />
                {props.loading ? (
                    <Spinner />
                ) : (
                    <ProductTable products={props.products} />
                )}
            </div>
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

export default connect(mapStateToProps)(Products);
