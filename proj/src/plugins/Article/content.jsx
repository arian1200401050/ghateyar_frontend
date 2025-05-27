import React from 'react';
import { Link } from 'react-router-dom';

function ContentBlock({ block }) {
    switch (block.type) {
        case 'heading':
            return (
                <h2 
                    id={block.id}
                    className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                >
                    {block.content}
                </h2>
            );

        case 'paragraph':
            return (
                <p className="text-gray-700 leading-relaxed mb-4">
                    {block.content}
                </p>
            );

        case 'list':
            return (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    {block.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );

        case 'quote':
            return (
                <blockquote className="border-r-4 border-primary-500 pr-4 my-6">
                    <p className="text-gray-600 italic">
                        {block.content}
                    </p>
                    {block.author && (
                        <footer className="text-sm text-gray-500 mt-2">
                            — {block.author}
                        </footer>
                    )}
                </blockquote>
            );

        case 'image':
            return (
                <figure className="my-6">
                    <img 
                        src={block.url} 
                        alt={block.alt}
                        className="w-full rounded-lg shadow-sm"
                    />
                    {block.caption && (
                        <figcaption className="text-sm text-gray-500 mt-2 text-center">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'product_link':
            return (
                <div className="bg-gray-50 rounded-lg p-4 my-6">
                    <Link 
                        to={`/product/${block.product_id}`}
                        className="flex gap-4 group"
                    >
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={block.image} 
                                alt={block.title}
                                className="w-full h-full object-contain rounded"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                                {block.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {block.price.toLocaleString()} تومان
                            </p>
                        </div>
                    </Link>
                </div>
            );

        default:
            return null;
    }
}

export default function ArticleContent({ introduction, content }) {
    return (
        <article className="bg-white rounded-lg shadow-sm p-6">
            {/* Introduction Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    معرفی
                </h2>
                <div className="prose max-w-none">
                    {introduction}
                </div>
            </section>

            {/* Main Content Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    متن مقاله
                </h2>
                <div className="prose max-w-none">
                    {content.map((block, index) => (
                        <ContentBlock key={index} block={block} />
                    ))}
                </div>
            </section>
        </article>
    );
} 