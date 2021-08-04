import React, { useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card/Card";
import * as actions from "../../store/actions/index";

const RegularItems = (props) => {
  const { products, onFetchDailyProd } = props;
  useEffect(() => {
    onFetchDailyProd();
  }, [onFetchDailyProd]);

  return (
    <div className="subCategory__page">
      <h2 className="subCategory__page--heading">Regular items</h2>
      <div className="subCategory__page--img">
        <img className="bgImg" src={props.image} alt="imgage" />
      </div>
      <div className="subCategory__page--cards">
        {products.map((prod) => (
          <div className="subCategory__page--cards-single" key={prod._id}>
            <Card product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.dailyProd.products,
    name: state.dailyProd.name,
    description: state.dailyProd.description,
    image: state.dailyProd.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDailyProd: () => dispatch(actions.fetchDailyProd()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegularItems);
