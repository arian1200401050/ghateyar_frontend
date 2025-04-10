import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

export default function BrandPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/brand/admin/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setBrands(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const columns = [
        { 
            key: 'name', label: 'نام', elementType: 'string', showInList: true,
            render: (item) => (<span>{item.brand.title}</span>),
            // ref: 
        },
        { key: 'description', label: 'توضیحات', elementType: 'textarea', showInList: true },
        { key: 'logo', label: 'لوگو',},
        { 
            key: 'is_original', label: 'اصلی', 
            render: (item) => item.is_original ? 'بله' : 'خیر',
            showInList: true
        }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت برندها</h1>
            <CRUDTable
                title="برند"
                columns={columns}
                data={brands}
                pkColumn="brand_uuid"
                endpoint="/brand"
                onDataChange={fetchBrands}
            />
        </div>
    );
};