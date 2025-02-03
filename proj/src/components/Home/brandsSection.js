import styled from 'styled-components';

import config from '../../config.js';
import { mainBrands } from '../../db/mainBrands.js'
import './styles/brandsSection.scss';


const BrandItem = styled.span.attrs({className: 'd-block py-2 border border-2 rounded m-auto text-center brand-item__button'})`
    background-image: ${({ logo }) => `url(${logo})`};
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
`


function BrandsSection () {
    return (  
        <div className="brands-section-wrapper">
            <div className="main-section main-section--greater brands-section my-5 mx-auto">
                <div className="brnads-section__header mb-4">
                    <h4 className="brands-section__header-title d-inline me-3 px-3 pb-1">
                        جذاب‌ترین برندها!
                    </h4>
                </div>
                <div className="brands-section__inner d-flex flex-wrap">
                    {mainBrands.map((item, index) => (
                        <div key={index} className="brand-item-wrapper mx-2">
                            <div className="brand-item">
                                <BrandItem key={index} logo={`${config.MEDIA_ROOT}/image/${item.logo}`}>
                                    {/* {item.title} */}
                                </ BrandItem>
                            </div>
                        </div>
                    ))}
                    <div></div>
                </div>
            </div>
        </div>
    );
};


export default BrandsSection;