import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { menuItems } from "../../db/menuItems.js";

const NavItem = ({ item, level }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className={`nav-item ${item.children ? "dropdown" : ""}`}>
            {item.children ? (
                <>
                    <div className="">
                        <a
                            className="nav-link dropdown-toggle text-end"
                            href={item.alias}
                            onMouseOver={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            {item.title}
                        </a>
                        <ul
                            className={`dropdown-menu ${isOpen ? "show" : ""} 
                                ${level > 1 ? "end-100 top-edge" : ""}`}
                        >
                            {item.children.map((child, index) => (
                                <NavItem
                                    key={index}
                                    item={child}
                                    level={level + 1}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <a className="nav-link text-end" href={item.alias}>
                    {item.title}
                </a>
            )}
        </li>
    );
};

const NavBar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="navbar navbar navbar-expand-lg navbar-light border-top border-black py-0 px-5 mt-2">
            <a className="navbar-heading" href="#!">
                منو
            </a>
            <button
                className="navbar-toggler"
                type="button"
                onMouseOver={() => setIsNavOpen((prev) => !prev)} // State to control navbar visibility
                aria-controls="navbarNav"
                aria-expanded={isNavOpen}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className={`collapse navbar-collapse ${
                    isNavOpen ? "show" : ""
                }`}
                id="navbarNav"
            >
                <ul
                    className={`navbar-nav justify-content-around ${
                        isNavOpen ? "d-flex" : ""
                    }`}
                >
                    {menuItems.map((item, index) => (
                        <NavItem key={index} item={item} level={1} />
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
