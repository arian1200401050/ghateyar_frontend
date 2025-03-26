import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import config from '#src/config.js';  
import { useScreenWidth } from '#src/context/ScreenWidthContext.jsx';
import { mainArticles } from '#src/db/mainArticles.js';  

export default function HomeArticles() {  
    const { screenWidth } = useScreenWidth();  
    const [cardWidth, setCardWidth] = useState();

    useEffect(() => {
        let newCardWidth;

        if (screenWidth >= 768) {
            newCardWidth = 'calc((100% / 3) - 1rem)';
        } else if (screenWidth >= 520) {
            newCardWidth = 'calc(50% - 1rem)';
        } else {
            newCardWidth = 'calc(100% - 2rem)';
        }    

        setCardWidth(newCardWidth);
    }, [screenWidth])


    return ( 
        <div className="my-5 mx-auto">  
            <div id="home-articles" className="main-container w-(--main-section-width) mx-auto">
                <div className="mb-3">  
                    <div className="flex items-center space-x-4">  
                        <h4 className="text-gray-700 !text-[1.2rem]">وبلاگ</h4>  
                        <div className="flex-grow border-t border-gray-500 mx-16"></div>  
                        <span className="badge py-2 px-4 !text-gray-700 border-1 border-gray-400
                            rounded cursor-pointer !hidden">  
                            مشاهده عناوین بیشتر  
                        </span>  
                    </div>  
                </div>  
                <div className="py-3">  
                    <div className="overflow-hidden">  
                        <div className="overflow-scroll flex no-wrap pb-2 !gap-y-4 justify-start md:overflow-hidden">  
                            {mainArticles.map((item, index) => (  
                                <div  
                                    key={index}  
                                    className="card border border-gray-300 shrink-0 mx-2 xs:!mx-2 md:!mx-2 lg:!mx-4"  
                                    style={{ width: cardWidth, boxShadow: '0 .2rem .2rem var(--color-gray-500)' }}
                                        // Use inline style for  tailwind impossiblities
                                >  
                                    <Link to={`article/${item.id}`} className="w-full h-full">  
                                        <div className="h-84 md:h-48 overflow-hidden">  
                                            <img  
                                                src={`${config.MEDIA_ROOT}/${item.banner}`}  
                                                alt={item.title}  
                                                className="w-full h-full object-contain"  
                                            />  
                                        </div>  
                                        <div className="p-3 border-t border-gray-300 text-right">  
                                            <h5 className="!text-zinc-600 text-xl md:!text-base my-2 md:!m-0">  
                                                {item.title}  
                                            </h5>  
                                            <p className="text-gray-600 text-lg md:!text-sm">{item.description}</p>  
                                        </div>  
                                    </Link>  
                                </div>  
                            ))}  
                        </div>  
                    </div>  
                </div>  
            </div>
        </div>  
    );  
}  