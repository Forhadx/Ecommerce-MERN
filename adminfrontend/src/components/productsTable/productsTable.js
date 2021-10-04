import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./productsTable.scss";
import Modal from "../UI/Modal/Modal";
import ProductDetails from "../ProductDetails/ProductDetails";
import { useHistory } from "react-router";

const ProductTable = (props) => {
    const [modalFlag, setModalFlag] = useState(false);

    const { onSingleProductInit } = props;

    const history = useHistory();

    useEffect(() => {
        onSingleProductInit();
    }, [onSingleProductInit]);

    const modalClosedHandler = () => {
        setModalFlag(false);
    };

    const showProductHandler = (prod) => {
        props.onSingleProductStore(prod);
        setModalFlag(true);
    };

    const deleteProductHandler = (pId) => {
        //props.onDeleteProduct(pId);   //  stop delete product.
    };

    const updateProductHandler = (prod) => {
        props.onSingleProductStore(prod);
        history.push("/products/update+product/" + prod.name);
    };

    return (
        <React.Fragment>
            <Modal show={modalFlag} modalClosed={modalClosedHandler}>
                <ProductDetails modalClosed={modalClosedHandler} />
            </Modal>
            <table className="products__table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products &&
                        props.products.map((p, index) => (
                            <tr key={p._id}>
                                <td>
                                    <img
                                        className="bgImg"
                                        src={
                                            process.env.REACT_APP_BASE_URL +
                                            p.image
                                        }
                                        alt="product"
                                    />
                                </td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td className="btns">
                                    <button
                                        className="btn-eye"
                                        onClick={() => showProductHandler(p)}
                                    >
                                        <AiFillEye />
                                    </button>
                                    <button
                                        className="btn-edit"
                                        onClick={() => updateProductHandler(p)}
                                    >
                                        <BiEdit />
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            deleteProductHandler(p._id)
                                        }
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteProduct: (pId) => dispatch(actions.deleteProduct(pId)),
        onSingleProductStore: (prod) =>
            dispatch(actions.singleProductStore(prod)),
        onSingleProductInit: () => dispatch(actions.singleProductInit()),
    };
};

export default connect(null, mapDispatchToProps)(ProductTable);
