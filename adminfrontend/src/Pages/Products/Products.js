import React from "react";
import ProductFilter from "../../components/productFilter/productFilter";
import { IoMdAdd } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import "./products.scss";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="products__page">
      <div className="products__page--header">Products</div>
      <div className="products__page--details">
        <Link to="add+product" className="products__page--details-add">
          <IoMdAdd />
          <span> Add Product</span>
        </Link>
        <ProductFilter />
        <table className="products__table">
          <thead>
            <tr>
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
              <td>
                <div>Category / </div>
                <div>Category</div>
              </td>
              <td>
                <button className="btn-eye">
                  <AiFillEye />
                </button>
                <button className="btn-edit">
                  <BiEdit />
                </button>
                <button className="btn-delete">
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
            <tr>
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
                <button className="btn-edit">
                  <BiEdit />
                </button>
                <button className="btn-delete">
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
            <tr>
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
                <button className="btn-edit">
                  <BiEdit />
                </button>
                <button className="btn-delete">
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
            <tr>
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
                <button className="btn-edit">
                  <BiEdit />
                </button>
                <button className="btn-delete">
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
