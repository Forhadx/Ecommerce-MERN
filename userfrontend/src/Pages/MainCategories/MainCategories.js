import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ProductGallary from "../../components/ProductGallary/ProductGallary";
import "./MainCategories.scss";

import * as icons from "./icons";

const MainCat = (props) => {
    //console.log(props.history.location.pathname)
    let mainCategoryName = props.match.params.name.replace(/[+]/g, " ");

    const { onFetchMainProducts } = props;

    useEffect(() => {
        // console.log("main cat name: ", mainCategoryName);
        onFetchMainProducts(mainCategoryName);
    }, [onFetchMainProducts, mainCategoryName]);

    // console.log("i: ", icons.cake);

    return (
        <div className="mainCategory__page">
            <h1 className="mainCategory__page--heading">
                <span>{mainCategoryName}</span>
            </h1>
            <div className="mainCategory__page--sub">
                <div className="mainCategory__page--sub-details">
                    <img
                        className="bgImg"
                        src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
                        alt="img"
                    />
                    <h1>Cake</h1>
                </div>
                <div className="mainCategory__page--sub-details">
                    <img
                        className="bgImg"
                        src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
                        alt="img"
                    />
                    <h1>Cake</h1>
                </div>
                <div className="mainCategory__page--sub-details">
                    <img
                        className="bgImg"
                        src="https://chaldn.com/_mpimage/cat-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28718&q=low&v=1&m=400&webp=1s"
                        alt="img"
                    />
                    <h1>Cake</h1>
                </div>
            </div>
            <ProductGallary products={props.products} loading={props.loading} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMainProducts: (mainName) =>
            dispatch(actions.fetchMainProducts(mainName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCat);
