import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/user/`);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { key: 'id', label: 'شناسه' },
        { key: 'username', label: 'نام کاربری' },
        { key: 'email', label: 'ایمیل' },
        { key: 'first_name', label: 'نام' },
        { key: 'last_name', label: 'نام خانوادگی' },
        { key: 'is_staff', label: 'مدیر', render: (item) => item.is_staff ? 'بله' : 'خیر' },
        { key: 'is_active', label: 'فعال', render: (item) => item.is_active ? 'بله' : 'خیر' }
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <h1>مدیریت کاربران</h1>
            <CRUDTable
                title="کاربر"
                columns={columns}
                data={users}
                endpoint="/user"
                onDataChange={fetchUsers}
            />
        </div>
    );
};

export default UserPage; 