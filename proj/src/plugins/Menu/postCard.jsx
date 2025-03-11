// src/PostCard.js
import React from 'react';

import config from '#src/config';


const PaginationControl = ({ currentPage, totalPages, itemsPerPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <span className="text-sm">نمایش : </span>
      <nav>
        <ul className="flex m-0">
          {/* Pagination Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="text-xs">
              <button
                className={` ${
                  currentPage === index + 1 ? 
                      'text-gray-700' : 
                      'text-gray-400 hover:text-gray-700'
                  } transition duration-200`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {(index * itemsPerPage) + 1}
              </button>
              {index < totalPages - 1 && <span className="text-gray-500 mr-1 ml-2 cursor-default"> &#47; </span>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const PostCard = ({ post }) => {
  return (
    <div className="flex justify-center items-center gap-0 m-2">
      <a href={`/product/${post.id}`} alt={post.title} 
        className="block w-full h-[100%] border rounded-xl overflow-hidden shadow-[1px 1px 3px] shadow-xs shadow-slate-400
          hover:shadow-md hover:shadow-slate-500 hover:h-[105%]
          transition-[height] transition-[box-shadow] 
          duration-200 ease-linear">
        <div className="w-full h-65 flex justify-center items-center">
          <img src={`${config.MEDIA_ROOT}/${post.image}`} alt={post.title} className="size-[90%] object-contain" />
        </div>
        <div className="!p-5 !pt-4 border-stone-300">
          <h3 className="!text-[.95rem]/6 text-center font-semibold">{post.title}</h3>
          <p className="!text-sm text-center text-gray-500">{post.content}</p>
        </div>
      </a>
    </div>
  );
};

const PostCards = ( { posts, paginationInfo }) => {
  return (
    <div className="menu-page__post-card-section">
      <div className="menu-page__post-card-header pl-90 pt-1 pb-4 flex justify-between items-center">
        <button className="font-normal !text-md flex items-center
          before:content-['≡'] before:text-3xl before:ml-1">مشاهده فیلترها</button>  
        <PaginationControl currentPage={paginationInfo.currentPage} totalPages={paginationInfo.totalPages} 
          itemsPerPage={paginationInfo.itemsPerPage} setCurrentPage={paginationInfo.setCurrentPage}
        />
      </div>

      <div className="menu-page__post-card-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">  
          {posts.map((post, index) => (  
            <PostCard key={index} post={post} />  
          ))}  
        </div>  
      </div>
    </div>
  )
}

export default PostCards;