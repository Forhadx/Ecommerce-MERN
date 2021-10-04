import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
//import { GrAddCircle } from "react-icons/gr";
import "./productFilter.scss";
import { BiSearchAlt } from "react-icons/bi";
import { categoryList } from "../../Data/category";
import { connect } from "react-redux";
import { BiRefresh } from "react-icons/bi";

const ProductFilter = (props) => {
    const [mainCat, setMainCat] = useState("All");
    const [subCat, setSubCat] = useState("All");
    const [copySubCate, setCopySubCate] = useState([]);
    const [prodName, setProdName] = useState("");

    const { onFetchAllProducts, onFetchMainProducts, onFetchSubProducts } =
        props;

    useEffect(() => {
        if (mainCat === "All") {
            onFetchAllProducts();
        } else if (mainCat !== "All" && subCat === "All") {
            onFetchMainProducts(mainCat);
        } else if (mainCat !== "All" && subCat !== "All") {
            onFetchSubProducts(subCat);
        }
    }, [
        onFetchAllProducts,
        onFetchMainProducts,
        onFetchSubProducts,
        mainCat,
        subCat,
    ]);

    const mainCategoryHandler = (e) => {
        setMainCat(e.target.value);
        categoryList.forEach((c) => {
            if (c.mCat === e.target.value) {
                setCopySubCate([...c.sCat]);
            }
        });
    };

    const searchProductHandler = (e) => {
        e.preventDefault();
        if (prodName) {
            props.onSearchProductByName(prodName);
            setMainCat("All");
            setSubCat("All");
        }
    };

    const refreshHandler = () => {
        setMainCat("All");
        setSubCat("All");
        onFetchAllProducts();
    };

    return (
        <div className="products__filter">
            <div className="products__filter--item">
                <label className="products__filter--category-main">
                    Main Category
                </label>
                <select value={mainCat} onChange={mainCategoryHandler}>
                    <option value="All">All</option>
                    {categoryList.map((c) => (
                        <option key={c.mCat} value={c.mCat}>
                            {c.mCat}
                        </option>
                    ))}
                </select>
            </div>
            <div className="products__filter--item">
                <label className="products__filter--category-sub">
                    Sub Category
                </label>
                <select
                    value={subCat}
                    onChange={(e) => setSubCat(e.target.value)}
                >
                    <option value="All">All</option>
                    {copySubCate.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
            <div className="products__filter--item">
                <form
                    className="products__filter--search"
                    onSubmit={searchProductHandler}
                >
                    <input
                        type="text"
                        placeholder="product name"
                        onChange={(e) => setProdName(e.target.value)}
                    />
                    <button type="submit">
                        <BiSearchAlt />
                    </button>
                </form>
                <button className="refresh-btn" onClick={refreshHandler}>
                    <BiRefresh />
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllProducts: () => dispatch(actions.fetchAllProducts()),
        onFetchMainProducts: (mainCatName) =>
            dispatch(actions.fetchMainProducts(mainCatName)),
        onFetchSubProducts: (subCatName) =>
            dispatch(actions.fetchSubProducts(subCatName)),
        onSearchProductByName: (name) =>
            dispatch(actions.searchProductByName(name)),
    };
};

export default connect(null, mapDispatchToProps)(ProductFilter);
