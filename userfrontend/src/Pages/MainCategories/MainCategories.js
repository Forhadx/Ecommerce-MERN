import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ProductGallary from "../../components/ProductGallary/ProductGallary";
import "./MainCategories.scss";
import { categoryList } from "../../Data/Category";
import { useHistory } from "react-router";

const MainCat = (props) => {
    const history = useHistory();

    let mainCategoryName = props.match.params.name.replace(/[+]/g, " ");

    const { onFetchMainProducts } = props;

    useEffect(() => {
        onFetchMainProducts(mainCategoryName);
    }, [onFetchMainProducts, mainCategoryName]);

    let subArray = [];
    for (let el of categoryList) {
        if (el.mainCategory === mainCategoryName) {
            subArray = [...el.subCategories];
        }
    }

    return (
        <div className="mainCategory__page">
            <h1 className="mainCategory__page--heading">
                <span>{mainCategoryName}</span>
            </h1>
            <div className="mainCategory__page--sub">
                {subArray.map((sub) => (
                    <div
                        onClick={() =>
                            history.push(`/s/${sub.name.replace(/\s+/g, "+")}`)
                        }
                        key={sub.name}
                        className="mainCategory__page--sub-details"
                    >
                        <img
                            className="bgImg"
                            src={sub.image}
                            alt="subcategory"
                        />
                        <p>{sub.name}</p>
                    </div>
                ))}
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

/*

*/
