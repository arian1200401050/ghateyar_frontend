// Import all the third party stuff
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

// Import necessary pages and components
import config from "#src/config.js";
import Header from "#src/plugins/Header/index.jsx";
import Footer from "#src/plugins/Footer/index.jsx";
import HomePage from "#src/pages/Home/index.jsx";
import NotFoundPage from "#src/pages/NotFound/index.jsx";
import MenuPage from "#src/pages/Menu/index.jsx";
import ProductPage from "#src/pages/Product/index.jsx";
import TestPage from "#src/pages/Test/index.jsx";

// Import public styles
import "#src/resources/css/main.css";

const AppWrapper = styled.div`
    position: relative;
    height: max(100vh);
`;

const MainContainer = styled.div`
    position: relative;
`

function Layout({ children }) {  
    return (  
        <AppWrapper className="app-wrapper">  
            <Header />  
            <MainContainer className="main-container">
                {children}
            </MainContainer>  
            <Footer />  
        </AppWrapper>  
    );  
};  

export default function App() {
    return (
        <BrowserRouter>
            <Helmet>
                <link rel="canonical" href={config.BASE_URL} />
                <link rel="icon" href={`${config.MEDIA_ROOT}/${config.FAVICON}`} />
                <title>{config.SITE_TITLE}</title>    
            </Helmet>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/menu/*" element={<MenuPage />} />
                    <Route path="/product/*" element={<ProductPage />} />
                    <Route path="/__test" element={<TestPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
