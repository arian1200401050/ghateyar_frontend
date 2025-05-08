import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

const HomeSliderPage = () => {
    const listColumns = [
        { key: 'title', label: 'عنوان' },
        { 
            key: 'image', 
            label: 'تصویر',
            render: (item) => (
                item.image ? <img src={item.image} alt={item.title} style={{ width: '10rem' }} /> : '-'
            )
        },
        { 
            key: 'url', 
            label: 'لینک',
            render: (item) => item.url || '-'
        },
        { 
            key: 'order', 
            label: 'ترتیب',
            render: (item) => item.order || '-'
        },
        { 
            key: 'is_active', 
            label: 'فعال',
            render: (item) => item.is_active ? 'بله' : 'خیر'
        },
    ];

    const formColumns = [
        { key: 'title', label: 'عنوان', elementType: 'text' },
        { key: 'description', label: 'توضیحات', elementType: 'textarea' },
        { key: 'image', label: 'تصویر', elementType: 'image', multiple: false },
        { key: 'url', label: 'لینک', elementType: 'text' },
        { key: 'order', label: 'ترتیب', elementType: 'text' },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
    ];

    return (
        <div>
            <h1>مدیریت اسلایدر صفحه اصلی</h1>
            <CRUDTable
                title="اسلاید"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="home_slider_uuid"
                endpoint="api/v1/public/admin/home-slider"
            />
        </div>
    );
};

export default HomeSliderPage; 