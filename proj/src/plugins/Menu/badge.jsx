// src/Badge.js
import React from 'react';

const Badge = ({ label, onClick }) => {
  return (
    <div
      className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const Badges = ({ badges }) => {
  return (
    <div className="menu-page__badge-section border-b-1 border-stone-300 mb-2">
      <h2 className="!text-xl font-bold mb-4">زیرمنو ها</h2>  
      <div className="flex flex-wrap gap-4 mb-4 pr-4 pl-4">  
        {badges.map((badge, index) => (  
          <Badge key={index} label={badge.label} onClick={badge.onClick} />  
        ))}  
      </div>  
    </div>
  )
}

export default Badges;