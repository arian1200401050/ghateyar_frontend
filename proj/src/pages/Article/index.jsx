import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import config from '#src/config.js';
import ArticleBanner from '#src/plugins/Article/banner';
import ArticleBreadcrumb from '#src/plugins/Article/breadcrumb';
import ArticleStats from '#src/plugins/Article/stats';
import ArticleSidebar from '#src/plugins/Article/sidebar';
import ArticleContent from '#src/plugins/Article/content';
import ArticleComments from '#src/plugins/Article/comments';


const mockArticle = {
    id: 1,
    title: 'راهنمای تعمیر و نگهداری یخچال فریزر',
    category: 'تعمیرات',
    banner: `${config.MEDIA_ROOT}/article/1/thumbnail.jpg`,
    author: {
        name: 'علی محمدی',
        avatar: '/images/avatar.jpg'
    },
    date: '۱۴۰۲/۱۲/۱۵',
    readTime: '۸ دقیقه',
    stats: {
        comments: 24,
        score: 4.8,
        views: 1250
    },
    introduction: 'در این مقاله به بررسی نکات مهم در تعمیر و نگهداری یخچال فریزر می‌پردازیم. با رعایت این نکات می‌توانید عمر دستگاه خود را افزایش داده و از هزینه‌های اضافی تعمیرات جلوگیری کنید.',
    content: [
        {
            type: 'heading',
            id: 'section-1',
            content: 'نکات مهم نگهداری یخچال فریزر'
        },
        {
            type: 'paragraph',
            content: 'نگهداری صحیح یخچال فریزر می‌تواند به افزایش طول عمر آن کمک کند. در ادامه به مهمترین نکات نگهداری اشاره می‌کنیم.'
        },
        {
            type: 'list',
            items: [
                'تمیز کردن منظم کویل‌های کندانسور',
                'بررسی و تعویض به موقع فیلتر آب',
                'تنظیم دمای مناسب برای هر بخش',
                'بستن درب به درستی و بررسی واشرها'
            ]
        },
        {
            type: 'image',
            url: `${config.BACKEND_URL}/media/products/images/موتور_آبمیوه_گیری_ناسیونال_176___1060497_bvHU9Mi.png`,
            alt: 'نگهداری یخچال فریزر',
            caption: 'نمونه‌ای از کویل‌های کندانسور که نیاز به تمیز کردن دارند'
        },
        {
            type: 'product_link',
            product_id: 123,
            title: 'فیلتر تصفیه آب یخچال سامسونگ',
            image: `${config.BACKEND_URL}/media/products/images/موتور_آبمیوه_گیری_ناسیونال_176___1060497.png`,
            price: 850000
        }
    ],
    tableOfContents: [
        {
            id: 'section-1',
            title: 'نکات مهم نگهداری یخچال فریزر',
            children: [
                { id: 'section-1-1', title: 'تمیز کردن کویل‌ها' },
                { id: 'section-1-2', title: 'تعویض فیلتر' }
            ]
        }
    ],
    relatedVideos: [
        {
            id: 1,
            title: 'آموزش تعمیر یخچال فریزر',
            thumbnail: `${config.MEDIA_ROOT}/video/1/thumbnail.jpg`,
            duration: '15:30'
        }
    ],
    relatedProducts: [
        {
            id: 123,
            title: 'فیلتر تصفیه آب یخچال سامسونگ',
            image: `${config.BACKEND_URL}/media/products/images/موتور_آبمیوه_گیری_ناسیونال_176_باکالیتی___1060539_8ON0oWZ.png`,
            price: 850000
        }
    ]
};

export default function ArticlePage() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {  
                // const articleRes = await axios.get(`${config.BACKEND_URL}/api/v1/article/article/${articleId}/`);
                // setArticle(articleRes.data);  
                setArticle(mockArticle);  
                setLoading(false);  
            } catch (err) {  
                setError(err);  
                setLoading(false);  
            }  
        };

        fetchArticle(); 
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(`Error loading article: ${error.message}`);

        return <NotFound>{`مقاله با شناسه "${articleId}" یافت نشد!`}</NotFound>
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="main-container !w-(--main-section-full-width) mx-auto mt-4 pb-5 rounded-md shadow-sm shadow-gray-300">
            <Helmet>
                <title>{`مقاله ${article.title}`}</title>    
            </Helmet>

            <ArticleBanner 
                title={article.title}
                category={article.category}
                author={article.author}
                date={article.date}
                readTime={article.readTime}
                image={article.banner}
            />
            
            <div className="mx-auto px-8 py-8">
                <ArticleBreadcrumb 
                    category={article.category}
                    title={article.title}
                />
                
                <div className="mt-6">
                    <ArticleStats stats={article.stats} />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <ArticleContent 
                            introduction={article.introduction}
                            content={article.content}
                        />
                    </div>
                    
                    <div className="lg:col-span-4">
                        <ArticleSidebar 
                            tableOfContents={article.tableOfContents}
                            relatedVideos={article.relatedVideos}
                            relatedProducts={article.relatedProducts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
