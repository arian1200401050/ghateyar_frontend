import AboutUs from './aboutUs.js';
import LogoArea from './logoArea.js';

export default function Footer () {
    return (  
        <footer id="footer" className="position-absolute bottom-m100 end-0 start-0 pt-3 pb-3 px-5 bg-gray-1">
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