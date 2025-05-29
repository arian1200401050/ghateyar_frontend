import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import '#src/resources/css/ckeditor__user.css'

export default function ArticleContent({ interview, content }) {
    const interviewRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (interviewRef.current) {
            interviewRef.current.innerHTML = interview;
        }

        if (contentRef.current) {
            contentRef.current.innerHTML = content;
        }
    }, [interview, content])

    return (
        <article className="bg-white rounded-lg shadow-sm p-6">
            {/* Introduction Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    معرفی
                </h2>
                <div 
                    className="prose max-w-none ckeditor--user" 
                    ref={interviewRef}    
                ></div>
            </section>

            {/* Main Content Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    متن مقاله
                </h2>
                <div
                    className="prose max-w-none ckeditor--user"
                    ref={contentRef}
                ></div>
            </section>
        </article>
    );
} 