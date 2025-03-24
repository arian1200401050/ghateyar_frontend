import React, { useState } from "react";  
import { Link } from "react-router-dom";

import config from "../../config.js";  
import { homeSlides } from "../../db/homeSlides.js";  


function SlideItem ({ index, activeIndex, title, description, imagePath, url}) {
    return (
        <div className={`w-fit carousel-item ${activeIndex === index ? "active" : ""}`}>  
            <div className="w-full h-101 relative">  
                <Link to={url}>
                    <div className="h-100">
                        <img  
                            src={imagePath}  
                            className="w-full h-full object-contain"  
                            alt={title}  
                        />
                    </div>  
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 bg-opacity-75 rounded-t
                        h-20 hidden">  
                        <h5 className="p-4 text-lg font-bold">{title}</h5>  
                        <p className="p-4">{description}</p>  
                    </div>  
                </Link>
            </div>  
        </div>  
    )
}


function CarouselControls ({ activeIndex, setActiveIndex, totalSlides }) {  
    const nextIndex = (activeIndex + 1) % totalSlides;  
    const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;  

    return (  
        <>  
            <button  
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500/75 text-white
                    !rounded-xl !text-2xl flex justify-center items-center p-4 w-0 h-0 
                    hover:bg-gray-500/100 transition-background duration-300"  
                type="button"  
                onClick={() => setActiveIndex(prevIndex)}  
                aria-label="Previous"  
            >  
                &#10094; {/* Unicode for left arrow */}  
            </button>  
            <button  
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500/75 text-white
                    !rounded-xl !text-2xl flex justify-center items-center p-4 w-0 h-0 
                    hover:bg-gray-500/100 transition-background duration-300"  
                type="button"  
                onClick={() => setActiveIndex(nextIndex)}  
                aria-label="Next"  
            >  
                &#10095; {/* Unicode for right arrow */}  
            </button>  
        </>  
    );  
}


export default function HomeSlider() {  
    const [activeIndex, setActiveIndex] = useState(0);  

    const handleSelect = (index) => {  
        setActiveIndex(index);  
    };  

    return (  
        <div className="home-slider-wrapper">  
            <div  
                id="home-slider"  
                className="main-section carousel slide w-(--main-section-width) 
                    relative my-5 mx-auto border-2 border-gray-300 rounded-lg"  
                data-bs-ride="carousel"  
            >  
                <div className="carousel-indicators !flex !space-x-2 px-2 !m-0 bg-gray-400 
                    rounded-md
                    absolute !left-2 !top-2 md:!left-8 md:!top-8 !right-[unset] !bottom-[unset]">  
                    {homeSlides.map((_, index) => (  
                        <button   
                            key={index}  
                            type="button"  
                            data-bs-target="#main-slider"  
                            data-bs-slide-to={index}  
                            aria-label={`Slide ${index + 1}`}  
                            aria-current={activeIndex === index ? "true" : "false"}  
                            className={`!w-8 !h-1 rounded-xs opacity-100
                                ${activeIndex === index ? "!bg-white" : "!bg-gray-500"}`}  
                            onClick={() => handleSelect(index)}  
                        ></button>  
                    ))}  
                </div>  
                <div className="carousel-inner w-fit">  
                    {homeSlides.map((item, index) => (  
                        <SlideItem  
                            key={index}  
                            index={index}  
                            activeIndex={activeIndex}  
                            title={item.title}  
                            description={item.description}  
                            imagePath={`${config.MEDIA_ROOT}/${item.image}`}  
                            url={item.url}
                        />  
                    ))}  
                </div>  
                <CarouselControls   
                    activeIndex={activeIndex}   
                    setActiveIndex={handleSelect}   
                    totalSlides={homeSlides.length}  
                />  
            </div>  
        </div>  
    );  
}  