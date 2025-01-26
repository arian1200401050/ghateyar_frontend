import MainSlider from "../../components/Home/mainSlider.js";
import BrandsBar from "../../components/Home/brandsSection.js";
import CategoriesSection from "../../components/Home/categoriesBar.js";
import SuggestedProductsCarousel from "../../components/Home/suggestedProductsCarousel.js";
import SuggestedArticlesCarousel from "../../components/Home/suggestedArticlesCarousel.js";
import ArticlesCarousel from "../../components/Home/suggestedArticlesCarousel.js";

export default function HomePage() {
    return (
        <div id="home" className="mx-3 main-container">
            <MainSlider />
            <CategoriesSection />
            <BrandsBar />
            <SuggestedArticlesCarousel />
            <SuggestedProductsCarousel />
        </div>
    );
}
