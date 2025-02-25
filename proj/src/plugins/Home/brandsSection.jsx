import { useState, useRef, useEffect } from 'react';  
import styled from 'styled-components';  

import config from '#src/config.js';  
import { mainBrands } from '#src/db/mainBrands.js';  
import { SliderControl } from '#src/plugins/Utils/Slider/slider.jsx';  
import './styles/brandsSection.scss';  

const BrandItemIcon = styled.span.attrs({ className: 'd-block py-2 border border-2 rounded m-auto text-center brand-item__badge-icon' })`  
	background-image: ${({ logo }) => `url(${logo})`};  
	background-size: 70%;  
	background-position: center;  
	background-repeat: no-repeat;  
`;  

function BrandsSection() {  
  const [scrollUnit, setScrollUnit] = useState(0);  
	const barWrapperRef = useRef(null);  
	const barRef = useRef(null);  

	useEffect(() => {  
		const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);  
		const itemWidth = 12 * remSize;
		const countInSlide = 2;
		const calculatedScrollUnit = itemWidth * countInSlide;
		setScrollUnit(calculatedScrollUnit);  
	}, []);  

	return (  
		<div className="brands-section-wrapper">  
			<div className="main-section main-section--greater brands-section my-5 mx-auto">  
				<div className="brands-section__header mb-4">  
					<h4 className="brands-section__header-title d-inline me-3 px-3 pb-1">
						جذاب‌ترین برندها!
					</h4>  
				</div>  
				<div className="brands-section__bar-wrapper" ref={barWrapperRef}>  
					<div className="brands-section__bar" id="brands-section-bar" ref={barRef}>  
						{mainBrands.map((item, index) => (  
							<div key={index} className="brand-item__badge">  
								<BrandItemIcon logo={`${config.MEDIA_ROOT}/image/${item.logo}`} />  
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

export default BrandsSection;