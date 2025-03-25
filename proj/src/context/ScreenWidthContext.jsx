import React, { createContext, useContext, useEffect, useState } from 'react';  

import config from '#src/config.js'

// Create the context  
const ScreenWidthContext = createContext();  

// Create a provider component  
export const ScreenWidthProvider = ({ children }) => {  
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);  
    const [isMobile] = useState(screenWidth < config.MOBILE_BREAKPOINT);

    useEffect(() => {  
        const handleResize = () => {  
            setScreenWidth(window.innerWidth);  
        };  

        window.addEventListener('resize', handleResize);  

        return () => {  
            window.removeEventListener('resize', handleResize);  
        };  
    }, []);  

    return (  
        <ScreenWidthContext.Provider value={{ screenWidth, isMobile }}>  
            {children}  
        </ScreenWidthContext.Provider>  
    );  
};  

// Create a custom hook for easy access  
export const useScreenWidth = () => {  
    return useContext(ScreenWidthContext);  
};  