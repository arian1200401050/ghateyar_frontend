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

const updateMaxHeight = async () => {
    const dropdownTopRef = document.querySelector('.main-menu__dropdown--top.show')
    const dropdownRefs = document.querySelectorAll('.main-menu__dropdown.show');
    let currentHeight = 0;
    let maxHeight = 0;

    if (dropdownTopRef) {
        currentHeight = dropdownTopRef.getBoundingClientRect().height;
    }
    
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
    const [timeoutIds, setTimeoutIds] = useState({});

    const _setTimeoutId = async (key, value) => {
        const _timeoutIds = {...timeoutIds}
        _timeoutIds[key] = value;
        setTimeoutIds(_timeoutIds);
    }

    const _clearTimeout = async (key) => {
        // prevent default behavior
        // console.log(key, ' -> ', timeoutIds[key]);
        if (timeoutIds[key]) {
            clearTimeout(timeoutIds[key]);
            await _setTimeoutId(key, null);
        }
    }

    const _setDropdownState = async (index, path, value) => {
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

    const closeDropdown = async (index, path) => {
        // prevent default behavior
        await _clearTimeout(`${path}-o`);
        
        const id = setTimeout(async () => {
            await _setDropdownState(index, path, false);
        }, 300)
        // console.log('Close -> ', path);
        await _setTimeoutId(`${path}-c`, id);
    }

    const openDropdown = async (index, path) => {
        // prevent default behavior
        await _clearTimeout(`${path}-c`);
        // console.log('state -> ', `${path}-c`, ' -> ' , timeoutIds[`${path}-c`])
        
        const id = setTimeout(async () => {
            await _setDropdownState(index, path, true);
            await updateMaxHeight();
        }, 300);
        // console.log('Open -> ', path);
        await _setTimeoutId(`${path}-o`, id)
    }

    // for test
    // useEffect(() => {
    //     (async () => {
    //         await openDropdown(0, '0-0');
    //     })();
    // }, [document.documentElement])

    return (
        <div className={`main-menu__dropdown ${isOpen ? 'show' : '' } path-${path} 
            ${level == 1 ? 'main-menu__dropdown--top' : 'main-menu__dropdown--mid'}`}
        >
            <ul className={`main-menu__dropdown-list dropdown-menu`}>
                {items.map((item, index) => (
                    <li className={`main-menu__dropdown-item
                         ${item.children ? 'main-menu__dropdown-item--has-child' : ''}`}
                        onMouseLeave={async () => await closeDropdown(index, `${path}-${index}`)}
                        onMouseOver={async () => await openDropdown(index, `${path}-${index}`)}
                        key={index} 
                    >
                        <a 
                            className={`main-menu__dropdown-link dropdown-item`}
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

    // for test
    // useEffect(() => {
    //     openDropdown(0);
    // }, [document.documentElement])

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
                        <li className={`main-menu__nav-item nav-item 
                            ${item.children ? 'main-menu__nav-item--has-child' : ''}`}
                            onMouseOver={() => openDropdown(index)}
                            onMouseLeave={closeDropdown}
                            key={index} 
                        >
                            <a 
                                className={`main-menu__nav-link nav-link`} 
                                href={item.alias} alt={item.title}
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
