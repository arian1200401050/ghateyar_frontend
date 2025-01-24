import config from "../../config.js";

// src/MainSlider.js

import React, { useState } from "react";
import "./styles/mainSlider.scss";

import { mainSlides } from "../../db/mainSlides.js";

const MainSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mainSlides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mainSlides.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="main-slider-wrapper my-3">
            <div className="main-slider">
                <div className="main-slider__slide">
                    <div>
                        <img
                            className="slide__image-wrapper"
                            src={`${config.MEDIA_ROOT}/image/${mainSlides[currentIndex].filepath}`}
                            alt={`${mainSlides[currentIndex].title}`}
                        />
                    </div>
                    <div>
                        <h2>{mainSlides[currentIndex].title}</h2>
                        <p>{mainSlides[currentIndex].content}</p>
                    </div>
                </div>
                <div className="main-slider__button-wrapper">
                    <button
                        className="slide__button slide__prev"
                        onClick={prevSlide}
                    ></button>
                    <button
                        className="slide__button slide__next"
                        onClick={nextSlide}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default MainSlider;
