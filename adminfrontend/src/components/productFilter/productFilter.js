import React, { useState } from "react";
//import { GrAddCircle } from "react-icons/gr";
import "./productFilter.scss";
import { BiSearchAlt } from "react-icons/bi";
import { categoryList } from "../../Data/category";

const ProductFilter = () => {
    const [mainCat, setMainCat] = useState("All");
    const [subCat, setSubCat] = useState("All");
    const [copySubCate, setCopySubCate] = useState([]);

    const mainCategoryHandler = (e) => {
        setMainCat(e.target.value);
        categoryList.forEach((c) => {
            if (c.mCat === e.target.value) {
                setCopySubCate([...c.sCat]);
            }
        });
    };

    return (
        <div className="products__filter">
            <div className="products__filter--category">
                <label className="products__filter--category-main">
                    Main Category
                </label>
                <select value={mainCat} onChange={mainCategoryHandler}>
                    <option value="All">AlL</option>
                    {categoryList.map((c) => (
                        <option key={c.mCat} value={c.mCat}>
                            {c.mCat}
                        </option>
                    ))}
                </select>
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
            <form className="products__filter--search">
                <input type="text" placeholder="search products" />
                <button>
                    <BiSearchAlt />
                </button>
            </form>
        </div>
    );
};

export default ProductFilter;
