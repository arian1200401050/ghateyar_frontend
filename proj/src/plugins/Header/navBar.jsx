import { useEffect, useState, useCallback } from 'react';   
import debounce from 'lodash.debounce';   
import { Link } from 'react-router-dom';  
import axios from 'axios';  
import styled from 'styled-components';

import config from '#src/config.js';  
import { useScreenWidth } from '#src/context/ScreenWidthContext';
import './resources/navBar.css';


const DropDown = ({ items, level, isOpen, path }) => {  
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);  
    const { screenWidth, isMobile } = useScreenWidth()


    const handleMouseOver = (index) => {
        if (!isMobile) {
            debouncedOpenDropdown(index)
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            debouncedCloseDropdown()
        }
    };

    const handleMouseClick = (index) => {
        if (isMobile) {
            if (openDropdownIndex == index) {
                debouncedCloseDropdown();
            } else {
                debouncedOpenDropdown(index);
            }
        }
    }

    const debouncedOpenDropdown = useCallback(  
        debounce((index) => setOpenDropdownIndex(index), 150),
        []  
    );  

    const debouncedCloseDropdown = useCallback(  
        debounce(() => setOpenDropdownIndex(null), 150),
        []  
    ); 

	//useEffect(() => {
	//	setOpenDropdownIndex(0);
	//}, [document.documentElement])


    return (  
        <div className={`absolute z-30 w-full transition-all duration-250
            ${isOpen ? 'visible' : 'invisible'} 
            ${level > 1 ? 'top-full px-0 md:top-0 md:w-fit md:-px-2 left-[unset] pr-0 shodow-none' : 'top-full md:w-[unset] px-2'}`}  
            style={{right: !isMobile && level > 1 ? 'calc(100%)' : '0'}}
        >  
            <ul className={`bg-white text-right rounded-xl p-0 m-0 w-full md:w-fit 
                ${isOpen ? 'block' : 'hidden'}`}
                style={{boxShadow: '0 0 .2rem var(--color-gray-400)'}}>  
                {items.map((item, index) => {  
                    const isOpen = index === openDropdownIndex;  
                    const itemPath = `${path}-${index}`;  
        
                    return (  
                        <li  
                            className={`main-menu__item main-menu__item--dropdown relative flex items-stretch
                                md:!justify-start m-0 w-full border-0 border-gray-600
                                ${index == 0 ? 'md:rounded-t-xl': ''}
                                ${index == items.length ? 'md:rounded-b-xl': ''}`}  
                            key={item.menu_id}  
                             onMouseOver={!isMobile ? () => handleMouseOver(index) : null}  
                             onMouseLeave={!isMobile ? handleMouseLeave: null}  
                        >  
                            <Link  
                                to={`/menu/${item.menu_id}`}  
                                className={`main-menu__link main-menu__link--dropdown relative flex py-4 pr-8 pl-5
                                    md:!pr-6 md:!pl-3 md:!py-[.75rem] text-gray-800 text-nowrap text-2xl md:!text-md
                                    transition-all duration-250 ease-in
                                    ${index == 0 ? 'md:rounded-t-xl': ''}
                                    ${index == items.length ? 'md:rounded-b-xl': ''}`}  
                                aria-haspopup="true"  
                                aria-expanded={isOpen}  
                                aria-current={index === 0 ? "page" : ""}  
                            >  
                                {item.title}  
                            </Link>  
                            {item.children?.length > 0 && (
                                <span className={`main-menu__icon main-menu__icon--dropdown p-4 mr-1 md:!mr-0 md:!ml-3 cursor-pointer
                                    bg-no-repeat bg-[50%_50%] taransition-all duration-250 ease-in`}
                                    style={{backgroundImage: 'url("/icon/arrow.svg")',
				            backgroundSize: isMobile ? '60%' : '40%'}}
                                    onClick={isMobile ? () => handleMouseClick(index) : null}></span>
                            )}
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
    const { screenWidth, isMobile } = useScreenWidth();

    const handleMouseOver = (index) => {
        if (!isMobile) {
            debouncedOpenDropdown(index)
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            debouncedCloseDropdown()
        }
    };

    const handleMouseClick = (index) => {
        if (isMobile) {
            if (openDropdownIndex == index) {
                debouncedCloseDropdown();
            } else {
                debouncedOpenDropdown(index);
            }
        }
    }

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

	//useEffect(() => {
	//	setOpenDropdownIndex(0);
	//}, [document.documentElement])


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
        <nav className="mt-3 px-0 md:!px-10 relative flex flex-col items-start border-t-1 border-black text-right">  
            <button  
                className="block mt-2 mb-3 !mr-2 md:hidden"  
                type="button"  
                onClick={toggleNavbar}  
                aria-controls="navbar-nav"  
                aria-expanded={isNavOpen}  
            >  
                <span className="navbar-toggler-icon raounded-sm bg-center bg-no-repeat !h-0 !w-0 p-4 block" 
                    style={{backgroundImage: 'url("/icon/menu-toggler.svg")', backgroundSize: '100%'}}
                >
                </span>  
            </button>  

            <div id="navbar-nav" 
                className={`navbar-collapse ${!isMobile || isNavOpen ? "block" : "hidden"} 
                    absolute w-full top-12 right-0 bg-secondary-400 z-30
                    md:relative md:mr-4 md:p-0 md:w-auto md:top-[unset] md:right-[unset] md:bg-[unset] visible`}>  
                <ul className="flex flex-col md:flex-row p-0 m-0">  
                    {Array.isArray(menu) &&   
                        menu.map((item, index) => {  
                            const isOpen = index === openDropdownIndex;  

                            return (  
                                <li className={`main-menu__item main-menu__item--navbar relative flex items-stretch
				         md:!justify-start`}  
                                    key={item.menu_id}  
                                    onMouseOver={!isMobile ? () => handleMouseOver(index) : null}  
                                    onMouseLeave={!isMobile ? handleMouseLeave: null}  
                                >  
                                    <Link   
                                        to={`/menu/${item.menu_id}`}   
                                        className={`main-menu__link main-menu__link--navbar
                                            px-3 pt-3 pb-4 md:!pt-2 md:!pb-3 md:!pl-1 !text-gray-600 text-2xl md:text-base 
                                            transition-all duration-250 ease-in`}
                                        aria-haspopup="true"  
                                        aria-expanded={isOpen}  
                                        aria-current={index === 0 ? "page" : ""}  
                                    >  
                                        {item.title}  
                                    </Link>  
                                    {item.children?.length > 0 && (
                                        <span className={`main-menu__icon main-menu__icon--navbar mr-1 md:!mx-0 p-3 cursor-pointer
                                            md:!p-2 bg-no-repeat bg-[50%_40%] taransition-all duration-250 ease-in`}
                                            style={{backgroundImage: 'url("/icon/arrow.svg")', 
                                                backgroundSize: isMobile ? '90%' : '85%'}}
                                            onClick={isMobile ? () => handleMouseClick(index) : null}>
                                        </span>
                                    )}
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
