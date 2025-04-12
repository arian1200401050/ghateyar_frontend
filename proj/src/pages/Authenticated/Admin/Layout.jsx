import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '#src/context/AuthContext';
import { useAdmin } from '#src/context/AdminContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const { isSidebarOpen, toggleSidebar } = useAdmin();
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
            <div className={`${isSidebarOpen ? 'p-5 overflow-y-auto' : 'py-5 px-6'} fixed z-30 h-screen bg-primary-500 text-white `}>
                <div className={`${isSidebarOpen ? 'w-76' : 'w-0'} flex flex-col overflow-hidden transition-all duration-300 overflow-y-auto`} style={{ height: 'calc(100% - 1rem)' }}>
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
                <button
                    onClick={toggleSidebar}
                    className={`${isSidebarOpen ? 'right-74' : 'right-1'} fixed top-4 z-30 p-2 rounded-md bg-primary-500 text-white hover:bg-white hover:text-gray-900 text-2xl transition-all duration-300 cursor-pointer`}
                >
                    {isSidebarOpen ? '→' : '←'}
                </button>
            </div>
            <div className={`flex-1 ${isSidebarOpen ? 'mr-84' : 'mr-10'} p-5 transition-all duration-300`}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout; 