import styled from 'styled-components';

import config from '../../config.js';
import { mainBrands } from '../../db/mainBrands.js'
import './styles/brandsSection.scss';


const BrandItem = styled.span.attrs({className: 'd-block w-6 py-2 border border-2 rounded m-auto text-center'})`
    background-image: ${({ logo }) => `url(${logo})`};
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
`


function BrandsSection () {
    return (  
        <div className="brands-section-wrapper my-3">
            <div className="brnads-section__header mb-4">
                <h5 className="brands-section__header-title d-inline me-3 px-3 pb-1 border-bottom border-black">برندها</h5>
            </div>
            <div className="brands-section d-flex flex-wrap">
                {mainBrands.map((item, index) => (
                    <div className="brand-item-wrapper mx-2">
                        <div className="brand-item">
                            <BrandItem key={index} logo={`${config.MEDIA_ROOT}/brand/${item.alias}.png`}>
                                {item.title}
                            </ BrandItem>
                        </div>
                    </div>
                ))}
                <div></div>
            </div>
        </div>
    );
};


export default BrandsSection;