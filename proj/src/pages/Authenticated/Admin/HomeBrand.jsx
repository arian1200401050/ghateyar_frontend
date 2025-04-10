import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

export default function HomeBrandPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHomeBrands = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/home-brand/admin/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
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
        fetchHomeBrands();
    }, []);

    const columns = [
        { key: 'brand', label: 'برند', elementType: 'ref', showInList },
        { 
            key: 'is_active', label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر',
            showInList
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
                pkColumn="home_brand_uuid"
                endpoint="/home-brand"
                onDataChange={fetchHomeBrands}
            />
        </div>
    );
};