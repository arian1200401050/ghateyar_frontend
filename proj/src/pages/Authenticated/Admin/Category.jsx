import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

const CategoryPage = () => {
    const listColumns = [
        { key: 'title', label: 'عنوان' },
        { 
            key: 'logo', 
            label: 'لوگو', 
            render: (item) => (
                item.logo ? <img src={item.logo} alt={item.name} className='w-40 max-h-16 object-contain' /> : '-'
            )
        },
    ];

    const formColumns = [
        { key: 'title', label: 'عنوان', elementType: 'text' },
        { key: 'description', label: 'توضیحات', elementType: 'textarea' },
        { key: 'logo', label: 'لوگو', elementType: 'image', multiple: false },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
    ];

    return (
        <div>
            <Helmet>
				<title>مدیریت دسته بندی ها</title>    
			</Helmet>
            <h1>مدیریت دسته‌بندی‌ها</h1>
            <CRUDTable
                title="دسته‌بندی"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="category_uuid"
                endpoint="api/v1/public/admin/category"
            />
        </div>
    );
};

export default CategoryPage; 