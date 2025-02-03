import './styles/index.scss';

import MainSlider from "../../components/Home/mainSlider.js";
import BrandsBar from "../../components/Home/brandsSection.js";
import CategoriesSection from "../../components/Home/categoriesBar.js";
import SuggestedProductsRegal from "../../components/Home/suggestedProductsRegal.js";
import SuggestedArticlesRegal from "../../components/Home/suggestedArticlesRegal.js";


export default function HomePage() {
    return (
        <div id="home" className="mx-3 px-6 main-container">
            <MainSlider />
            <CategoriesSection />
            <BrandsBar />
            <SuggestedArticlesRegal />
            <SuggestedProductsRegal />
        </div>
    );
}
