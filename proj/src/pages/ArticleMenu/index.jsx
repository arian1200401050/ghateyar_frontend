// src/ArticleMenuPage.js  
import React, { useState, useEffect } from 'react';  
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import config from '#src/config'
import { useArticleMenu } from '#src/context/ArticleMenuContext';
import NavBar from '#src/plugins/ArticleMenu/navBar'
import NotFound from '#src/plugins/Error/NotFound';
import BreadCrumb from '#src/plugins/ArticleMenu/breadCrumb';  
import Badges from '#src/plugins/ArticleMenu/badge';  
import PostCards from '#src/plugins/ArticleMenu/postCard';  


const menuMockData = {
    "menu_uuid": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    "is_deleted": false,
    "menu_id": 9,
    "level": 1,
    "title": "جاروبرقی",
    "description": null,
    "order": 1,
    "is_active": true,
    "parent": null,
    "brand": null
}


const parentMenuMockData = [
    {
        "menu_id": 9,
        "menu_uuid": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
        "title": "جاروبرقی",
        "level": 1,
        "order": 1
    }
]


const subMenuMockData = [
    {
        "menu_uuid": "62247f92-1743-424c-91d4-1a01f028b6bd",
        "is_deleted": false,
        "menu_id": 14,
        "level": 2,
        "title": "فیلتر",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    },
    {
        "menu_uuid": "8cd59f36-5767-4fc8-867e-f306ec4cfecb",
        "is_deleted": false,
        "menu_id": 17,
        "level": 2,
        "title": "خرطومی",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    },
    {
        "menu_uuid": "c5782213-8086-467d-b6d4-dc267ac75424",
        "is_deleted": false,
        "menu_id": 20,
        "level": 2,
        "title": "پاکت",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    },
    {
        "menu_uuid": "d057f08a-32a6-49b6-8a7d-871e2c4f5c42",
        "is_deleted": false,
        "menu_id": 23,
        "level": 2,
        "title": "موتور",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    },
    {
        "menu_uuid": "5019e45e-4463-47a7-ae00-6d6b71f91566",
        "is_deleted": false,
        "menu_id": 26,
        "level": 2,
        "title": "برس",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    },
    {
        "menu_uuid": "a9ab8421-9d0b-4b9c-abb4-e37581711721",
        "is_deleted": false,                                          
        "menu_id": 27,
        "level": 2,
        "title": "زانویی",
        "description": null,
        "order": null,
        "is_active": true,
        "parent": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
    }
]


const postsMockData = [
    {
        "article_uuid": "a5a7c3e9-f917-45ec-ad46-dfbf5be623bb",
        "created_at": "2025-04-17T17:32:48.508419+03:30",
        "updated_at": "2025-05-25T16:24:31.931484+03:30",
        "is_deleted": false,
        "article_id": 10,
        "title": "موتور جاروبرقی",
        "description": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        "is_active": true,
        "created_by": null,
        "updated_by": "11692d1a-f482-41b0-ae7a-2bdc0daa5a0c",
        "product_type": 2,
        "menu": [
            {
                "menu_uuid": "ab73d8d2-eb80-4cae-b0aa-18c8157becca",
                "menu_id": 9,
                "title": "جاروبرقی"
            }
        ],
        "category_set": [
            {
                "category_uuid": "a8c139b5-22ec-4231-92d1-8b078af3b79d",
                "title": "زانویی"
            },
            {
                "category_uuid": "40240af2-206d-43b9-b78b-e165710f266c",
                "title": "خرطومی"
            }
        ],
        "banner": "http://localhost:8000/media/products/images/1_rYleoGj.png"
    }
]



const ArticleMenuPage = () => {  
	// Pagination state  
	const { menuId } = useParams();
    const { menu: menuTree, loading: menuTreeLoading, error: menuTreeError } = useArticleMenu();
    const [ menu, setMenu ] = useState([]);
	const [parentMenus, setParentMenus] = useState([]);
	const [subMenus, setSubMenus] = useState([]);
	const postsPerPage = 12; // Number of items per page  
	const [posts, setPosts] = useState([]);
	const [currentPosts, setCurrentPosts] = useState([]);  
	const [currentPage, setCurrentPage] = useState(1);  
	const [totalPosts, setTotalPosts] = useState(posts.length);  
	const [totalPages, setTotalPages] = useState(Math.ceil(posts.length / postsPerPage));
	const [loadingParentMenus, setLoadingParentMenus] = useState(true);  
	const [errorParentMenus, setErrorParentMenus] = useState(null);    
	const [loadingSubMenus, setLoadingSubMenus] = useState(true);  
	const [errorSubMenus, setErrorSubMenus] = useState(null);    
	const [loadingPosts, setLoadingPosts] = useState(true);  
	const [errorPosts, setErrorPosts] = useState(null);    
	const [loading, setLoading] = useState(true);  
	const [error, setError] = useState(null);    

  	useEffect(() => {

		const fetchData = async (menuId) => {
			try {  
				// const menuRes = await axios.get(`${config.BACKEND_URL}/api/v1/article/menu/${menuId ? `${menuId}/` : ''}`);
				// setMenu(menuRes.data);  
				setMenu(menuMockData);  
				setLoading(false);  
			} catch (err) {  
				setError(err);  
				setLoading(false);  
			} 

			try {  
				// const parentMenusRes = menuId ? await axios.get(`${config.BACKEND_URL}/api/v1/article/menu/path/${menuId}/`) : [];
				// console.log(parentMenusRes)
				// setParentMenus(parentMenusRes.data);  
				setParentMenus(parentMenuMockData);  
				setLoadingParentMenus(false);  
			} catch (err) {  
				setErrorParentMenus(err);  
				setLoadingParentMenus(false);  
			} 

			try {  
				// const subMenusRes = await axios.get(`${config.BACKEND_URL}/api/v1/article/menu/children/${menuId ? `${menuId}/` : ''}`);
				// setSubMenus(subMenusRes.data);  
				setSubMenus(subMenuMockData);  
				setLoadingSubMenus(false);  
			} catch (err) {  
				setErrorSubMenus(err);  
				setLoadingSubMenus(false);  
			}  

			
		};

		fetchData(menuId); 
		setPosts([]);
		fetchPosts();
	}, [menuId])

	const fetchPosts = async () => {
		try {  
			const offset = (currentPage - 1) * postsPerPage;
			// if this page did not fetched fetch it
			if (!posts[offset]) {
				// const newPostsRes = await axios.get(
				// 	`${config.BACKEND_URL}/api/v1/article/article/by-menu/${menuId}/?limit=${postsPerPage}&offset=${offset}`
				// );
				// const updatedPosts = [...posts]
				// for (let i = 0; i < postsPerPage; i++) {  
				// 	updatedPosts[offset + i] = newPostsRes.data[i];
				// } 
				// setPosts(updatedPosts);
				setPosts(postsMockData);
				setLoadingPosts(false)
			}
			
		} catch (err) {  
			console.log(err);
			setErrorPosts(err);  
			setLoadingPosts(false);  
		}  
	}

	// Calculate current posts based on current page  
	useEffect(() => {  
		const startIndex = (currentPage - 1) * postsPerPage;  
		const endIndex = startIndex + postsPerPage;  
		setCurrentPosts(posts.slice(startIndex, endIndex));  
	}, [currentPage, posts]); // Dependency array includes currentPage and posts  

	// Update totalPosts and totalPages in case posts change (for dynamic data)  
	useEffect(() => {  
        // console.log(posts.length)
		setTotalPosts(posts.length);  
		setTotalPages(Math.ceil(posts.length / postsPerPage));  
		setCurrentPage(1);  // Reset to first page when posts change  
	}, [posts]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(`Error loading menu: ${error.message}`);

        return <NotFound>{`منو با شناسه "${menuId}" یافت نشد!`}</NotFound>
    }

    if (!menu) {
        return <div>Menu not found</div>;
    }

  // Handlers for pagination  
	const goToNextPage = () => {  
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));  
	};  

	const goToPreviousPage = () => {  
		setCurrentPage((prev) => Math.max(prev - 1, 1));  
	};  

  	return (  
		<div className="container !flex !flex-row gap-x-4 !mx-auto mt-2 p-4">  
			<Helmet>
				<title>{`مقالات ${menu['title']}`}</title>    
			</Helmet>
            <div className="w-3/12">
                <NavBar menu={menuTree} loading={menuTreeLoading} error={menuTreeError} />
            </div>
            <div className="w-9/12">
                <BreadCrumb 
                    breadcrumbInfo={{items: parentMenus, error: errorParentMenus, loading: loadingParentMenus}} 
                    paginationInfo={{totalPages, postsPerPage, currentPage, setCurrentPage, totalPosts}} 
                />   

                <div className="menu-page__body-section">
                    <Badges badges={subMenus} /> 
                    <PostCards posts={currentPosts} 
                        paginationInfo={{totalPages, postsPerPage, currentPage, setCurrentPage}}
                    />  

                    {/* Pagination Buttons */}  
                    <div className="flex justify-between items-center mt-4">  
                    <button  
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer 
                        ${currentPage === 1 ? 'opacity-50 !cursor-not-allowed' : ''}`}  
                        onClick={goToPreviousPage}  
                        disabled={currentPage === 1}  
                    >  
                        قبلی  
                    </button>  
                    <button  
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer
                        ${currentPage === totalPages ? 'opacity-50 !cursor-not-allowed' : ''}`}  
                        onClick={goToNextPage}  
                        disabled={currentPage === totalPages}  
                    >  
                        بعدی  
                    </button>  
                    </div> 
                </div>
            </div>
		</div>  
	);  
};  

export default ArticleMenuPage;  
