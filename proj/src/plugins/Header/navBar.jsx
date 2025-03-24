import { useEffect, useState, useCallback } from 'react';   
import debounce from 'lodash.debounce';   
import { Link } from 'react-router-dom';  
import axios from 'axios';  
import styled from 'styled-components';

import config from '#src/config.js';  
import { useScreenWidth } from '#src/context/ScreenWidthContext';
import './resources/navBar.css';

const MenuItemLink = styled(Link)`
    &::after {
        content: "";
        background-image: url('/icon//arrow.svg');
        background-size: 85%;
    }
`;

const DropdownItemLink = styled(Link)`
    &::after {
        content: "";
        background-image: url('/icon//arrow.svg');
        background-size: 100%;
    }
`;

const DropDown = ({ items, level, isOpen, path }) => {  
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);  

    // Debounced openDropdown  
    const debouncedOpenDropdown = useCallback(
        debounce((index) => {  
            setOpenDropdownIndex(index); // Use context's setter  
        }, 150),
        []
    );  

    // Debounced closeDropdown  
    const debouncedCloseDropdown = useCallback(  
        debounce(() => {  
            setOpenDropdownIndex(null); // Use context's setter  
        }, 150),  
        []
    ); 

    // useEffect(() => {
    //     if (path == '0') {
    //         setOpenDropdownIndex(0);
    //         console.log(path)
    //     }
    //     if (path == '0-0') {
    //         console.log(isOpen)
    //     }
    // }, [document.documentElement])


    return (  
        <div className={`absolute z-30 ${isOpen ? 'visible' : 'invisible'} 
            ${level > 1 ? 'top-0 left-[unset] w-fit pr-0 shodow-none' : 'top-full'}
            absolute px-2 transition-display duration-200`}  
            style={{right: level > 1 ? 'calc(100% - .4rem)' : '0'}}
        >  
            <ul className={`bg-white text-right rounded-xl p-0 m-0 w-fit ${isOpen ? 'block' : 'hidden'}`}
                style={{boxShadow: '0 0 .2rem var(--color-gray-400)'}}>  
                {items.map((item, index) => {  
                    const isOpen = index === openDropdownIndex;  
                    const itemPath = `${path}-${index}`;  
        
                    return (  
                        <li  
                            className={`main-menu__item main-menu__item--dropdown relative m-0 w-full border-0 border-gray-600
                                ${item.children?.length > 0 ? 'main-menu__item main-menu__item--dropdown--has-child' : ''}
                                ${index == 0 ? 'rounded-t-xl': ''}
                                ${index == items.length ? 'rounded-t-xl': ''}`}  
                            key={item.menu_id}  
                            onMouseOver={() => debouncedOpenDropdown(index)}  
                            onMouseLeave={debouncedCloseDropdown}  
                        >  
                            <DropdownItemLink  
                                to={`/menu/${item.menu_id}`}  
                                className={`main-menu__link main-menu__link--dropdown relative flex py-[.75rem] pl-[3.5rem] pr-[1.5rem] 
                                    text-gray-800 text-nowrap !text-sm transition-all duration-300 ease-in
                                    ${item.children?.length > 0 ? `after:inline-block after:relative after:top-[0.2rem] after:right-3 
                                        after:w-0 after:h-0 after:p-2 after:taransition-200` : ''}
                                    ${index == 0 ? 'rounded-t-xl': ''}
                                    ${index == items.length ? 'rounded-b-xl': ''}`}  
                                aria-haspopup="true"  
                                aria-expanded={isOpen}  
                                aria-current={index === 0 ? "page" : ""}  
                            >  
                                {item.title}  
                            </DropdownItemLink>  
                            {item.children?.length > 0 && (  
                                <DropDown  
                                    items={item.children}   
                                    isOpen={isOpen}   
                                    level={level + 1}   
                                    path={itemPath}  
                                />  
                            )}  
                        </li>  
                    );  
                })}  
            </ul>  
        </div>  
    );  
};  

const NavBar = () => {  
    const [menu, setMenu] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [isNavOpen, setIsNavOpen] = useState(false);  
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);  
    const screenWidth = useScreenWidth()

    const debouncedOpenDropdown = useCallback(  
        debounce((index) => setOpenDropdownIndex(index), 150),  
        []  
    );  

    const debouncedCloseDropdown = useCallback(  
        debounce(() => setOpenDropdownIndex(null), 150),  
        []  
    );   

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const { data } = await axios.get(`${config.BACKEND_URL}/api/v1/public/menu-tree/`);  
                setMenu(data);  
                setLoading(false);  
            } catch (err) {  
                setError(err);  
                setLoading(false);  
            }  
        };  

        fetchData();  
    }, []);  

    // useEffect(() => {
    //     setOpenDropdownIndex(0);
    // }, [document.documentElement])


    const toggleNavbar = () => {  
        setIsNavOpen((prev) => !prev);  
    };  

    if (loading) {  
        return <p className="text-right pt-2 pb-2">Loading...</p>;  
    }  

    if (error) {  
        return <p className="text-right pt-2 pb-2">Error: {error.message}</p>;  
    }  

    return (  
        <nav className="mt-3 px-10 flex flex-col items-start border-t-1 border-black text-right">  
            <button  
                className="block mt-2 mb-3 !mr-2 md:hidden"  
                type="button"  
                onClick={toggleNavbar}  
                aria-controls="navbarNav"  
                aria-expanded={isNavOpen}  
            >  
                <span className="navbar-toggler-icon raounded-sm !h-0 !w-0 p-3" 
                    style={{backgroundImage: 'url("icon/menu-toggler.svg")'}}
                >
                </span>  
            </button>  

            <div className={`navbar-collapse lg:!block ${isNavOpen ? "block" : "hidden"}
                relative mr-4 visible`} id="navbarNav">  
                <ul className="flex flex-col md:flex-row pr-0">  
                    {Array.isArray(menu) &&   
                        menu.map((item, index) => {  
                            const isOpen = index === openDropdownIndex;  

                            return (  
                                <li className={`main-menu__item main-menu__item--navbar relative pb-1`}  
                                    key={item.menu_id}  
                                    onMouseOver={() => debouncedOpenDropdown(index)}  
                                    onMouseLeave={debouncedCloseDropdown}  
                                >  
                                    <MenuItemLink   
                                        to={`/menu/${item.menu_id}`}   
                                        className={`main-menu__link main-menu__link--navbar
                                            block px-3 py-2 !text-gray-600 hover:bg-blue-500 hover:text-white
                                            text-xl md:text-base after:p-6 after:left-[-2rem] after:top-[2rem]
                                            ${item.children?.length > 0 ? `after:bp-center after:bp-norepeat after:absolute
                                                md:after:!left-[-0.2rem] md:after:!p-2 after:transition-transform after:duration-200
                                                hover:after:rotate-90` : ''}`}  
                                        aria-haspopup="true"  
                                        aria-expanded={isOpen}  
                                        aria-current={index === 0 ? "page" : ""}  
                                    >  
                                        {item.title}  
                                    </MenuItemLink>  

                                    {item.children?.length > 0 && (  
                                        <DropDown items={item.children} isOpen={isOpen}
                                            level={1} path={index.toString()} 
                                        />  
                                    )}  
                                </li>  
                            );  
                        })  
                    }  
                </ul>  
            </div>  
        </nav>  
    );  
};  

export default NavBar;  