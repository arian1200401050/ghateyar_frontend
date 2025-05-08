import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '#src/config.js';

const CategoryLogo = styled.span`
    background-image: ${(props) => `url(${props.$logo})`};
    background-size: 80%;
`

export default function HomeCategories() {   
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.BACKEND_URL}/api/v1/public/home-category/`);
                console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        // return <div className="loading">Loading categories...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="home-categories-wrapper">
            <div className="main-section my-5 mx-auto p-4 rounded-2xl bg-secondary-500
                w-(--main-section-large-width)"
                id="home-categories">
                <div className="main-categories flex justify-around gap-2">
                    {categories.map((item, index) => (
                        <div key={index} className="main-categories__item flex flex-col">
                            <CategoryLogo $logo={`${item.category.logo}`}
                                className="block w-0 h-0 p-8 m-auto border-1 border-gray-200 
                                    rounded-full bg-white bg-center bg-no-repeat"/>
                            <span className="m-auto mt-3">{item.category.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}