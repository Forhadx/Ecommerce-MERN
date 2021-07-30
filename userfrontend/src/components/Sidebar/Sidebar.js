import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

import className from "classnames";
import "./Sidebar.scss";

const Sidebar = (props) => {
  const [flag, setFlag] = useState(false);
  const [cid, setCid] = useState(null);

  let arr = [
    {
      id: 0,
      mainCategory: "Daily Products",
      subCategories: [],
    },
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
    <div className="sidebar__details">
      {arr.map((i) => (
        <div key={i.id} className="sidebar__details--category">
          {i.id === 0 ? (
            <NavLink
              to={"/" + i.mainCategory.replace(/\s+/g, "+")}
              className="mainCategory"
              onClick={() => openSubCatHandler(i)}
            >
              <div>{i.mainCategory}</div>
            </NavLink>
          ) : (
            <NavLink
              to={"/m/" + i.mainCategory.replace(/\s+/g, "+")}
              className="mainCategory"
              onClick={() => openSubCatHandler(i)}
            >
              <div>{i.mainCategory}</div>
              {cid === i.id ? <FaAngleDown /> : <FaAngleRight />}
            </NavLink>
          )}
          <ul
            className={className("subCategory", { open: flag && cid === i.id })}
          >
            {i.subCategories.map((s, j) => (
              <li key={j} className="subCategory__items">
                <NavLink
                  to={"/s/" + s.replace(/\s+/g, "+")}
                  className="subCategory__items--link"
                >
                  {s}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

/*

<NavLink
            to={"/m/" + i.mainCategory}
            className="mainCategory"
            onClick={() => openSubCatHandler(i)}
          >
            <div>{i.mainCategory}</div>
            {i.subCategories.length === 0 ? null : cid === i.id ? (
              <FaAngleDown />
            ) : (
              <FaAngleRight />
            )}
          </NavLink>

*/
