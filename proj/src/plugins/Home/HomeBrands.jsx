import { useState, useRef, useEffect } from 'react';  
import styled from 'styled-components';
import axios from 'axios';

import config from '#src/config.js';  
import { SliderControl } from '#src/plugins/Utils/Slider/slider.jsx';  


const CategoryLogo = styled.span`
  background-image: ${(props) => `url(${props.$logo})`};
  background-size: 70%;
`

export default function HomeBrands() {  
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/public/home-brand/`);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchBrands();
  }, []);

  if (loading) {
    // return <div className="loading">Loading brands...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
}

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
        <div className="flex gap-4 overflow-scroll md:!overflow-hidden" ref={barWrapperRef}>  
          <div className="flex flex-nowrap transition-transform duration-500" ref={barRef}>  
            {brands.map((item, index) => (  
              <div key={index} className="w-36 h-16 flex-shrink-0 mx-3 sm:!mx-6 ">  
                <CategoryLogo $logo={`${item.brand.logo}`}   
                  className="block bg-white w-full h-full rounded border-1 !border-gray-300 bg-center bg-no-repeat"  
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