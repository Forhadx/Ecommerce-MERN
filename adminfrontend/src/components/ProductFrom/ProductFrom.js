import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { categoryList } from "../../Data/category";
import "./ProductsFrom.scss";

const ProductFrom = (props) => {
    const history = useHistory();

    const { singleProd, onFetchAllProducts } = props;

    const [goBack, setGoBack] = useState(false);
    const [copySubCate, setCopySubCate] = useState([]);

    const validationSchema = Yup.object().shape({
        mainCategory: Yup.string().required("must select one"),
        subCategory: Yup.string().required(
            "must select one, before select main category"
        ),
        image: singleProd
            ? Yup.mixed()
            : Yup.mixed().test(
                  "file",
                  "Image is required (minimum 5MB)",
                  (value) => {
                      if (!value.length) {
                          return false;
                      }
                      return value[0].size <= 5000000;
                  }
              ),
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
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const mainCategoryHandler = (e) => {
        categoryList.forEach((c) => {
            if (c.mCat === e.target.value) {
                setCopySubCate([...c.sCat]);
            }
        });
    };

    useEffect(() => {
        if (singleProd) {
            setValue("mainCategory", singleProd.mainCategory);
            setValue("name", singleProd.name);
            setValue("amount", singleProd.amount);
            setValue("price", singleProd.price);
            setValue("brand", singleProd.brand);
            setValue("description", singleProd.description);

            categoryList.forEach((c) => {
                if (c.mCat === singleProd.mainCategory) {
                    setCopySubCate([...c.sCat]);
                }
            });
        }
        if (goBack) {
            setGoBack(false);
            onFetchAllProducts();
            history.push("/products");
        }
    }, [singleProd, setValue, goBack, history, onFetchAllProducts]);

    if (singleProd) {
        setValue("subCategory", singleProd.subCategory);
    }

    const formSubmitHandler = (data) => {
        const formData = new FormData();
        formData.append("mainCategory", data.mainCategory);
        formData.append("subCategory", data.subCategory);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("amount", data.amount);
        formData.append("brand", data.brand);
        formData.append("description", data.description);

        if (singleProd) {
            if (data.image[0]) {
                formData.append("image", data.image[0]);
            } else {
                formData.append("image", singleProd.image);
            }
            // props.onUpdateProduct(singleProd._id, formData);  // stop update porduct
            setGoBack(true);
        } else {
            formData.append("image", data.image[0]);
            props.onAddProduct(formData);
            reset();
        }
    };

    return (
        <div className="add__product">
            <Link to="/products" className="add__product--back">
                &#8592;Back
            </Link>
            <h1 className="add__product--header">{props.headline}</h1>
            <form
                className="add__product--form"
                onSubmit={handleSubmit(formSubmitHandler)}
            >
                <div className="add__product--form-input">
                    <label>Main Category</label>
                    <select
                        {...register("mainCategory")}
                        onChange={mainCategoryHandler}
                    >
                        <option value="" hidden>
                            - select one -
                        </option>
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
                    <select {...register("subCategory")}>
                        {singleProd ? (
                            <option value={singleProd.subCategory} hidden>
                                {singleProd.subCategory}
                            </option>
                        ) : (
                            <option value="" hidden>
                                - select one -
                            </option>
                        )}
                        {copySubCate.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <p>{errors.subCategory?.message}</p>
                </div>
                <div className="add__product--form-input">
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                    />
                    <p>{errors.image?.message}</p>
                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProduct: (prodData) => dispatch(actions.addProduct(prodData)),
        onUpdateProduct: (pId, prod) =>
            dispatch(actions.updateProduct(pId, prod)),
        onFetchAllProducts: () => dispatch(actions.fetchAllProducts()),
    };
};

export default connect(null, mapDispatchToProps)(ProductFrom);
