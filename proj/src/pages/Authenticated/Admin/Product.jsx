import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CRUDTable from '../../../plugins/Admin/CRUDTable';
import config from '../../../config';

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefData = async () => {
        try {
            const [categoriesRes, brandsRes, productTypesRes, menusRes] = await Promise.all([
                axios.get(`${config.BACKEND_URL}/api/v1/public/category/`),
                axios.get(`${config.BACKEND_URL}/api/v1/public/brand/`),
                axios.get(`${config.BACKEND_URL}/api/v1/product/product-type/`),
                axios.get(`${config.BACKEND_URL}/api/v1/public/admin/menu/select_combobox/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            ]);
            // reformat the response data to be used in the select element
            const categories = {
                "pkColumn": "category_uuid",
                "options": categoriesRes.data.map(item => (
                    {
                        "category_uuid":item.category_uuid, 
                        "title": item.title
                    }   
                ))
            };
            const brands = {
                "pkColumn": "brand_uuid",
                "options": brandsRes.data.map(item => (
                    {
                        "brand_uuid":item.brand_uuid, 
                        "title": item.title
                    }   
                ))
            };
            const productTypes = {
                "pkColumn": "product_type_id",
                "options": productTypesRes.data.map(item => (
                    {
                        "product_type_id":item.product_type_id, 
                        "title": item.title
                    }   
                ))
            };
            const menus = {
                "pkColumn": "menu_uuid",
                "options": menusRes.data.map(item => (
                    {
                        "menu_uuid":item.menu_uuid, 
                        "title": `${item.parent ? item.parent.title : '#'} -> ${item.title}`
                    }   
                ))
            };
            setCategories(categories);
            setBrands(brands);
            setProductTypes(productTypes);
            setMenus(menus);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reference data:', error);
            setLoading(false);
        }
    };

    const fetchAttributes = async (productTypeId) => {
        try {
            const response = await axios.get(
                `${config.BACKEND_URL}/api/v1/product/product-type/${productTypeId}/attribute`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching attributes:', error);
        }
    };

    useEffect(() => {
        fetchRefData();
    }, []);

    const listColumns = [
        { key: 'title', label: 'نام' },
        { 
            key: 'product_type', label: 'نوع محصول',
            render: (item) => item.product_type ? `${item.product_type.title}` : '-' 
        },
        { 
            key: 'parent', label: 'منوی والد', 
            render: (item) => item.menu ? `${item.menu.menu_id}: ${item.menu.title}` : '-' 
        },
        {
            key: 'price', label: 'قیمت', 
            render: (item) => item.price.toLocaleString() + ' تومان' 
        },
        { 
            key: 'image', label: 'تصویر', 
            render: (item) => (
                item.images ? <img src={item.images?.[0]?.image} alt={item.title} style={{ width: '50px' }} /> : '-'
            )
        },
        { 
            key: 'is_active', 
            label: 'فعال', 
            render: (item) => item.is_active ? 'بله' : 'خیر' 
        }
    ];

    const formColumns = [
        { key: 'title', label: 'نام', elementType: 'text' },
        { key: 'price', label: 'قیمت', elementType: 'text' },
        { key: 'description', label: 'توضیحات', elementType: 'textarea' },
        { 
            key: 'product_type', 
            label: 'نوع محصول', 
            elementType: 'select', 
            ref: 'productTypes' 
        },
        { 
            key: 'category_set', 
            label: 'دسته‌بندی',
            elementType: 'select',
            ref: 'categories',
            isMultiple: true
        },
        { 
            key: 'brand_set', 
            label: 'برند',
            elementType: 'select',
            ref: 'brands',
            isMultiple: true
        },
        { key: 'menu', label: 'منو', elementType: 'select', ref: 'menus' },
        { key: 'images', label: 'تصاویر', elementType: 'image', isMultiple: true },
        { key: 'is_active', label: 'فعال', elementType: 'checkbox' },
        {
            key: 'attributes',
            label: 'ویژگی‌ها',
            elementType: 'group',
            groups: {
                primary: {
                    label: 'اصلی',
                    columns: [
                        { key: '1', label: 'وزن', elementType: 'text' },
                        { key: '2', label: 'جنس', elementType: 'text' },
                    ],
                },
                secondary: {
                    label: 'فرعی',
                    columns: [
                        { key: '3', label:  'دور موتور در دقیقه', elementType: 'text' },
                    ]
                }
            }
        },
    ];

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <Helmet>
				<title>مدیریت محصولات</title>    
			</Helmet>
            <h1>مدیریت محصولات</h1>
            <CRUDTable
                title="محصول"
                listColumns={listColumns}
                formColumns={formColumns}
                pkColumn="product_uuid"
                isGrid={true}
                endpoint="api/v1/product/admin/product"
                refData={{ categories, brands, productTypes, menus }}
            />
        </div>
    );
};

export default ProductPage; 