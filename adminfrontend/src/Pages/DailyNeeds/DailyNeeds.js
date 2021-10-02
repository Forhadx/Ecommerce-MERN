import React from "react";
import ProductFilter from "../../components/productFilter/productFilter";
import { IoMdAdd } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";

const DailyNeeds = () => {
    return (
        <div className="products__page">
            <div className="products__page--header">
                Daily Need Products List
            </div>
            <div className="products__page--details">
                <button className="products__page--details-add">
                    <IoMdAdd />
                    <span> Add Product</span>
                </button>
                <ProductFilter />
                <table className="products__table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn-select">
                                    <GrCheckbox />
                                </button>
                            </td>
                            <td>1</td>
                            <td>
                                <img
                                    className="bgImg"
                                    src="https://chaldn.com/_mpimage/malta-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D77383&q=low&v=1&m=400&webp=1"
                                    alt="pic"
                                />
                            </td>
                            <td>adsf</td>
                            <td>adsf</td>
                            <td>1asdf</td>
                            <td>
                                <button className="btn-eye">
                                    <AiFillEye />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button className="btn-select">
                                    <GrCheckboxSelected />
                                </button>
                            </td>
                            <td>2</td>
                            <td>
                                <img
                                    className="bgImg"
                                    src="https://chaldn.com/_mpimage/banana-sobri-4-pcs?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D76878&q=low&v=1&m=400&webp=1"
                                    alt="pic"
                                />
                            </td>
                            <td>adsf</td>
                            <td>adsf</td>
                            <td>1asdf</td>
                            <td>
                                <button className="btn-eye">
                                    <AiFillEye />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button className="btn-select">
                                    <GrCheckbox />
                                </button>
                            </td>
                            <td>1</td>
                            <td>
                                <img
                                    className="bgImg"
                                    src="https://chaldn.com/_mpimage/lal-angur-red-grapes-250-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D26171&q=low&v=1&m=400&webp=1"
                                    alt="pic"
                                />
                            </td>
                            <td>adsf</td>
                            <td>adsf</td>
                            <td>1asdf</td>
                            <td>
                                <button className="btn-eye">
                                    <AiFillEye />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button className="btn-select">
                                    <GrCheckboxSelected />
                                </button>
                            </td>
                            <td>2</td>
                            <td>
                                <img
                                    className="bgImg"
                                    src="https://chaldn.com/_mpimage/dragon-fruit-local-100-gm-11-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D50270&q=low&v=1&m=400&webp=1"
                                    alt="pic"
                                />
                            </td>
                            <td>adsf</td>
                            <td>adsf</td>
                            <td>1asdf</td>
                            <td>
                                <button className="btn-eye">
                                    <AiFillEye />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyNeeds;
