import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                axios.get(`${config.BACKEND_URL}/api/v1/product/`),
                axios.get(`${config.BACKEND_URL}/api/v1/category/`),
                axios.get(`${config.BACKEND_URL}/api/v1/brand/`)
            ]);

            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
            setBrands(brandsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { key: 'id', label: 'شناسه' },
        { key: 'name', label: 'نام' },
        { key: 'description', label: 'توضیحات' },
        { key: 'price', label: 'قیمت', render: (item) => item.price.toLocaleString() + ' تومان' },
        { key: 'category', label: 'دسته‌بندی', ref: 'categories' },
        { key: 'brand', label: 'برند', ref: 'brands' },
        { key: 'image', label: 'تصویر', render: (item) => (
            item.image ? <img src={item.image} alt={item.name} style={{ width: '50px' }} /> : '-'
        )},
        { key: 'stock', label: 'موجودی' },
        { key: 'is_active', label: 'فعال', render: (item) => item.is_active ? 'بله' : 'خیر' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت محصولات</h1>
            <CRUDTable
                title="محصول"
                columns={columns}
                data={products}
                endpoint="/product"
                refData={{ categories, brands }}
                onDataChange={fetchData}
            />
        </div>
    );
};

export default ProductPage; 