import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '#src/plugins/Admin/CRUDTable';
import config from '#src/config';

export default function BrandPage() {
    const listColumns = [
        { 
            key: 'title', 
            label: 'عنوان',
            render: (item) => <span>{item.title}</span>
        },
        { 
            key: 'logo', 
            label: 'لوگو',
            render: (item) => (
                item.logo ? <img src={item.logo} alt={item.title} style={{ width: '10rem' }} /> : '-'
            )
        },
        { 
            key: 'is_original', 
            label: 'اصلی',
            render: (item) => item.is_original ? 'بله' : 'خیر'
        },
    ];

    const formColumns = [
        { 
            key: 'title', 
            label: 'عنوان',
            elementType: 'text'
        },
        { 
            key: 'description', 
            label: 'توضیحات',
            elementType: 'textarea'
        },
        { 
            key: 'logo', 
            label: 'لوگو',
            elementType: 'image',
            multiple: false
        },
        { 
            key: 'is_original', 
            label: 'اصلی',
            elementType: 'checkbox'
        },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' }
    ];

    return (
        <div>
            <Helmet>
				<title>مدیریت برندها</title>    
			</Helmet>
            <h1>مدیریت برندها</h1>
            <CRUDTable
                title="برند"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="brand_uuid"
                endpoint="api/v1/public/admin/brand"
            />
        </div>
    );
}