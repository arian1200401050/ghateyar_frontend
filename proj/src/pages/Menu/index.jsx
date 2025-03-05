// src/MenuPage.js  
import React, { useState, useEffect } from 'react';  
import Breadcrumb from '#src/plugins/Menu/Breadcrumb';  
import Badges from '#src/plugins/Menu/Badge';  
import PostCards from '#src/plugins/Menu/postCard';  

const breadcrumbItems = [  
  { label: 'خانه', link: '/' },  
  { label: 'اسپیکر', link: '/speakers' },  
];  

const badges = [  
  { label: 'جدید', onClick: () => alert('جدید Clicked') },  
  { label: 'پرفروش', onClick: () => alert('پرفروش Clicked') },  
  { label: 'محبوب', onClick: () => alert('محبوب Clicked') },  
];  

// Sample data  
const posts = Array.from({ length: 43 }, (_, index) => ({  
  id: index,
  title: `محصول شماره ${100 + index}`,  
  content: 'توضیحات محصول ...',  
  image: `product/product_${index}.webp`,  
}));  

const MenuPage = () => {  
  // Pagination state  
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage = 12; // Number of items per page  
  const [currentPosts, setCurrentPosts] = useState([]);  
  const [totalItems, setTotalItems] = useState(posts.length);  
  const [totalPages, setTotalPages] = useState(Math.ceil(posts.length / itemsPerPage));  

  // Calculate current posts based on current page  
  useEffect(() => {  
    const startIndex = (currentPage - 1) * itemsPerPage;  
    const endIndex = startIndex + itemsPerPage;  
    setCurrentPosts(posts.slice(startIndex, endIndex));  
  }, [currentPage, posts]); // Dependency array includes currentPage and posts  

  // Update totalItems and totalPages in case posts change (for dynamic data)  
  useEffect(() => {  
    setTotalItems(posts.length);  
    setTotalPages(Math.ceil(posts.length / itemsPerPage));  
    setCurrentPage(1);  // Reset to first page when posts change  
  }, [posts]); 

  // Handlers for pagination  
  const goToNextPage = () => {  
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));  
  };  

  const goToPreviousPage = () => {  
    setCurrentPage((prev) => Math.max(prev - 1, 1));  
  };  

  return (  
    <div className="container !mx-auto mt-2 p-4">  
        <Breadcrumb items={breadcrumbItems} 
          paginationInfo={{totalPages, itemsPerPage, currentPage, setCurrentPage, totalItems}} 
        />   

      <div className="menu-page__body-section">
        <Badges badges={badges} /> 
        <PostCards posts={currentPosts} 
          paginationInfo={{totalPages, itemsPerPage, currentPage, setCurrentPage, totalItems}}
        />  

        {/* Pagination Buttons */}  
        <div className="flex justify-between items-center mt-4">  
          <button  
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}  
            onClick={goToPreviousPage}  
            disabled={currentPage === 1}  
          >  
            قبلی  
          </button>  
          <button  
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}  
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