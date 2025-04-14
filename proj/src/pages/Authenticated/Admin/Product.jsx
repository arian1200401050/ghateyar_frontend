import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefData = async () => {
        try {
            const [categoriesRes, brandsRes] = await Promise.all([
                axios.get(`${config.BACKEND_URL}/api/v1/category/admin`),
                axios.get(`${config.BACKEND_URL}/api/v1/brand/admin`)
            ]);

            setCategories(categoriesRes.data);
            setBrands(brandsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reference data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefData();
    }, []);

    const listColumns = [
        { key: 'name', label: 'نام' },
        { 
            key: 'price', 
            label: 'قیمت', 
            render: (item) => item.price.toLocaleString() + ' تومان' 
        },
        { 
            key: 'category', 
            label: 'دسته‌بندی',
            render: (item) => categories.find(c => c.id === item.category)?.name || '-'
        },
        { 
            key: 'brand', 
            label: 'برند',
            render: (item) => brands.find(b => b.id === item.brand)?.name || '-'
        },
        { 
            key: 'image', 
            label: 'تصویر', 
            render: (item) => (
                item.image ? <img src={item.image} alt={item.name} style={{ width: '50px' }} /> : '-'
            )
        },
        { 
            key: 'is_active', 
            label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر' 
        }
    ];

    const formColumns = [
        { key: 'name', label: 'نام', elementType: 'text' },
        { key: 'description', label: 'توضیحات', elementType: 'textarea' },
        { key: 'price', label: 'قیمت', elementType: 'text' },
        { 
            key: 'category', 
            label: 'دسته‌بندی',
            elementType: 'select',
            ref: 'categories'
        },
        { 
            key: 'brand', 
            label: 'برند',
            elementType: 'select',
            ref: 'brands'
        },
        { key: 'image', label: 'تصویر', elementType: 'image', multiple: true },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت محصولات</h1>
            <CRUDTable
                title="محصول"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="id"
                endpoint="api/v1/product/admin/product"
                refData={{ categories, brands }}
            />
        </div>
    );
};

export default ProductPage; 