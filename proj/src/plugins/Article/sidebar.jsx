import React from 'react';
import { Link } from 'react-router-dom';

function TableOfContents({ items }) {
    if (!items || !Array.isArray(items)) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">فهرست مطالب</h3>
            <nav>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <a 
                                href={`#${item.id}`}
                                className="block text-gray-600 hover:text-primary-500 transition-colors"
                            >
                                {item.title}
                            </a>
                            {item.children && (
                                <ul className="mr-4 mt-2 space-y-2">
                                    {item.children.map((child) => (
                                        <li key={child.id}>
                                            <a 
                                                href={`#${child.id}`}
                                                className="block text-sm text-gray-500 hover:text-primary-500 transition-colors"
                                            >
                                                {child.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

function RelatedVideos({ videos }) {
    if (!videos || !Array.isArray(videos) || videos.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">ویدیوهای مرتبط</h3>
            <div className="space-y-4">
                {videos.map((video) => (
                    <div key={video.id} className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-1">
                                {video.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {video.duration}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RelatedProducts({ products }) {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">محصولات مرتبط</h3>
            <div className="space-y-4">
                {products.map((product) => (
                    <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex gap-4 group"
                    >
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-contain rounded"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                                {product.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {product.price.toLocaleString()} تومان
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function ArticleSidebar({ tableOfContents, relatedVideos, relatedProducts }) {
    return (
        <div className="lg:sticky lg:top-4">
            <TableOfContents items={tableOfContents} />
            <RelatedVideos videos={relatedVideos} />
            <RelatedProducts products={relatedProducts} />
        </div>
    );
}
