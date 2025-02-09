import { mainProducts } from '../../db/mainProducts.js';

import './styles/suggestedProductsRegal.scss';

function SuggestedProductsRegal() {
    return (
        <div className="product-regal-wrapper my-4 ">
            <div className="main-section product-regal mx-auto py-2 border border-1 border-gray-3 bg-primary-4 rounded-2">
                <div className="product-regal__header"></div>
                <div className="product-regal__body">
                    <div className="product-regal__inner-wrapper d-flex flex-nowrap ms-2 overflow-hidden">
                        <div className="product-regal__big-logo flex-shrink-0">

                        </div>
                        <div className="product-regal__inner d-flex flex-shrink-0 w-fit-content">
                            {mainProducts.map((item, index) => (
                                <div key={index} className="card mx-1 product-card">
                                    <div className="w-100 product-card__image-wrapper">
                                        <img src={`image/${item.banner}`} className="card-img-top h-100 object-fit-contain product-card__image" alt="..." />
                                    </div>
                                    <div className="card-body rounded-bottom border-top bg-white text-start">
                                        <div className="product-card__title-wrapper">
                                            <h5 className="card-title text-end">{ item.title }</h5>
                                        </div>
                                        <div className="container product-card__text-wrapper">
                                            <div className="row product-card__text-inner">
                                                <div className="col col-2 d-flex align-items-center px-0 product-card__discount-section">
                                                    <span className="badge rounded-2 product-card__discount">{ item.discount }%</span>
                                                </div>
                                                <div className="col col-10 product-card__price-section">
                                                    <span className="d-block card-text">
                                                        { item.price - (item.price * (item.discount / 100))}
                                                    </span>
                                                    <span className="d-block card-text product-card__discountic-price">
                                                        <small className="text-muted">
                                                            { item.price }        
                                                        </small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuggestedProductsRegal;
