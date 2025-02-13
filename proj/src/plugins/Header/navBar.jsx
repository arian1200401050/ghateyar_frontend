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

const dropDownEffect = (overallMaxHeight, setOverallMaxHeight, dropdownListRef) => {
    const updateMaxHeight = () => {  
        document.documentElement.style.setProperty('--main-menu-dropdown-display', 'block');

        let newMaxHeight = overallMaxHeight;
        const height = dropdownListRef.current.getBoundingClientRect().height;  
        newMaxHeight = Math.max(newMaxHeight, height);
        console.log(dropdownListRef.current.className, ' ', newMaxHeight, ' ', overallMaxHeight);
        
        document.documentElement.style.removeProperty('--main-menu-dropdown-display');
        setOverallMaxHeight(newMaxHeight);
    };  
  
    updateMaxHeight(); // Set the initial max height  

    // Optional: Add a resize listener if your layout can change sizes  
    window.addEventListener('resize', updateMaxHeight);  
    return () => {  
        window.removeEventListener('resize', updateMaxHeight);  
    };      
}

const dropDownReturn = (Component, props) => {
    return (
        <div className={`main-menu__dropdown ${props.isOpen ? 'show' : '' } 
            ${props.level == 1 ? 'main-menu__dropdown--top' : 'main-menu__dropdown--mid'}`}
            style={props.level == 1 ? {height: props.overallMaxHeight + 'px'} : {}} 
            ref={props.dropdownRef}
        >
            <ul className={`main-menu__dropdown-list dropdown-menu ${props.path}`}
                ref={props.dropdownListRef}>
                {props.items.map((item, index) => (
                    <li key={index} className="main-menu__dropdown-item">
                        <a 
                            className="main-menu__dropdown-link dropdown-item" 
                            href={item.alias} alt={item.title}
                            onMouseOver={() => props.setOpeningDropdown(index)}
                            aria-haspopup="true"
                            aria-expanded={props.openingDropdown == index}
                            aria-current={index == 0 ? "page" : ""}
                        >    
                            {item.title}
                        </a>
                        { item.children ? (
                            <Component key={index} items={item.children} isOpen={index == props.openingDropdown}
                                level={ props.level + 1 } path={props.path + ':' + index}
                                index={index} overallMaxHeight={props.overallMaxHeight} setOverallMaxHeight={props.setOverallMaxHeight}
                            />
                        ): ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function DropDownTopLevel ({ items, isOpen, level, path, index }) {
    const {overallMaxHeight, setOverallMaxHeight} = useContext(DropDownContext);
    const [openingDropdown, setOpeningDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const dropdownListRef = useRef(null);
   
    useEffect(dropDownEffect, [index, overallMaxHeight])
    
    return (
        dropDownReturn(DropDown, {
            items, level, path, isOpen, openingDropdown, setOpeningDropdown,  
            overallMaxHeight, setOverallMaxHeight, dropdownRef, dropdownListRef
        })
    );
};

function DropDown ({ items, isOpen, level, path, index }) {
    const {overallMaxHeight, setOverallMaxHeight} = useContext(DropDownContext);
    const [openingDropdown, setOpeningDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const dropdownListRefs = useRef([]);
   
    useEffect(dropDownEffect, [index, overallMaxHeight])
    
    return (
        dropDownReturn(DropDown, {
            items, level, path, isOpen, openingDropdown, setOpeningDropdown,  
            overallMaxHeight, setOverallMaxHeight, dropdownRef, dropdownListRefs
        })
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
                                <DropDownContextProvider>
                                    <DropDownTopLevel items={item.children} isOpen={index == openingDropdown} level={1} 
                                        path={index} index={index}
                                    />
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
