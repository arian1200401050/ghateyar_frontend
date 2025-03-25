import { useState, useEffect } from 'react';  


function SliderControl({ barWrapper, bar, sliderClass, scrollUnit }) {  
    const [scrollPosition, setScrollPosition] = useState(0);  
    const [barWrapperDiff, setBarWrapperDiff] = useState(0);  

    useEffect(() => {  
        if (barWrapper && bar) {  
            const wrapperWidth = barWrapper.getBoundingClientRect().width;  
            const barWidth = bar.getBoundingClientRect().width;  
            setBarWrapperDiff(barWidth - wrapperWidth);  
        }  
    }, [barWrapper, bar]);  

    const scrollBar = (direction) => {  
       // Calculate potential new scroll position  
        const newScrollPosition = scrollPosition + (scrollUnit * direction);  
        
        // Clamp the new scroll position between 0 and barWrapperDiff  
        const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, barWrapperDiff));  

        // console.log(clampedScrollPosition);
        
        // Only update states and DOM if the position has changed  
        if (clampedScrollPosition !== scrollPosition) {  
            setScrollPosition(clampedScrollPosition);  
            bar.style.transform = `translateX(${clampedScrollPosition}px)`;  // Negate for correct direction  
        }  
    };  

    return (  
        <div className="slider-control">  
            <button  
                className={`carousel-control-next slider-control__button slider-control__button--prev
                    ${sliderClass}__button ${sliderClass}__button--prev
                    absolute !right-2 md:!right-5 !left-[unset]`}  
                style={{top: "calc(50% - .5rem)", bottom: "calc(50% + .5rem)"}}
                type="button"  
                onClick={() => scrollBar(-1)}  
            >  
                <span className={`carousel-control-next-icon slider-control__button-icon w-0 h-0 py-4 px-5 bg-center bg-no-repeat 
                    bg-gray-400 hover:bg-gray-500 !rounded-md cursor-pointer
                    ${sliderClass}__button-icon ${sliderClass}__button-icon--prev`} 
                    style={{backgroundImage: `url(icon/arrow-prev.svg)`, backgroundSize: '70%'}}
                    aria-hidden="true"></span>  
            </button>  
            <button  
                className={`carousel-control-prev slider-control__button slider-control__button--next
                    ${sliderClass}__button ${sliderClass}__button--next
                    absolute !right-[unset] !left-2 md:!left-5`}  
                style={{top: "calc(50% - .5rem)", bottom: "calc(50% + .5rem)"}}
                type="button"  
                onClick={() => scrollBar(1)}  
            >  
                <span className={`carousel-control-prev-icon slider-control__button-icon w-0 h-0 py-4 px-5 bg-center bg-no-repeat 
                    bg-gray-400 hover:bg-gray-500  !rounded-md cursor-pointer
                    ${sliderClass}__button-icon ${sliderClass}__button-icon--next`} 
                    style={{backgroundImage: `url(icon/arrow-next.svg)`, backgroundSize: '70%'}}
                    aria-hidden="true"></span>  
            </button>  
        </div>  
    );  
}  

export { SliderControl };