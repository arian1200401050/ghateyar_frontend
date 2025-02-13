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

function DropDown ({ items, isOpen, level, path, index }) {
    const [openingDropdown, setOpeningDropdown] = useState(null);   
    
    const updateMaxHeight = () => {
        const dropdownRef = document.querySelector(`.main-menu__dropdown.path-${path}`);
        
        let maxHeight = 0;
        const dropdownList = dropdownRef.querySelector('.main-menu__dropdown-item > .main-menu__dropdown > .main-menu__dropdown-list');
        if (dropdownList) {
            document.documentElement.style.setProperty('--main-menu-dropdown-display', 'block');

            const wrapperHeight = dropdownRef.getBoundingClientRect().height;
            const height = dropdownList.getBoundingClientRect().height;
            maxHeight = Math.max(wrapperHeight, height);

            document.documentElement.style.removeProperty('--main-menu-dropdown-display');
            if (maxHeight != wrapperHeight) {
                dropdownRef.style.height = `calc(${maxHeight}px + .5rem)`;
            }
        }
    }

    const closeDropdown = () => {
        // setTimeout(() => {
        //     setOpeningDropdown(null);
        // }, 150)
    }

    const openingDropdownHandler = (index, path) => {
        setTimeout( () => {
            setOpeningDropdown(index);
            updateMaxHeight(path);
        }, 150)
    }


    useEffect(() => {
        updateMaxHeight(); // Set the initial max height  
    
        // Optional: Add a resize listener if your layout can change sizes  
        window.addEventListener('resize', updateMaxHeight);  
        return () => {  
            window.removeEventListener('resize', updateMaxHeight);  
        };   
        
    }, [document.documentElement])

    return (
        <div className={`main-menu__dropdown ${isOpen ? 'show' : '' } path-${path} 
            ${level == 1 ? 'main-menu__dropdown--top' : 'main-menu__dropdown--mid'}`}
        >
            <ul className={`main-menu__dropdown-list dropdown-menu`}>
                {items.map((item, index) => (
                    <li key={index} className={`main-menu__dropdown-item`}>
                        <a 
                            className={`main-menu__dropdown-link dropdown-item
                                    ${item.children ? 'main-menu__dropdown-link--has-child' : ''}`}
                            href={item.alias} alt={item.title}
                            onMouseOut={() => closeDropdown()}
                            onMouseOver={() => openingDropdownHandler(index, path)}
                            aria-haspopup="true"
                            aria-expanded={openingDropdown == index}
                            aria-current={index == 0 ? "page" : ""}
                        >    
                            {item.title}
                        </a>
                        { item.children ? (
                            <DropDown key={index} items={item.children} isOpen={index == openingDropdown}
                                level={ level + 1 } path={path + '-' + index}
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
        // setTimeout(() => {
        //     setOpeningDropdown(null)
        // }, 150)
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
                                onMouseOver={() => openDropdown(index)}
                                onMouseOut={closeDropdown}
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
