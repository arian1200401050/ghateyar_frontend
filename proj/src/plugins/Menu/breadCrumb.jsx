// src/Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaginationText = ({ currentPage, itemsPerPage, totalItems}) => {
  return (
    <div className="text-sm text-gray-600">  
      نمایش {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} از {totalItems} نتیجه  
    </div> 
  )
}


const _Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600">
      <ul className="flex m-0">
        {items.map((item, index) => (
          <li key={index} className="">
            <Link to={item.link} className="!text-stone-600 hover:text-blue-600">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="text-stone-600 mr-1 ml-2"> &#47; </span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};


const Breadcrumb = ({items, paginationInfo}) => {
  return (
    <div className="menu-page__breadcrumb-section mb-4">  
      <div className="menu-page__breadcrumb-top flex justify-between border-b-1 border-stone-300 pb-4">
        <_Breadcrumb items={items}/>
        <PaginationText currentPage={paginationInfo.currentPage} itemsPerPage={paginationInfo.itemsPerPage}
          totalItems={paginationInfo.totalItems}
        />
      </div>
    </div>
  )
}

export default Breadcrumb;