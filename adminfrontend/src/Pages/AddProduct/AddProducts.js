import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { categoryList } from "../../Data/category";
import "./AddProduct.scss";

const AddProduct = () => {
  const [mainCat, setMainCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [copySubCate, setCopySubCate] = useState([]);
  const validationSchema = Yup.object().shape({
    mainCategory: Yup.string().required("must select one"),
    subCategory: Yup.string().required(
      "must select one, before select main category"
    ),
    image: Yup.string().required("attached a product image"),
    name: Yup.string()
      .required("name is required")
      .min(3, "too small name, minimum 3 character")
      .max(60, "too big name, maximum 60 character "),
    amount: Yup.string()
      .required("amount is required")
      .max(20, "maximum 20 character "),
    price: Yup.number()
      .required("price is required")
      .typeError("price is required")
      .min(10, "minimum price 10৳")
      .max(2000, "maximum price 2000৳"),
    brand: Yup.string().max(50, "maximum 50 character "),
    description: Yup.string().max(500, "maximum 500 character "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    console.log("m: ", mainCat);
    console.log("s: ", subCat);
  }, [mainCat, subCat]);

  const mainCategoryHandler = (e) => {
    setMainCat(e.target.value);
    categoryList.forEach((c) => {
      if (c.mCat === e.target.value) {
        setCopySubCate([...c.sCat]);
      }
      if (e.target.value === "") {
        setCopySubCate([]);
      }
    });
  };

  const formSubmitHandler = (data) => {
    console.log("data: ", data);
  };

  return (
    <div className="add__product">
      <Link to="/products" className="add__product--back">
        &#8592;Back
      </Link>
      <h1 className="add__product--header">ADD NEW PRODUCT</h1>
      <form
        className="add__product--form"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="add__product--form-input">
          <label>Name</label>
          <input
            type="text"
            placeholder="enter product name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Amount</label>
          <input
            type="text"
            placeholder="kg, litre, pice, number.."
            {...register("amount")}
          />
          <p>{errors.amount?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Price</label>
          <input
            type="number"
            placeholder="enter product price"
            {...register("price")}
          />
          <p>{errors.price?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Brand Name</label>
          <input
            type="text"
            placeholder="enter product brand name"
            {...register("brand")}
          />
          <p>{errors.brand?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Description</label>
          <textarea
            type="text"
            placeholder="enter product name"
            rows="8"
            {...register("description")}
          />
          <p>{errors.description?.message}</p>
        </div>
        <button type="submit">SAVE PRODUCT</button>
      </form>
    </div>
  );
};

export default AddProduct;

/*
<div className="add__product--form-input">
          <label>Main Category</label>
          <select
            {...register("mainCategory")}
            value={mainCat}
            onChange={mainCategoryHandler}
          >
            <option></option>
            {categoryList.map((c) => (
              <option key={c.mCat} value={c.mCat}>
                {c.mCat}
              </option>
            ))}
          </select>
          <p>{errors.mainCategory?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Sub Category</label>
          <select
            {...register("subCategory")}
            value={subCat}
            onChange={(e) => setSubCat(e.target.value)}
          >
            {copySubCate.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p>{errors.subCategory?.message}</p>
        </div>
        <div className="add__product--form-input">
          <label>Product Image</label>
          <input type="text" placeholder="enter product name" />
        </div>
        <div className="add__product--form-input">
          <label></label>
          <img
            className="bgImg"
            src="https://chaldn.com/_mpimage/malta-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D77383&q=low&v=1&m=400&webp=1"
            alt="pic"
          />
        </div>
*/
