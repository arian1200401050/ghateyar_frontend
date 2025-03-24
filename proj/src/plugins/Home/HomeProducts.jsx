import { useRef, useState, useEffect, forwardRef } from 'react';  
import config from '#src/config.js';  
import { mainProducts } from '#src/db/mainProducts.js';  
import { mainAuction } from '#src/db/mainAuction.js';  

// Extracted subcomponents  
function Timer({ timeLeft }) {  
    return (  
        <div className="flex justify-center space-x-1">  
            <span className="font-bold">{timeLeft.hour}</span>  
            <span className="text-gray-500">:</span>  
            <span className="font-bold">{timeLeft.minute}</span>  
            <span className="text-gray-500">:</span>  
            <span className="font-bold">{timeLeft.second}</span>  
        </div>  
    );  
}  

const ProductCard = forwardRef((props, ref) => {  
    const discountedPrice = props.item.price - (props.item.price * (props.item.discount / 100));  
    
    return (  
        <div ref={ref} 
            className="cards shrink-0 p-2 bg-white 
                rounded-md overflow-hidden border-1 border-gray-400"
            style={{width: `calc((${props.wrapperWidth}px - 4rem) / 3)`}}
        >  
            <div className="h-48">
                <img  
                    src={`${config.MEDIA_ROOT}/${props.item.banner}`}  
                    className="object-contain w-full h-full"  
                    alt={props.item.title}  
                />  
            </div>
            <div className="bg-white">  
                <div className="mt-2">
                    <h5 className="pr-1 !text-lg">{props.item.title}</h5>  
                </div>
                <div className="flex justify-between items-center mt-2 px-2">  
                    <span className="badge bg-red-500 text-white">{props.item.discount}%</span>  
                    <div className="text-right">  
                        <span className="block font-bold">{discountedPrice}</span>  
                        <small className="text-gray-400 line-through">{props.item.price}</small>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
})

export default function HomeProducts() {  
    const [scrollPosition, setScrollPosition] = useState(0);
    const [barWrapperWidth, setBarWrapperWidth] = useState(0)  
    const productBarWrapper = useRef(null);  
    const productBar = useRef(null);  
    const productCard = useRef(null);
    const [scrollUnit, setScrollUnit] = useState(0);  
    const [barWrapperDiff, setBarWrapperDiff] = useState(0);  

    useEffect(() => {  
        const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);  
        const cardWidth = productCard.current.getBoundingClientRect().width;
        const unit = (cardWidth + (2 * remSize));  
        setScrollUnit(unit);  

        const wrapperWidth = productBarWrapper.current.getBoundingClientRect().width;  
        const barWidth = productBar.current.getBoundingClientRect().width;  
        setBarWrapperDiff(barWidth - wrapperWidth);  
        setBarWrapperWidth(wrapperWidth)
    }, [productCard, productBarWrapper, productBar]);  

    const scrollBar = (direction) => {  
        // Calculate potential new scroll position  
        const newScrollPosition = scrollPosition + (scrollUnit * direction);  
        console.log(scrollPosition)
        
        // Clamp the new scroll position between 0 and barWrapperDiff  
        const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, barWrapperDiff));  

        // Only update states and DOM if the position has changed  
        if (clampedScrollPosition !== scrollPosition) {  
            setScrollPosition(clampedScrollPosition);  
        } 
    };  

    return (  
        <div className="home-products-wrapper my-4 mx-auto">  
            <div id="home-products"
                className="main-container w-(--main-section-large-width) mx-auto p-4 border border-gray-400 
                    bg-third-500 rounded-lg shadow flex flex-initial">  
                <div className="text-center flex flex-col justify-around w-48 shrink-0">  
                    <h5 className="text-lg font-semibold">حراج هفتگی</h5>  
                    <img className="mx-auto mb-2 rounded-full" 
                        src={`${config.MEDIA_ROOT}/${mainAuction.logo.src}`} alt={mainAuction.logo.alt} />  
                    <Timer timeLeft={mainAuction.timeLeft} />  
                </div>  
                <div className="relative px-16"
                    style={{width: 'calc(100% - 12rem)'}}>
                    <div className="overflow-hidden w-100"
                        ref={productBarWrapper}>  
                        <div  
                            className="flex flex-no-wrap w-fit gap-x-8 transition-transform duration-500"  
                            ref={productBar}  
                            style={{ transform: `translateX(${scrollPosition}px)` }}  
                        >  
                            {mainProducts.map((item, index) => (  
                                <ProductCard key={index} ref={productCard}
                                    item={item} wrapperWidth={barWrapperWidth} />  
                            ))}  
                        </div>  
                    </div>  
                    <button  
                        className="flex items-center justify-center w-0 h-0 bg-gray-300
                            hover:bg-gray-400 text-black"  
                        onClick={() => scrollBar(-1)}  
                    >  
                        <span className="material-icons absolute top-50 right-2 p-4 bg-center bg-no-repeat"
                            style={{backgroundImage: `url(icon//arrow-prev.svg)`}}>
                        </span>  
                    </button>  
                    <button  
                        className="flex items-center justify-center w-0 h-0 bg-gray-300 
                            hover:bg-gray-400 text-black"  
                        onClick={() => scrollBar(1)}  
                    >  
                        <span className="material-icons absolute top-50 left-2 p-4 bg-center bg-no-repeat"
                            style={{backgroundImage: `url(icon//arrow-next.svg)`}}></span>  
                    </button>  
                </div>
            </div>  
        </div>  
    );  
}  