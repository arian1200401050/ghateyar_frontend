import { Helmet } from 'react-helmet';

import config from '#src/config.js'
import MainSlider from "#src/plugins/Home/mainSlider.jsx";
import BrandsBar from "#src/plugins/Home/brandsSection.jsx";
import CategoriesSection from "#src/plugins/Home/categoriesBar.jsx";
import SuggestedProductsRegal from "#src/plugins/Home/suggestedProductsRegal.jsx";
import SuggestedArticlesRegal from "#src/plugins/Home/suggestedArticlesRegal.jsx";

import './index.scss';


export default function HomePage() {
    return (
        <div id="home" className="mx-3 px-6 page-wrapper">
            <Helmet>
                <title>{config.SITE_TITLE}</title>    
            </Helmet>

            <MainSlider />
            <CategoriesSection />
            <BrandsBar />
            <SuggestedArticlesRegal />
            {/* <SuggestedProductsRegal /> */}
        </div>
    );
}
