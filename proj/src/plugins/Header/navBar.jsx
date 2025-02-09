import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { menuItems } from "#src/db/menuItems.js";


function DropDown ({ items, level, isOpen }) {
    const [openingDropdown, setOpeningDropdown] = useState(null);

    return (
        <div className={`main-menu__dropdown ${ isOpen ? 'show' : ''}`}>
            <ul className="main-menu__dropdown-list dropdown-menu">
                {items.map((item, index) => (
                    <li key={index} className="main-menu__dropdown-item">
                        <a 
                            className="main-menu__dropdown-link dropdown-item" 
                            href={item.alias} alt={item.title}
                            onMouseOver={() => setOpeningDropdown(index)}
                            aria-haspopup="true"
                            aria-expanded={openingDropdown == index}
                            aria-current={index == 0 ? "page" : ""}
                        >    
                            {item.title}
                        </a>
                        { item.children ? (
                            <DropDown key={index} items={item.children} level={ level + 1 } isOpen={index == openingDropdown} />
                        ): ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};


function NavBar () {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [openingDropdown, setOpeningDropdown] = useState(null);

    const toggleNavbar = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <nav className="main-menu navbar navbar-expand-lg navbar-light border-top border-black">
            <a className="main-menu__heading navbar-heading navbar-brand" href="#!">
                منو
            </a>
            <button
                className="main-menu__toggler navbar-toggler"
                type="button"
                onMouseOver={toggleNavbar} // State to control navbar visibility
                aria-controls="navbarNav"
                aria-expanded={isNavOpen}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div 
                className={`main-menu__navbar collapse navbar-collapse
                    ${isNavOpen ? "show" : ""}`}
                id="navbarNav"
            >
                <ul
                    className={`main-menu__navbar-list navbar-nav `}
                >
                    {menuItems.map((item, index) => (
                        <li key={index} className='main-menu__nav-item nav-item'>
                            <a 
                                className="main-menu__nav-link nav-link" href={item.alias} alt={item.title}
                                onMouseOver={() => setOpeningDropdown(index)}
                                aria-haspopup="true"
                                aria-expanded={openingDropdown == index}
                                aria-current={index == 0 ? "page" : ""}
                                data-bs-1={openingDropdown}
                                data-bs-2={index}
                            >
                                { item.title }
                            </a>

                            {item.children ? (
                                <DropDown items={item.children} level={1} isOpen={index == openingDropdown} />
                            ): ''}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};


export default NavBar;
