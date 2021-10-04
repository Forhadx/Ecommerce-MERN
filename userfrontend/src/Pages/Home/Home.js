import React from "react";
import "./Home.scss";

import { categoryList } from "../../Data/Category";
import { useHistory } from "react-router";

const Home = () => {
    const history = useHistory();

    let allSubcategory = [];
    for (let el of categoryList) {
        allSubcategory = allSubcategory.concat(el.subCategories);
    }

    return (
        <div className="home__page">
            <div className="home__page--img">
                <img className="bgImg" src="./home.jpg" alt="imgage" />
            </div>
            <div className="mainCategory__page--sub">
                {allSubcategory.map((sub) => (
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
        </div>
    );
};

export default Home;
