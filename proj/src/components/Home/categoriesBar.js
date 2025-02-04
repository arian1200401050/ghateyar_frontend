import styled from 'styled-components';

import config from '../../config.js';
import { mainCategories } from '../../db/mainCategories.js';

import './styles/categoriesBar.scss';


const CategoryLogo = styled.span.attrs({ className: "main-categories__item-logo d-block w-0 h-0 p-3 border border-2 rounded-circle-full m-auto"})`
    background-image: ${({ logo }) => `url(${logo})`};
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
`

function CategoriesBar() {   
    return (
        <div className="main-categories-wrapper">
            <div className="main-section main-section--greater main-categories my-5 mx-auto p-4 rounded-2 bg-primary-3">
                <div className="main-categories d-flex justify-content-around">
                    {mainCategories.map((item, index) => (
                        <div key={index} className="main-categories__item d-flex flex-column mx-2">
                            <CategoryLogo key={index} logo={`${config.MEDIA_ROOT}/${item.logo}`} />
                            <span className="main-categories__item-title m-auto mt-1">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default CategoriesBar;
