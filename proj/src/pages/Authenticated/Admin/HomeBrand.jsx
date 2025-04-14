import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

export default function HomeBrandPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefData = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/public/brand/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const brands = {
                "pkColumn": "brand_uuid",
                "options": response.data.map(item => (
                    {
                        "brand_uuid":item.brand_uuid, 
                        "title": `${item.brand_id}: ${item.title}`
                    }   
                ))
            };
            setBrands(brands);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefData();
    }, []);

    const listColumns = [
        { 
            key: 'brand', 
            label: 'برند',
            render: (item) => item.brand ? `${item.brand.brand_id}: ${item.brand.title}` : '-'
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
            key: 'brand', 
            label: 'برند',
            elementType: 'select',
            ref: 'brands'
        },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
        { key: 'order', label: 'ترتیب', elementType: 'text' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت برندهای صفحه اصلی</h1>
            <CRUDTable
                title="برند صفحه اصلی"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="home_brand_uuid"
                endpoint="api/v1/public/admin/home-brand"
                refData={{ brands }}
            />
        </div>
    );
}