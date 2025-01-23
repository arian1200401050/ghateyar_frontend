import MainSlider from "../../components/Home/mainSlider.js";
import BrandBar from "../../components/Home/brandsBar.js";
import CategoriesSection from "../../components/Home/categoriesSection.js";
import SuggestedProductsCarousel from "../../components/Home/suggestedProductsCarousel.js";

export default function HomePage() {
    return (
        <div id="home" className="my-2 mx-3 main-container">
            <MainSlider />
            <BrandBar />
            <CategoriesSection />
            <SuggestedProductsCarousel />
        </div>
    );
}
