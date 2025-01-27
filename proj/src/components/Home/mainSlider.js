import config from "../../config.js";

// src/MainSlider.js

import React, { useState } from "react";
import "./styles/mainSlider.scss";

import { mainSlides } from "../../db/mainSlides.js";

const MainSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="main-slider-wrapper">
            <div
                id="main-slider"
                className="carousel slide my-5 mx-auto border border-1 border-gray-3 rounded main-slider"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators rounded bg-gray-o1 main-slider__indecators-wrapper">
                    {mainSlides.map((_, index) => (
                        <button
                            type="button"
                            data-bs-target="#main-slider"
                            data-bs-slide-to={index}
                            aria-label={`Slide ${index + 1} `}
                            className={activeIndex === index ? "active" : ""}
                            aria-current={
                                activeIndex === index ? "true" : "false"
                            }
                            onClick={() => handleSelect(index)}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner w-100 h-100 slide-main-wrapper">
                    {mainSlides.map((item, index) => (
                        <div
                            className={`carousel-item w-100 h-100 slide-main ${
                                activeIndex === index ? "active" : ""
                            }`}
                        >
                            <div className="w-100 slide-main__image-wrapper">
                                <img
                                    src={`image/${item.filepath}`}
                                    className="d-block w-100 h-100 slide-main__image"
                                    alt={item.title}
                                />
                            </div>
                            <div className="carousel-caption d-none d-md-block w-100 rounded-top bg-gray-o1 slide-main__caption">
                                <h5 className="slide-main__title">
                                    {item.title}
                                </h5>
                                <p className="slide-main__description">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev top-50 bottom-50 rounded bg-gray-2 main-slider__control main-slider__control--prev"
                    type="button"
                    data-bs-target="#main-slider"
                    data-bs-slide="prev"
                    onClick={() =>
                        handleSelect(
                            (activeIndex - 1 + mainSlides.length) %
                                mainSlides.length
                        )
                    }
                >
                    <span
                        className="carousel-control-prev-icon main-slider__control-icon main-slider__control-icon--prev"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next top-50 bottom-50 rounded bg-gray-2 main-slider__control main-slider__control--next"
                    type="button"
                    data-bs-target="#main-slider"
                    data-bs-slide="next"
                    onClick={() =>
                        handleSelect((activeIndex + 1) % mainSlides.length)
                    }
                >
                    <span
                        className="carousel-control-next-icon main-slider__control-icon main-slider__control-icon--next"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default MainSlider;
