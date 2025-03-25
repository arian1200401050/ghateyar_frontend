import AboutUs from './aboutUs.jsx';
import LogoArea from './logoArea.jsx';

export default function Footer () {
    return (  
        <footer id="footer" className="absolute end-0 start-0 pt-3 pb-3 px-6 mt-5 border-t-1 border-gray-300 bg-secondary-400">
            <div className="mx-auto max-w-(--main-section-full-width) flex justify-content-start">
                <div className="">
                    <AboutUs />
                </div>
                <div className="mx-auto">
                    <LogoArea />
                </div>
            </div>
        </footer>
    );
};