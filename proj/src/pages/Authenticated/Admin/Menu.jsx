import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = async () => {
        try {
            const menuItemsRes = await axios.get(`${config.BACKEND_URL}/api/v1/public/admin/menu/select_combobox/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // reformat the response data to be used in the select element
            const menuItems = {
                "pkColumn": "menu_uuid",
                "options": menuItemsRes.data.map(item => (
                    {
                        "menu_uuid":item.menu_uuid, 
                        "title": `${item.parent ? item.parent.title : '#'} -> ${item.title}`
                    }   
                ))
            };
            setMenuItems(menuItems);
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
        { key: 'is_active', label: 'فعال', render: (item) => item.is_active ? 'بله' : 'خیر' }
    ];

    const listColumns = [
        { key: 'title', label: 'عنوان' },
        { key: 'order', label: 'ترتیب', },
        { key: 'level', label: 'سطح منو' },
        { 
            key: 'parent', label: 'منوی والد', 
            render: (item) => item.parent ? `${item.parent.menu_id}: ${item.parent.title}` : '-' 
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
        { key: 'parent', label: 'منوی والد', elementType: 'select', ref: 'menuItems' },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1 className='text-xl font-bold'>مدیریت منو</h1>
            <CRUDTable
                title="منو"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="menu_uuid"
                endpoint="api/v1/public/admin/menu"
                refData={{menuItems}}
                onDataChange={fetchMenuItems}
            />
        </div>
    );
};

export default MenuPage; 