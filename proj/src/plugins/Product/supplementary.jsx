import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import config from '#src/config.js'
import Comments from './comments.jsx'


const BodyWrapper = styled.div`  
    height: ${(props) => (props.height ? `${props.height} !important` : '0 !important')};  
`;

const GroupName = styled.span`
    &::after { 
        background-image: url('/icon/arrow.svg') 
    }
`;

const SupplementaryProduct = ({attributes, comments}) => {
    const [activeTab, setActiveTab] = useState('info');
    
    return (
        <div className="mt-5">
      <div className="tabs flex justify-start gap-x-4 mb-4 border-b-1 border-gray-300">
        <button 
          className={`tab pb-2 px-2 text-xl md:!text-sm text-gray-700 border-b-3 border-transparent cursor-pointer
            ${activeTab === 'info' ? 'text-rose-600 !border-rose-600' : ''}`} 
            onClick={() => setActiveTab('info')}
            >
          مشخصات
        </button>
        <button 
          className={`tab pb-2 px-2 text-xl md:!text-sm text-gray-700 border-b-3 border-transparent cursor-pointer
            ${activeTab === 'comments' ? 'text-rose-600 !border-rose-600' : ''}`} 
            onClick={() => setActiveTab('comments')}
            >
          نظرات
        </button>
      </div>
      

      {activeTab === 'info' && (
          <div className="accordion md:!w-9/12">
            {Object.entries(attributes).map(([key, value], index) => (
                <div key={index} className="accordion-group mb-4 flex">
                    <div key={index} className="flex mb-2 w-full md:pr-24">
                        <span className="text-lg md:!text-sm text-gray-500 min-w-3/12 text-nowrap
                            after:content-[':'] after:mr-1 after:ml-2">{key}
                        </span>
                        <span className="text-xl md:!text-sm pb-2 border-b-1 border-gray-400 grow">{value}</span>
                    </div>
                </div>
            ))}
        </div>
      )}

      {activeTab === 'comments' && (
        <Comments comments={comments} />
      )}
    </div>
  );
};

export default SupplementaryProduct;
