import React from 'react';

export default function ArticleBanner({ title, image, category }) {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-t-md overflow-hidden">
            {/* Background Image */}
            <div className="w-full h-full">
                <img 
                    src={`${image || '/images/default-article-banner.jpg'}`} alt={title} 
                    className='w-full h-full absolute inset-0 object-contain'
                    data-image={image}
                />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black/70 to-transparent">
                {/* Category Badge */}
                {category && (
                    <div className="inline-block mb-4">
                        <span className="px-3 py-1 text-sm font-medium text-white bg-primary-500 rounded-full">
                            {category}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {title}
                </h1>
            </div>
        </div>
    );
} 