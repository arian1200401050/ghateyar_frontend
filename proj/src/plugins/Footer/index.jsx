import {useRef, useEffect} from 'react';

import config from '#src/config.js';
import { useScreenWidth } from '#src/context/ScreenWidthContext';

const footer = {
    "aboutUs": `شرکت قطعه یار از سال 1403 با هدف بخش مویرگی قطعات لوازم خانگی و کولر فعالیت خود را آغاز کرده است و سعی در ارائه سبد متنوع در هر دو حوزه قطعات محصولات خانگی و کولر دارد.`,
    "address": "خیابان جمهوری، ساختمان آلومینوم، طبقه 4، واحد 410",
    "phone": "0912 388 70 38",
    "email": "ghateyar@gmail.com",
    "instagram": {"title": "ghate_yar", "url": "https://instagram.com/ghate_yar"},
    "telegram": {},
}

function SocialMediaButtons () {
    return (
        <div className="mt-8 pr-10 md:!pr-8">
            <ul className="flex gap-x-8 md:!gap-x-4">
                <li>
                    <a href={footer.instagram.url} alt={footer.instagram.title}>
                        <span className="w-0 h-0 p-5 md:!p-4 block cursor-pointer bg-[auto_85%] bg-center bg-no-repeat" 
                            style={{backgroundImage: "url('/icon/instagram.svg')"}}></span>
                    </a>
                </li>
                <li>
                    <a href={footer.telegram.url} alt={footer.telegram.title}>
                        <span className="w-0 h-0 p-5 md:!p-4 block cursor-pointer bg-[auto_100%] bg-center bg-no-repeat" 
                            style={{backgroundImage: "url('/icon/telegram.svg')"}}></span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

function AboutUs () {
    const aboutUsParagraph = useRef(null);
    const { screenWidth, isMobile } = useScreenWidth();

    useEffect(() => {
        aboutUsParagraph.current.innerHTML = footer.aboutUs.replace(/\n/g, '<br>')
    }, [])

    return (
        <div>
            <div >
                <img src={`${config.MEDIA_ROOT}/${config.LOGO_SECONDARY}`} alt={config.SITE_TITLE}
                    className="w-52" />
            </div>
            <div className="mt-8 px-2 md:!p-0">
                <p className="w-full text-justify text-xl/12 md:!text-base/8"
                    ref={aboutUsParagraph}
                >
                </p>
            </div>
            { !isMobile && ( <SocialMediaButtons />) }
        </div>
    )
}

function ContactUs () {
    const { screenWidth, isMobile } = useScreenWidth();

    return (
        <div>
            <div className="mt-8 md:!m-0">
                <h4 className="font-bold text-2xl md:!text-lg">تماس با ما</h4>
            </div>
            <div className="mt-4">
                <ul>
                    <li className="mt-8 flex text-xl md:!text-base leading-10 md:!leading-6">
                        <span className="ml-6 after:content-[':'] after:relative after:right-2 font-semibold">نشانی</span>
                        <span className="">{footer.address}</span>
                    </li>
                    <li className="mt-4 flex text-xl md:!text-base leading-10 md:!leading-6">
                        <span className="ml-6 after:content-[':'] after:relative after:right-2 font-semibold">تلفن</span>
                        <span className="" dir="ltr">{footer.phone}</span>
                    </li>
                    <li className="mt-4 flex text-xl md:!text-base leading-10 md:!leading-6">
                        <span className="ml-6 after:content-[':'] after:relative after:right-2 font-semibold">ایمیل</span>
                        <span className="">{footer.email}</span>
                    </li>
                </ul>
            </div>
            { isMobile && (<SocialMediaButtons />)}
        </div>
    )
}

export default function Footer () {
    return (  
        <footer id="footer" 
            className="absolute end-0 start-0 pt-10 pb-12 px-2 lg:!px-10 md:!pt-24 md:!pb-20 md:!px-32 mt-5 bg-primary-400 text-white"
            style={{boxShadow: "0 -1px 8px var(--color-gray-300)"}}>
            <div className="mx-auto max-w-(--main-section-full-width) flex flex-col md:!flex-row justify-start">
                <div className="md:!w-160">
                    <AboutUs />
                </div>
                <div className="mx-2 md:!mx-auto">
                    <ContactUs />
                </div>
            </div>
        </footer>
    );
};