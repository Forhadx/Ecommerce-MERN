import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { categoryList } from "../../Data/category";
import "./ProductsFrom.scss";

const ProductFrom = (props) => {
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
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // setValue("name", "max");

    const mainCategoryHandler = (e) => {
        categoryList.forEach((c) => {
            if (c.mCat === e.target.value) {
                setCopySubCate([...c.sCat]);
            }
        });
    };

    const { singleProd } = props;
    useEffect(() => {
        if (singleProd) {
            setValue("mainCategory", singleProd.mainCategory);
            setValue("image", singleProd.image);
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
    }, [singleProd, setValue]);

    if (singleProd) {
        setValue("subCategory", singleProd.subCategory);
    }

    const formSubmitHandler = (data) => {
        if (singleProd) {
            props.onUpdateProduct(singleProd._id, data);
        } else {
            props.onAddProduct(data);
        }
        reset();
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
                        type="text"
                        placeholder="enter product name"
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
    };
};

export default connect(null, mapDispatchToProps)(ProductFrom);

/*



*/
