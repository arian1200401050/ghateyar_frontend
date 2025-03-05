import { useRef, useState, useEffect } from 'react';

import config from '#src/config.js';

import { mainProducts } from '#src/db/mainProducts.js';
import { mainAuction } from '#src/db/mainAuction.js';

import './styles/suggestedProductsRegal.scss';


function SuggestedProductsRegal() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [barWrapperDiff, setBarWrapperDiff] = useState(0);
    const [allowScrollDiff, setAllowScrollDiff] = useState(0);
    const [scrollUnit, setScrollUnit] = useState();
    const productBarWrapper = useRef(null);
    const productBar = useRef(null);

    useEffect(() => {
        const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);
        const mainSectionWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--main-section-width'));
        const _scrollUnit = (((mainSectionWidth / 4) - 1.66) * remSize);
        setScrollUnit(_scrollUnit);

        const wrapperWidth = productBarWrapper.current.getBoundingClientRect().width;
        const barWidth = productBar.current.getBoundingClientRect().width;
        setBarWrapperDiff(barWidth - wrapperWidth);
        setAllowScrollDiff(_scrollUnit);

    }, [productBar]);

    const scrollBar = (controlUnit) => {
        const _scrollPosition = scrollPosition - scrollUnit * controlUnit;

        if (_scrollPosition >= 0 && _scrollPosition < barWrapperDiff + allowScrollDiff) {
            setScrollPosition(_scrollPosition);
        }
    }

    return (
        <div className="product-regal-wrapper my-4">
            <div className="main-section product-regal mx-auto py-2 border border-1 border-gray-3 bg-primary-4 rounded-2">
                <div className="product-regal__header"></div>
                <div className="product-regal__body">
                    <div className="product-regal__box flex-shrink-0">
                        <div className="product-regal__box-title-wrapper">
                            <h5 className="product-regal__box-title">
                                حراج هفتگی
                            </h5>
                        </div>
                        <div className="product-regal__box-logo-wrapper">
                            <img className="product-regal__box-logo-image" src={`${config.MEDIA_ROOT}/${mainAuction.logo.src}`} alt={mainAuction.logo.alt}/>
                        </div>
                        <div className="product-regal__box-timer-wrapper">
                            <span className="product-regal__box-timer-col product-regal__box-timer-col--hour">
                                {mainAuction.timeLeft.hour}
                            </span>
                            <span className="product-regal__box-timer-spliter">:</span>
                            <span className="product-regal__box-timer-col product-regal__box-timer-col--minute">
                                {mainAuction.timeLeft.minute}
                            </span>
                            <span className="product-regal__box-timer-spliter">:</span>
                            <span className="product-regal__box-timer-col product-regal__box-timer-col--second">
                                {mainAuction.timeLeft.second}
                            </span>
                        </div>
                    </div>
                    <div className="product-regal__bar-wrapper d-flex flex-nowrap ms-2 overflow-hidden"
                        ref={productBarWrapper} id="product-regal-bar">
                        <div className="product-regal__bar d-flex flex-shrink-0 w-fit-content"
                            ref={productBar}
                            style={{transform: `translateX(${scrollPosition}px)`}}>
                            {mainProducts.map((item, index) => (
                                <div key={index} className="card mx-1 product-card">
                                    <div className="w-100 product-card__image-wrapper">
                                        <img src={`${config.MEDIA_ROOT}/${item.banner}`} className="card-img-top h-100 object-fit-contain product-card__image" alt="..." />
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
                        <button
                            className="carousel-control-prev product-regal__control product-regal__control--prev"
                            type="button"
                            data-bs-target="#product-regal-bar"
                            data-bs-slide="prev"
                            onClick={() => scrollBar(-1)}
                        >
                            <span
                                className="carousel-control-prev-icon product-regal__control-icon product-regal__control-icon--prev"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next product-regal__control product-regal__control--next"
                            type="button"
                            data-bs-target="#product-regal-bar"
                            data-bs-slide="next"
                            onClick={() => scrollBar(1)}
                        >
                            <span
                                className="carousel-control-next-icon product-regal__control-icon product-regal__control-icon--next"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuggestedProductsRegal;
