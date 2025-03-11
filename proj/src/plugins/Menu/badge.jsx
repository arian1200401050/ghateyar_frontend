// src/Badge.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const _Badge = ({badges}) => {
  const [menuChildren, setMenuChildren] = useState();
  const [loading, setLoading] = useState(null);  
  const [error, setError] = useState(null);  

  useEffect(() => {  
    async function fetchData() {  
      await axios
          .get(`${config.BACKEND_URL}/api/v1/public/menu-path/`)
          .then((res) => {
              setMenuChildren(res.data); // Changed state variable  
              setLoading(false);  
          })
          .catch((err) => {
              setError(err);  
              setLoading(false);  
          });
    }  

    // fetchData();  
  }, []); 

  if (loading) {  
    return <p>Loading...</p>;  
  }  

  if (error) {  
      return <p>Error: {error.message}</p>;  
  }  
  
  return (
    <div className="flex flex-wrap gap-4 mb-4 pr-4 pl-4">  
      {badges.map((badge, index) => (  
        <Link to={badge.link} key={index} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
        >
          {badge.label}
        </Link>
      ))}  
    </div>
  );
};

const Badge = ({ badges }) => {
    return (
    <div className="menu-page__badge-section border-b-1 border-stone-300 mb-2">
      <h2 className="!text-xl font-bold mb-4">زیرمنو ها</h2>  
      <_Badge badges={badges}/>  
    </div>
  )
}

export default Badge;