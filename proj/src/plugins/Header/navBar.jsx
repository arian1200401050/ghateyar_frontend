import { useEffect, useState, useCallback } from 'react'; 
import debounce from 'lodash.debounce'; // or use your own debounce function  
import { Link } from 'react-router-dom';
import axios from 'axios'

import config from '#src/config.js';


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

    return (  
        <div className={`main-menu__dropdown z-3 ${isOpen ? 'show' : ''} path-${path}   
            ${level === 1 ? 'main-menu__dropdown--top' : 'main-menu__dropdown--mid'}`}  
        >  
            <ul className={`main-menu__dropdown-list dropdown-menu`}>  
                {items.map((item, index) => {  
                    const isOpen = index === openDropdownIndex;  
                    const itemPath = `${path}-${index}`; // Unique path for each item  

                    return (  
                        <li  
                            className={`main-menu__dropdown-item  
                                ${item.children?.length > 0 ? 'main-menu__dropdown-item--has-child' : ''}`}  
                            key={index} // Use item.id if available, otherwise a unique path  
                            onMouseOver={() => debouncedOpenDropdown(index)}  
                            onMouseLeave={() => debouncedCloseDropdown()}  
                        >  
                            <a  
                                className={`main-menu__dropdown-link dropdown-item`}  
                                href={`/menu/${item.menu_id}`} alt={item.title}  
                                aria-haspopup="true"  
                                aria-expanded={isOpen} // Use isOpen here, assuming it controls the dropdown's visibility  
                                aria-current={index === 0 ? "page" : ""}  
                            >  
                                {item.title}  
                            </a>  
                            {item.children?.length > 0 ? (  
                                <DropDown  
                                    items={item.children} isOpen={isOpen}
                                    level={level + 1} path={itemPath} // Pass unique path  
                                />  
                            ) : null}  
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
    const [isNavOpen, setIsNavOpen] = useState(false); // State to control navbar visibility  
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

    useEffect(() => {  
        async function fetchData() {  
            axios.get(`${config.BACKEND_URL}/api/v1/public/menu-tree/`)
                .then((res) => {
                    setMenu(res.data); // Changed state variable  
                    setLoading(false);  
                })
                .catch((err) => {
                    setError(err);  
                    setLoading(false);  
                });
        }  

        fetchData();  
    }, []);  

    const toggleNavbar = () => {  
        setIsNavOpen(!isNavOpen);  
    };  

    if (loading) {  
        return <p>Loading...</p>;  
    }  

    if (error) {  
        return <p>Error: {error.message}</p>;  
    }  

    return (  
        <nav className="main-menu navbar navbar-expand-lg navbar-light border-top border-black">  
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
                <ul className="main-menu__navbar-list navbar-nav">  
                    {Array.isArray(menu) ? (
                        menu.map((item, index) => {  
                            const isOpen = index === openDropdownIndex;  

                            return (  
                                <li className={`main-menu__nav-item nav-item 
                                        ${item.children?.length > 0 ? 'main-menu__nav-item--has-child' : ''}`}  
                                    key={index}  
                                    onMouseOver={() => debouncedOpenDropdown(index)}  
                                    onMouseLeave={() => debouncedCloseDropdown()}  
                                >  
                                <a className={`main-menu__nav-link nav-link cursor-pointer`}  
                                        href={`/menu/${item.menu_id}`} alt={item.title}  
                                    aria-haspopup="true"  
                                    aria-expanded="false" // No longer controlled by shared state  
                                    aria-current={index === 0 ? "page" : ""}  
                                >  
                                    {item.title}  
                                </a>  

                                {item.children?.length > 0 ? (  
                                    <DropDown items={item.children} isOpen={isOpen}
                                        level={1} path={index.toString()} // Pass index as string to create unique path  
                                    />  
                                ) : null}  
                                </li>  
                            );
                        })
                    ) : null}  
                </ul>  
            </div>  
        </nav>  
    );  
};  

export default NavBar;  
