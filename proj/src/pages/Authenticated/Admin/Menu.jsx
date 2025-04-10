import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/public/admin/menu/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setMenuItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const columns = [
        { key: 'title', label: 'عنوان', showInList: true },
        { key: 'level', label: 'سطح منو', showInList: true },
        { key: 'order', label: 'ترتیب', showInList: true },
        { key: 'parent', label: 'منوی والد', ref: 'menuItems' },
        { key: 'is_active', label: 'فعال', render: (item) => item.is_active ? 'بله' : 'خیر' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت منو</h1>
            <CRUDTable
                title="منو"
                columns={columns}
                data={menuItems}
                endpoint="/menu"
                refData={{ menuItems }}
                onDataChange={fetchMenuItems}
            />
        </div>
    );
};

export default MenuPage; 