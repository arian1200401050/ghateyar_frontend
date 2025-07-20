// src/MenuPage.js  
import React, { useState, useEffect } from 'react';  
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import config from '#src/config'
import NotFound from '#src/plugins/Error/NotFound';
import Breadcrumb from '#src/plugins/Menu/breadCrumb';  
import Badges from '#src/plugins/Menu/badge';  
import PostCards from '#src/plugins/Menu/postCard';  

const MenuPage = () => {  
	// Pagination state  
	const { menuId } = useParams();
	const [menu, setMenu] = useState([])
	const [parentMenus, setParentMenus] = useState([])
	const [subMenus, setSubMenus] = useState([])
	const postsPerPage = 12; // Number of items per page  
	const [posts, setPosts] = useState([])
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
				const menuRes = await axios.get(`${config.BACKEND_URL}/api/v1/public/menu/${menuId}/`);
				console.log(menuRes.data);
				setMenu(menuRes.data);  
				setLoading(false);  
			} catch (err) {  
				setError(err);  
				setLoading(false);  
			} 

			try {  
				const parentMenusRes = await axios.get(`${config.BACKEND_URL}/api/v1/public/menu/path/${menuId}/`);
				console.log(parentMenusRes.data);
				setParentMenus(parentMenusRes.data);  
				setLoadingParentMenus(false);  
			} catch (err) {  
				setErrorParentMenus(err);  
				setLoadingParentMenus(false);  
			} 

			try {  
				const subMenusRes = await axios.get(`${config.BACKEND_URL}/api/v1/public/menu/children/${menuId}/`);
				console.log(subMenusRes);
				setSubMenus(subMenusRes.data);  
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
				const newPostsRes = await axios.get(
					`${config.BACKEND_URL}/api/v1/product/product/by-menu/${menuId}/?limit=${postsPerPage}&offset=${offset}`
				);
				const updatedPosts = [...posts]
				for (let i = 0; i < postsPerPage; i++) {  
					updatedPosts[offset + i] = newPostsRes.data[i];
				} 
				setPosts(updatedPosts);
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
		<div className="container !mx-auto mt-2 p-4">  
			<Helmet>
				<title>{`منوی ${menu['title']}`}</title>    
			</Helmet>
			<Breadcrumb 
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
	);  
};  

export default MenuPage;  
