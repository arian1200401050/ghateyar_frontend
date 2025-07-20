import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const ArticlePage = () => {
    const [categories, setCategories] = useState([]);
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefData = async () => {
        try {
            const [categoriesRes, menusRes] = await Promise.all([
                axios.get(`${config.BACKEND_URL}/api/v1/public/category/`),
                axios.get(`${config.BACKEND_URL}/api/v1/public/admin/menu/select_combobox/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            ]);
            // reformat the response data to be used in the select element
            const categories = {
                "pkColumn": "category_uuid",
                "options": categoriesRes.data.map(item => (
                    {
                        "category_uuid":item.category_uuid, 
                        "title": item.title
                    }   
                ))
            };
            const menus = {
                "pkColumn": "menu_uuid",
                "options": menusRes.data.map(item => (
                    {
                        "article_menu_uuid":item.article_menu_uuid, 
                        "title": `${item.parent ? item.parent.title : '#'} -> ${item.title}`
                    }   
                ))
            };
            setCategories(categories);
            setMenus(menus);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reference data:', error);
            setLoading(false);
        }
    };

    const fetchAttributes = async (articleTypeId) => {
        try {
            const response = await axios.get(
                `${config.BACKEND_URL}/api/v1/article/article-type/${articleTypeId}/attribute`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching attributes:', error);
        }
    };

    useEffect(() => {
        fetchRefData();
    }, []);

    const listColumns = [
        { key: 'title', label: 'نام' },
        { 
            key: 'parent', label: 'منوی والد', 
            render: (item) => item.menu ? `${item.menu.article_menu_id}: ${item.menu.title}` : '-' 
        },
        {
            key: 'read_time', label: 'مدت زمان مطالعه', 
            render: (item) => item.read_time.toLocaleString() + ' دقیقه' 
        },
        { 
            key: 'image', label: 'تصویر اصلی', 
            render: (item) => (
                item.banner ? <img src={item.banner} alt={item.title} style={{ width: '200px' }} /> : '-'
            )
        },
        { 
            key: 'is_active', 
            label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر' 
        }
    ];

    const formColumns = [
        { key: 'title', label: 'نام', elementType: 'text' },
        { key: 'menu', label: 'منو', elementType: 'select', ref: 'menus' },
        { key: 'banner', label: 'تصویر اصلی', elementType: 'image', multiple: false },
        // { key: 'description', label: 'توضیحات', elementType: 'wordpad' },
        { key: 'interview', label: 'معرفی', elementType: 'wordpad' },
        { key: 'content', label: 'متن اصلی', elementType: 'wordpad' },
        { 
            key: 'category_set', 
            label: 'دسته‌بندی',
            elementType: 'select',
            ref: 'categories',
            isMultiple: true
        },
        { key: 'read_time', label: 'مدت زمان مطالعه', elementType: 'text' },
        { key: 'score', label: 'امتیاز', elementType: 'text' },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <Helmet>
				<title>مدیریت مقالات</title>    
			</Helmet>
            <h1>مدیریت مقالات</h1>
            <CRUDTable
                title="مقاله"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="article_uuid"
                isGrid={true}
                endpoint="api/v1/article/admin/article"
                refData={{ categories, menus }}
            />
        </div>
    );
};

export default ArticlePage; 