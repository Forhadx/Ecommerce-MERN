import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

import "./products.scss";

const Products = () => {
  const [mainCat, setMainCat] = useState("all");
  const [subCat, setSubCat] = useState("all");

  const categoryList = [
    { mCat: "a", sCat: "X1" },
    { mCat: "a", sCat: "X2" },
    { mCat: "a", sCat: "X3" },
    { mCat: "b", sCat: "y1" },
    { mCat: "b", sCat: "y2" },
    { mCat: "b", sCat: "y3" },
    { mCat: "c", sCat: "z1" },
    { mCat: "c", sCat: "z2" },
    { mCat: "c", sCat: "z3" },
  ];

  useEffect(() => {
    console.log("Main: ", mainCat);
    console.log("Sub: ", subCat);
  }, [mainCat, subCat]);

  return (
    <div className="products__page">
      <div className="products__page--header">Products</div>
      <div className="products__page--details">
        <button className="products__page--details-add">
          <IoMdAdd />
          <span> Add Product</span>
        </button>
        <div className="products__page--details-filter">
          <div>
            <label>Main-Category</label>
            <select value="all" onChange={(e) => setMainCat(e.target.value)}>
              <option value="all">AlL</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
            <label>Sub-Category</label>
            <select value="all" onChange={(e) => setSubCat(e.target.value)}>
              {mainCat === "all" && <option value="all">AlL</option>}
              {categoryList.map(
                (c) =>
                  c.mCat == mainCat && (
                    <option key={c.sCat} value={c.sCat}>
                      {c.sCat}
                    </option>
                  )
              )}
            </select>
          </div>
          <form>
            <input type="text" placeholder="search products" />
            <button>ok</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
