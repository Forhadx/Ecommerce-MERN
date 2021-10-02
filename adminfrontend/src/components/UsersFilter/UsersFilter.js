import React from "react";
import "./UserFilter.scss";
import { BiSearchAlt } from "react-icons/bi";

const UserFilter = () => {
    return (
        <div className="users__filter">
            <form className="users__filter--search">
                <input type="text" placeholder="search Users" />
                <button>
                    <BiSearchAlt />
                </button>
            </form>
        </div>
    );
};

export default UserFilter;
