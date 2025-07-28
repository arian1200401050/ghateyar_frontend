import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import config from '#src/config.js';

const MenuContext = createContext();

import dataMockData from '#src/db/mockData.js';

export function ArticleMenuProvider({ children }) {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchMenu = async () => {
            try {
                const { data } = await axios.get(`${config.BACKEND_URL}/api/v1/article/article-menu/tree/`);
                if (isMounted) {
                    setMenu(data);
                    // setMenu(dataMockData);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        };

        fetchMenu();

        return () => {
            isMounted = false;
        };
    }, []);

    // Don't render children until menu is loaded
    if (loading) {
        return null;
    }

    if (error) {
        console.error('Error loading menu:', error);
        // Still render children even if menu fails to load
    }

    return (
        <MenuContext.Provider value={{ menu, loading, error }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useArticleMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
} 