import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

const ArticleMenuPage = () => {
    const [articleMenuItems, setArticleMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = async () => {
        try {
            const articleMenuItemsRes = await axios.get(`${config.BACKEND_URL}/api/v1/article/admin/article-menu/select_combobox/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // reformat the response data to be used in the select element
            const articleMenuItems = {
                "pkColumn": "articleMenu_uuid",
                "options": articleMenuItemsRes.data.map(item => (
                    {
                        "article_menu_uuid":item.article_menu_uuid, 
                        "title": `${item.parent ? item.parent.title : '#'} -> ${item.title}`
                    }   
                ))
            };
            setArticleMenuItems(articleMenuItems);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching article_menu items:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const listColumns = [
        { key: 'article_menu_id', label: 'شناسه' },
        { key: 'title', label: 'عنوان' },
        { key: 'order', label: 'ترتیب', },
        { key: 'level', label: 'سطح منو' },
        { 
            key: 'parent', label: 'منوی والد', 
            render: (item) => item.parent ? `${item.parent.article_menu_id}: ${item.parent.title}` : '-' 
        },
        { 
            key: 'is_active', 
            label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر' 
        }
    ];

    const formColumns = [
        { key: 'title', label: 'عنوان', elementType: "text" },
        { key: 'description', label: 'توضیحات', elementType: "textarea" },
        { key: 'order', label: 'ترتیب', elementType: "text" },
        { key: 'parent', label: 'منوی والد', elementType: 'select', ref: 'articleMenuItems' },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <Helmet>
				<title>مدیریت منو مقالات</title>    
			</Helmet>
            <h1 className='text-xl font-bold'>مدیریت منو مقالات</h1>
            <CRUDTable
                title="منو"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="article_menu_uuid"
                endpoint="api/v1/article/admin/article-menu"
                refData={{articleMenuItems}}
                onDataChange={fetchMenuItems}
            />
        </div>
    );
};

export default ArticleMenuPage; 