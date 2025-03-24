import React, { createContext, useContext, useEffect, useState } from 'react';  

// Create the context  
const ScreenWidthContext = createContext();  

// Create a provider component  
export const ScreenWidthProvider = ({ children }) => {  
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);  

    useEffect(() => {  
        const handleResize = () => {  
            setScreenWidth(window.innerWidth);  
            console.log(window.innerWidth);
        };  

        window.addEventListener('resize', handleResize);  

        return () => {  
            window.removeEventListener('resize', handleResize);  
        };  
    }, []);  

    return (  
        <ScreenWidthContext.Provider value={{ screenWidth }}>  
            {children}  
        </ScreenWidthContext.Provider>  
    );  
};  

// Create a custom hook for easy access  
export const useScreenWidth = () => {  
    return useContext(ScreenWidthContext);  
};  