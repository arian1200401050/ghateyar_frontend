// Import all the third party stuff
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

// Import necessary pages and components
import config from "#src/config.js";
import { AuthProvider, useAuth } from '#src/context/AuthContext';
import { AdminProvider } from '#src/context/AdminContext';
import { MenuProvider } from '#src/context/MenuContext';

import Header from "#src/plugins/Header/index.jsx";
import Footer from "#src/plugins/Footer/index.jsx";
import NotFoundPage from "#src/pages/NotFound/index.jsx";
import TestPage from "#src/pages/Test/index.jsx";

import HomePage from "#src/pages/Home/index.jsx";
import MenuPage from "#src/pages/Menu/index.jsx";
import ProductPage from "#src/pages/Product/index.jsx";
import ArticlePage from "#src/pages/Article/index.jsx";

import LoginPage from '#src/pages/Authenticated/Login.jsx';
import AdminLayout from '#src/pages/Authenticated/Admin/Layout';
import AdminBrandPage from '#src/pages/Authenticated/Admin/Brand';
import AdminCategoryPage from '#src/pages/Authenticated/Admin/Category';
import AdminMenuPage from '#src/pages/Authenticated/Admin/Menu';
import AdminHomeSliderPage from '#src/pages/Authenticated/Admin/HomeSlider';
import AdminHomeCategoryPage from '#src/pages/Authenticated/Admin/HomeCategory';
import AdminHomeBrandPage from '#src/pages/Authenticated/Admin/HomeBrand';
import AdminProductPage from '#src/pages/Authenticated/Admin/Product';
import AdminArticlePage from '#src/pages/Authenticated/Admin/Article';
import AdminUserPage from '#src/pages/Authenticated/Admin/User';

// Import public styles
import "#src/resources/css/main.css";

const AppWrapper = styled.div`
    position: relative;
    height: max(100vh);
`;

const MainContainer = styled.div`
    position: relative;
`

function FullPageLoader() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <p>Checking authentication...</p>
        </div>
    );
}

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <FullPageLoader />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user?.is_superuser) {
        return <Navigate to="/" />;
    }

    return children;
}

function HeaderFooterLayout() {  
    return (  
        <AppWrapper className="app-wrapper">  
            <Header />  
            <MainContainer className="main-container">
                <Outlet />
            </MainContainer>  
            <Footer />  
        </AppWrapper>  
    );  
};  

function PureLayout() {  
    return (  
        <AppWrapper className="app-wrapper">  
            <MainContainer className="main-container">
                <Outlet />
            </MainContainer>  
        </AppWrapper>  
    );  
};  

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Helmet>
                    <link rel="canonical" href={config.BASE_URL} />
                    <link rel="icon" href={`${config.MEDIA_ROOT}/${config.FAVICON}`} />
                    <title>{config.SITE_TITLE}</title>    
                </Helmet>
                <Routes>
                    {/* Routes with Header + Footer */}
                    <Route element={
                        <MenuProvider>
                            <HeaderFooterLayout />
                        </MenuProvider>
                    }>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/menu/:menuId" element={<MenuPage />} />
                        <Route path="/product/:productId" element={<ProductPage />} />
                        <Route path="/article/:articleId" element={<ArticlePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/__test" element={<TestPage />} />
                        
                        {/* 404 */}
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    {/* Pure layout routes (e.g., admin) */}
                    <Route element={<PureLayout />}>
                        <Route path="/admin" element={
                            <PrivateRoute>
                                <AdminProvider>
                                    <AdminLayout />
                                </AdminProvider>
                            </PrivateRoute>
                        }>
                            <Route path="brand" element={<AdminBrandPage />} />
                            <Route path="category" element={<AdminCategoryPage />} />
                            <Route path="article" element={<AdminArticlePage />} />
                            <Route path="menu" element={<AdminMenuPage />} />
                            <Route path="home-slider" element={<AdminHomeSliderPage />} />
                            <Route path="home-brand" element={<AdminHomeBrandPage />} />
                            <Route path="home-category" element={<AdminHomeCategoryPage />} />
                            <Route path="product" element={<AdminProductPage />} />
                            <Route path="user" element={<AdminUserPage />} />
                            <Route index element={<Navigate to="menu" />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
