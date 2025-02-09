import AboutUs from './aboutUs.jsx';
import LogoArea from './logoArea.jsx';

export default function Footer () {
    return (  
        <footer id="footer" className="position-absolute end-0 start-0 pt-3 pb-3 px-6 mt-5 bg-gray-1">
            <div className="d-flex justify-content-start">
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