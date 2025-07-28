import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleBreadcrumb({ path }) {
    if (!path || !Array.isArray(path)) {
        return null;
    }

    return (
        <nav className="text-base text-gray-600 font-bold mb-4">
            <ol className="flex flex-wrap items-center">
                {path.map((item, index) => (
                    <li key={item.article_menu_id} className="flex items-center">
                        <Link 
                            to={`/article-menu/${item.article_menu_id}`}
                            className="hover:text-blue-800"
                        >
                            {item.title}
                        </Link>
                        {index < path.length - 1 && (
                            <span className="mx-2 text-gray-400">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
} 