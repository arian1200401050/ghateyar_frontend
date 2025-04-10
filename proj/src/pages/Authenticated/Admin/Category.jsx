import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/category/`);
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns = [
        { key: 'id', label: 'شناسه' },
        { key: 'name', label: 'نام' },
        { key: 'description', label: 'توضیحات' },
        { key: 'parent', label: 'دسته‌بندی والد', ref: 'categories' },
        { key: 'image', label: 'تصویر', render: (item) => (
            item.image ? <img src={item.image} alt={item.name} style={{ width: '50px' }} /> : '-'
        )},
        { key: 'is_active', label: 'فعال', render: (item) => item.is_active ? 'بله' : 'خیر' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت دسته‌بندی‌ها</h1>
            <CRUDTable
                title="دسته‌بندی"
                columns={columns}
                data={categories}
                endpoint="/category"
                refData={{ categories }}
                onDataChange={fetchCategories}
            />
        </div>
    );
};

export default CategoryPage; 