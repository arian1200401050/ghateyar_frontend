import styled from 'styled-components';

import config from '#src/config.js';
import { mainCategories } from '#src/db/mainCategories.js';


const CategoryLogo = styled.span`
    background-image: ${(props) => `url(${props.logo})`};
    background-size: 80%;
`

export default function HomeCategories() {   
    return (
        <div className="home-categories-wrapper">
            <div className="main-section my-5 mx-auto p-4 rounded-2xl bg-secondary-500
                w-(--main-section-large-width)"
                id="home-categories">
                <div className="main-categories flex justify-around gap-2">
                    {mainCategories.map((item, index) => (
                        <div key={index} className="main-categories__item flex flex-col">
                            <CategoryLogo logo={`${config.MEDIA_ROOT}/${item.logo}`}
                                className="block w-0 h-0 p-8 m-auto border-1 border-gray-200 
                                    rounded-full bg-white bg-center bg-no-repeat"/>
                            <span className="m-auto mt-3">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}