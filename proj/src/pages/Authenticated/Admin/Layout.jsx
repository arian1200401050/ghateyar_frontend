import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');

    const menuItems = [
        { path: '/admin/menu', label: 'منو' },
        { path: '/admin/brand', label: 'برند' },
        { path: '/admin/category', label: 'دسته‌بندی' },
        { path: '/admin/home-slider', label: 'اسلایدر صفحه خانه' },
        { path: '/admin/home-category', label: 'دسته بندی‌های صفحه خانه' },
        { path: '/admin/home-brand', label: 'برندهای صفحه خانه' },
        { path: '/admin/product', label: 'محصولات' },
        { path: '/admin/user', label: 'کاربرها' },
    ];

    const handleItemClick = (path) => {
        setActiveItem(path);
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user || !user.is_staff) {
        return <div>دسترسی غیرمجاز</div>;
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-80 fixed p-5 flex flex-col h-screen overflow-y-auto bg-primary-500 text-white">
                <h2 className="text-2xl font-bold">پنل مدیریت</h2>
                <div className="flex flex-col grow-1 gap-4 mt-10">
                    {menuItems.map((item) => (
                        <div
                            key={item.path}
                            className={`p-4 cursor-pointer rounded transition duration-300 text-lg
                                ${activeItem === item.path 
                                    ? 'bg-white text-gray-900' 
                                    : 'hover:bg-white hover:text-gray-900'}`}
                            onClick={() => handleItemClick(item.path)}
                        >
                            {item.label}
                        </div>
                    ))}
                    <div 
                        className="mt-auto p-4 cursor-pointer rounded text-xl transition duration-300 hover:text-white hover:bg-red-500"
                        onClick={handleLogout}
                    >
                        خروج
                    </div>
                </div>
            </div>
            <div className="flex-1 mr-80 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout; 