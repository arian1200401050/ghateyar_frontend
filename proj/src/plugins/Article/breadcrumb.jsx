import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleBreadcrumb({ path }) {
    if (!path || !Array.isArray(path)) {
        return null;
    }

    return (
        <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex flex-wrap items-center">
                <li className="flex items-center">
                    <Link to="/" className="hover:text-primary-500">
                        خانه
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                </li>
                {path.map((item, index) => (
                    <li key={item.menu_id} className="flex items-center">
                        <Link 
                            to={`/menu/${item.menu_id}`}
                            className="hover:text-primary-500"
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