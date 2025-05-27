import { Helmet } from 'react-helmet';

import config from '#src/config.js'
import HomeSlider from "#src/plugins/Home/homeSlider.jsx";
import HomeBrands from "#src/plugins/Home/homeBrands.jsx";
import HomeCategories from "#src/plugins/Home/homeCategories.jsx";
import HomeArticles from "#src/plugins/Home/homeArticles.jsx";
import HomeProducts from "#src/plugins/Home/homeProducts.jsx";


export default function HomePage() {
    return (
        <div id="home" className={`page-wrapper mx-0 px-0 md:mx-3 md:px-6`}>
            <Helmet>
                <title>{config.SITE_TITLE}</title>    
            </Helmet>

            <HomeSlider />
            <HomeCategories />
            <HomeBrands />
            <HomeArticles />
            {/* <HomeProducts /> */}
        </div>
    );
}
