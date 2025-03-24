import { useState, useRef, useEffect } from 'react';  

import config from '#src/config.js';  
import { mainBrands } from '#src/db/mainBrands.js';  
import { SliderControl } from '#src/plugins/Utils/Slider/slider.jsx';  


export default function HomeBrands() {  
  const [scrollUnit, setScrollUnit] = useState(0);  
  const barWrapperRef = useRef(null);  
  const barRef = useRef(null);  

  useEffect(() => {  
    const handleResize = () => {
      const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);  
      const itemWidth = 12 * remSize;  
      const countInSlide = 2;  
      const calculatedScrollUnit = itemWidth * countInSlide;  
      setScrollUnit(calculatedScrollUnit);  
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);  

  return (  
    <div className="home-brands-wrapper">  
      <div id="home-brands" 
        className="main-section relative border-1 !border-gray-400 rounded-lg mx-auto
			    pt-4 pb-5 px-10 md:px-16 w-(--main-section-large-width)">  
        <div className="text-center mb-9">  
          <h4 className="inline-block px-3 mb-2=2 text-lg font-semibold" >  
            جذاب‌ترین برندها!  
          </h4>  
        </div>  
        <div className="flex gap-4 overflow-hidden" ref={barWrapperRef}>  
          <div className="flex flex-nowrap transition-transform duration-500" ref={barRef}>  
            {mainBrands.map((item, index) => (  
              <div key={index} className="w-36 h-16 flex-shrink-0 mx-3 sm:!mx-6 ">  
                <div   
                  className="bg-white w-full h-full rounded border-1 !border-gray-300 bg-center bg-no-repeat"  
                  style={{ backgroundImage: `url(${config.MEDIA_ROOT}/${item.logo})`, backgroundSize: '70%' }}  
                />  
              </div>  
            ))}  
          </div>  
        </div>  
        <SliderControl  
          barWrapper={barWrapperRef.current}  
          bar={barRef.current}  
          scrollUnit={scrollUnit}  
          sliderClass="brands-section-bar"  
        />  
      </div>  
    </div>  
  );  
}  