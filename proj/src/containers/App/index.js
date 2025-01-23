// Import all the third party stuff
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Import necessary containers and components
import config from "../../config.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import HomePage from "../HomePage/index.js";
import NotFoundPage from "../NotFoundPage/index.js";

const AppWrapper = styled.div.attrs({ className: "main-wrapper" })`
    position: relative;
    height: max(100vh);
`;

export default function App() {
    return (
        <AppWrapper>
            <BrowserRouter>
                <Helmet>
                    <html lang="ar" dir="rtl" />
                    <meta charset="utf-8" />
                    <title>{config.SITE_TITLE}</title>
                    <link rel="canonical" href={config.BASE_URL} />
                </Helmet>
                <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AppWrapper>
    );
}
