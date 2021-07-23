import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import className from "classnames";
import "./Sidebar.scss";

const Sidebar = (props) => {
  const [flag, setFlag] = useState(false);
  const [cid, setCid] = useState(null);

  let arr = [
    {
      id: 1,
      mainCategory: "Bread & Bakery",
      subCategories: ["Cake", "Sweetmeat", "Bread", "Biscuits"],
    },
    {
      id: 2,
      mainCategory: "Snacks",
      subCategories: ["Chips", "Noodles", "Sauces", "Chocolate"],
    },
    {
      id: 3,
      mainCategory: "Beverage",
      subCategories: ["Juice", "Tea & Coffee", "Soft drinks"],
    },
    { id: 4, mainCategory: "Dairy", subCategories: ["Milk", "Ghee", "butter"] },
    {
      id: 5,
      mainCategory: "Groceries",
      subCategories: ["Rice", "Dal", "Egg", "Oil", "Flour", "Salt & Suger"],
    },
    { id: 6, mainCategory: "Meat & Fish", subCategories: ["Meat", "Fish"] },
    {
      id: 7,
      mainCategory: "Fruit & Vegetable",
      subCategories: ["Fruit", "Vegetable", "Khjur"],
    },
  ];

  const openSubCatHandler = (data) => {
    if (cid === data.id) {
      setFlag(!flag);
    } else {
      setFlag(true);
    }
    setCid(data.id);
  };

  return (
    <div>
      <NavLink to="">Regular item</NavLink>
      {arr.map((i) => (
        <div key={i.id}>
          <NavLink
            to={"/m/" + i.mainCategory}
            className="mainCategory"
            onClick={() => openSubCatHandler(i)}
          >
            {i.mainCategory}
          </NavLink>
          <ul className={className("subClass", { open: flag && cid === i.id })}>
            {i.subCategories.map((s, j) => (
              <li key={j}>
                <NavLink to={"/s/" + s} className="subClass_items">{s}</NavLink>{" "}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default withRouter(Sidebar);
