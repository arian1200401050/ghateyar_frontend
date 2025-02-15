import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { menuItems } from "#src/db/menuItems.js";


const DropDownContext = createContext();

const DropDownContextProvider = ({ children }) => {
    const [overallMaxHeight, setOverallMaxHeight] = useState(0);

    return (
        <DropDownContext.Provider value={{overallMaxHeight, setOverallMaxHeight}} >
            {children}
        </DropDownContext.Provider>
    )
}

const updateMaxHeight = () => {
    const dropdownTopRef = document.querySelector('.main-menu__dropdown--top.show')
    const dropdownRefs = document.querySelectorAll('.main-menu__dropdown.show');
    const currentHeight = dropdownTopRef.getBoundingClientRect().height;
    let maxHeight = 0;
    
    if (dropdownRefs) {
        dropdownRefs.forEach((dropdownRef) => {
            const dropdownList = dropdownRef.querySelector('.main-menu__dropdown-list');
            const height = dropdownList.getBoundingClientRect().height;
            maxHeight = Math.max(maxHeight, height);     
        })
    }

    if (maxHeight != currentHeight) {
        dropdownTopRef.style.height = `calc(${maxHeight}px + .5rem)`;
    }
}

function DropDown ({ items, isOpen, level, path }) {
    const [dropdownStates, setDropdownStates] = useState([]);   
    const [timeoutIds, setTimeoutIds] = useState([]);

    const _setTimeoutId = (index, value) => {
        const _timeoutIds = [...timeoutIds]
        _timeoutIds[index] = value;
        setTimeoutIds(_timeoutIds);
    }

    const _setDropdownState = (index, path, value) => {
        const dropdown = document.querySelector('.path-' + path);
        if (dropdown) {
            if (value) {
                dropdown.classList.add('show')
            } else {
                dropdown.classList.remove('show')
            }
        }   

        const _dropdownStates = [...dropdownStates]
        _dropdownStates[index] = value;
        setDropdownStates(_dropdownStates);
    }

    const closeDropdown = (index, path) => {
        const id = setTimeout(() => {
            _setDropdownState(index, path, false);
            updateMaxHeight();
        }, 149)
        _setTimeoutId(index, id);
    }

    const dropdownStateHandler = (index, path) => {
        if (timeoutIds[index]) {
            clearTimeout(timeoutIds[index]);
            _setTimeoutId(index, null);
        }
        
        setTimeout(() => {
            _setDropdownState(index, path, true);
            updateMaxHeight();
        }, 150)
    }

    return (
        <div className={`main-menu__dropdown ${isOpen ? 'show' : '' } path-${path} 
            ${level == 1 ? 'main-menu__dropdown--top' : 'main-menu__dropdown--mid'}`}
        >
            <ul className={`main-menu__dropdown-list dropdown-menu`}>
                {items.map((item, index) => (
                    <li key={index} className={`main-menu__dropdown-item`}
                        onMouseLeave={() => closeDropdown(index, `${path}-${index}`)}
                        onMouseOver={() => dropdownStateHandler(index, `${path}-${index}`)}
                    >
                        <a 
                            className={`main-menu__dropdown-link dropdown-item
                                    ${item.children ? 'main-menu__dropdown-link--has-child' : ''}`}
                            href={item.alias} alt={item.title}
                            aria-haspopup="true"
                            aria-expanded={dropdownStates[index]}
                            aria-current={index == 0 ? "page" : ""}
                        >    
                            {item.title}
                        </a>
                        { item.children ? (
                            <DropDown key={index} items={item.children}
                                level={ level + 1 } path={`${path}-${index}`}
                            />
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

    const closeDropdown = () => {
        setTimeout(() => {
            setOpeningDropdown(null)
        }, 150)
    }

    const openDropdown= (index) => {
        setTimeout(() => {
            setOpeningDropdown(index)
        }, 150)
    }

    return (
        <nav className="main-menu navbar navbar-expand-lg navbar-light border-top border-black">
            {/* <a className="main-menu__heading navbar-heading navbar-brand" href="#!">
                منو
            </a> */}
            <button
                className="main-menu__toggler navbar-toggler"
                type="button"
                onClick={toggleNavbar} // State to control navbar visibility
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
                        <li key={index} className='main-menu__nav-item nav-item'
                            onMouseOver={() => openDropdown(index)}
                            onMouseLeave={closeDropdown}
                        >
                            <a 
                                className="main-menu__nav-link nav-link" href={item.alias} alt={item.title}
                                aria-haspopup="true"
                                aria-expanded={openingDropdown == index}
                                aria-current={index == 0 ? "page" : ""}
                                data-bs-1={openingDropdown}
                                data-bs-2={index}
                            >
                                { item.title }
                            </a>

                            {item.children ? (
                                <DropDownContextProvider>
                                    <DropDown items={item.children} isOpen={index == openingDropdown} level={1} 
                                        path={index}/>
                                </DropDownContextProvider>
                            ): ''}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};


export default NavBar;
