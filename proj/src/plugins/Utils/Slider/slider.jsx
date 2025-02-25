import { useState, useEffect } from 'react';  
import './resources/slider.scss';  

function SliderControl({ barWrapper, bar, sliderClass, scrollUnit }) {  
    const [scrollPosition, setScrollPosition] = useState(0);  
    const [barWrapperDiff, setBarWrapperDiff] = useState(0);  

    useEffect(() => {  
        if (barWrapper && bar) {  
            const wrapperWidth = barWrapper.getBoundingClientRect().width;  
            const barWidth = bar.getBoundingClientRect().width;  
            console.log('Wrapper -> ', wrapperWidth);
            console.log('Bar -> ', barWidth);
            setBarWrapperDiff(barWidth - wrapperWidth);  
        }  
    }, [barWrapper, bar]);  

    const scrollBar = (direction) => {  
       // Calculate potential new scroll position  
        const newScrollPosition = scrollPosition + (scrollUnit * direction);  
        
        // Clamp the new scroll position between 0 and barWrapperDiff  
        const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, barWrapperDiff));  

        console.log(clampedScrollPosition);
        
        // Only update states and DOM if the position has changed  
        if (clampedScrollPosition !== scrollPosition) {  
            setScrollPosition(clampedScrollPosition);  
            bar.style.transform = `translateX(${clampedScrollPosition}px)`;  // Negate for correct direction  
        }  
    };  

    return (  
        <div className="slider-control">  
            <button  
                className={`carousel-control-next slider-control__button 
                    ${sliderClass}__button ${sliderClass}__button--prev`}  
                type="button"  
                onClick={() => scrollBar(-1)}  
            >  
                <span className={`carousel-control-next-icon slider-control__button-icon 
                    ${sliderClass}__button-icon ${sliderClass}__button-icon--prev`} aria-hidden="true"></span>  
                <span className="visually-hidden">Previous</span>  
            </button>  
            <button  
                className={`carousel-control-prev slider-control__button 
                    ${sliderClass}__button ${sliderClass}__button--next`}  
                type="button"  
                onClick={() => scrollBar(1)}  
            >  
                <span className={`carousel-control-prev-icon slider-control__button-icon 
                    ${sliderClass}__button-icon ${sliderClass}__button-icon--next`} aria-hidden="true"></span>  
                <span className="visually-hidden">Next</span>  
            </button>  
        </div>  
    );  
}  

export { SliderControl };