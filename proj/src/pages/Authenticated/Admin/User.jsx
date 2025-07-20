import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const UserPage = () => {
    const listColumns = [
        { key: 'username', label: 'نام کاربری' },
        { key: 'email', label: 'ایمیل' },
        { key: 'first_name', label: 'نام' },
        { key: 'last_name', label: 'نام خانوادگی' },
        { 
            key: 'is_staff', 
            label: 'کارمند', 
            render: (item) => item.is_staff ? 'بله' : 'خیر' 
        },
        { 
            key: 'is_active', 
            label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر' 
        }
    ];

    const formColumns = [
        { key: 'username', label: 'نام کاربری', elementType: 'text' },
        { key: 'email', label: 'ایمیل', elementType: 'text' },
        { key: 'first_name', label: 'نام', elementType: 'text' },
        { key: 'last_name', label: 'نام خانوادگی', elementType: 'text' },
        { key: 'is_staff', label: 'کارمند', elementType: 'checkbox' },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' }
    ];

    return (
        <div>
            <Helmet>
				<title>مدیریت کاربران</title>    
			</Helmet>
            <h1>مدیریت کاربران</h1>
            <CRUDTable
                title="کاربر"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="user_uuid"
                endpoint="api/v1/user/admin/user"
            />
        </div>
    );
};

export default UserPage; 