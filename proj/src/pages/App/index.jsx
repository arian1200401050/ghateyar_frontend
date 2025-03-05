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
import Test from "#src/pages/Test/index.jsx";

// Import public styles
import "#src/styles/main.scss";
import "#src/styles/main.css";

const AppWrapper = styled.div.attrs({ className: "app-wrapper" })`
    position: relative;
    height: max(100vh);
`;

const MainContainer = styled.div.attrs({ className: "main-container" })`
    position: relative;
`

function Layout({ children }) {  
    return (  
        <AppWrapper>  
            <Header />  
            <MainContainer>
                {children}
            </MainContainer>  
            <Footer />  
        </AppWrapper>  
    );  
};  

export default function App() {
    return (
        <Layout>
            <Helmet>
                <link rel="canonical" href={config.BASE_URL} />
                <title>...</title>    
            </Helmet>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/menu/*" element={<MenuPage />} />
                    <Route path="/product/*" element={<ProductPage />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
