// src/Breadcrumb.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaginationText = ({ currentPage, postsPerPage, totalPages, totalPosts}) => {
  return (
    <div className="text-lg md:!text-sm text-gray-600">  
      نمایش {(currentPage - 1) * postsPerPage + 1}–{Math.min(currentPage * postsPerPage, totalPages)} از {totalPosts} نتیجه  
    </div> 
  )
}


const _Breadcrumb = ({ items, error, loading }) => {
  if (loading) {  
    return <p>Loading...</p>;  
  }  

  if (error) {  
      return <p>Error: {error.message}</p>;  
  }  
  
  return (
    <nav className="text-xl md:!text-sm text-gray-600">
      <ul className="flex m-0">
        {items.map((item, index) => {
          debugger;
          return (
          <li key={index} className="">
            <Link to={`/article-menu/${item.article_menu_id}/`} className="!text-stone-600 hover:text-blue-600">
              {item.title}
            </Link>
            {index < items.length - 1 && <span className="text-stone-600 mr-1 ml-2"> &#47; </span>}
          </li>
        )})}
      </ul>
    </nav>
  );
};


const Breadcrumb = ({breadcrumbInfo, paginationInfo}) => {
  useEffect(() => {
    // console.log(paginationInfo)
  })
  
  return (
    <div className="menu-page__breadcrumb-section mb-4">  
      <div className="menu-page__breadcrumb-top flex justify-between border-b-1 border-stone-300 pb-4">
        <_Breadcrumb items={breadcrumbInfo.items} error={breadcrumbInfo.error} 
          loading={breadcrumbInfo.loading}
        />
        <PaginationText currentPage={paginationInfo.currentPage} postsPerPage={paginationInfo.postsPerPage}
          totalPages={paginationInfo.totalPages} totalPosts={paginationInfo.totalPosts}
        />
      </div>
    </div>
  )
}

export default Breadcrumb;
