import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

const HomeCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefData = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/public/category/`);
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefData();
    }, []);

    const listColumns = [
        { 
            key: 'category', 
            label: 'دسته‌بندی',
            render: (item) => {
                const category = categories.find(c => c.id === item.category);
                return category ? category.title : '-';
            }
        },
        { 
            key: 'is_active', 
            label: 'فعال',
            render: (item) => item.is_active ? 'بله' : 'خیر'
        },
        { 
            key: 'order', 
            label: 'ترتیب',
            render: (item) => item.order || '-'
        }
    ];

    const formColumns = [
        { 
            key: 'category', 
            label: 'دسته‌بندی',
            elementType: 'select',
            ref: 'categories'
        },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
        { key: 'order', label: 'ترتیب', elementType: 'text' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت دسته‌بندی‌های صفحه اصلی</h1>
            <CRUDTable
                title="دسته‌بندی صفحه اصلی"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="home_category_uuid"
                endpoint="api/v1/public/admin/home-category"
                refData={{ categories }}
            />
        </div>
    );
};

export default HomeCategoryPage; 