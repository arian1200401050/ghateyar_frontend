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

const SupplementaryProduct = ({infoGroup, comments}) => {
    const [activeTab, setActiveTab] = useState('info');
    const [accordions, setAccordions] = useState([]);
    const accordionEls = useRef([]);

    const toggleAccordion = (index) => {
        const newAccordions = [...accordions];
        newAccordions[index].isOpen = !newAccordions[index].isOpen;
        setAccordions(newAccordions);
        
    };

    useEffect(() => {
        const initAccordions = () => {
            const newAccordions = [];
            Object.keys(infoGroup).map((key, index) => {
                newAccordions[index] = {isOpen: true};
                newAccordions[index].height = accordionEls.current[index].scrollHeight + 'px';
            })
            setAccordions(newAccordions);
        };

        initAccordions();
    }, [infoGroup, accordionEls])


    // should be substituted with translation solution
    const getLabel = (label) => {
        switch (label) {
            case ('feature1'): return 'مشخصه اول'
            case ('feature2'): return 'مشخصه دوم'
            case ('feature3'): return 'مشخصه سوم'
            case ('feature4'): return 'مشخصه چهارم'
            case ('feature5'): return 'مشخصه پنجم'
            case ('group1'): return 'گروه اول'
            case ('group2'): return 'گروه دوم'
            default: return label
        }
    }
    
    return (
        <div className="mt-5">
      <div className="tabs flex justify-start gap-x-4 mb-4 border-b-1 border-gray-300">
        <button 
          className={`tab pb-2 px-2 !text-sm text-gray-700 border-b-3 border-transparent 
            ${activeTab === 'info' ? 'text-rose-600 !border-rose-600' : ''}`} 
            onClick={() => setActiveTab('info')}
            >
          مشخصات
        </button>
        <button 
          className={`tab pb-2 px-2 !text-sm text-gray-700 border-b-3 border-transparent 
            ${activeTab === 'comments' ? 'text-rose-600 !border-rose-600' : ''}`} 
            onClick={() => setActiveTab('comments')}
            >
          نظرات
        </button>
      </div>
      

      {activeTab === 'info' && (
          <div className="accordion md:!w-9/12">
            {Object.entries(infoGroup).map(([label, group], index) => (
                <div key={index} className="accordion-group mb-4 flex">
                    <div className="accordion-header mb-2 md:!ml-4">
                        <GroupName className={`cursor-pointer text-sm text-nowrap flex items-center
                            after:content-[''] after:text-3xl after:p-2 after:rotate-90
                            after:ml-2 after:mr-2 after:transition-rotate after:duration-1000
                            ${accordions[index]?.isOpen ? 'after:!rotate-0' : ''}`}
                            onClick={() => toggleAccordion(index)} 
                        >
                            {getLabel(label)}
                        </GroupName>
                    </div>
                    <BodyWrapper className={`accordion-body py-0 grow overflow-hidden transition-height duration-1000
                        ${accordions[index]?.isOpen ? 'accordion-body--open' : ''}`}
                        ref={(element) => accordionEls.current.push(element)}
                        height={accordions[index]?.isOpen ? accordions[index]?.height : 0}
                    >
                        {Object.entries(group).map(([label, feature], index) => (
                            <div key={index} className="flex mb-2">
                                <span className="text-sm text-gray-500 min-w-3/12 text-nowrap
                                    after:content-[':'] after:mr-1 after:ml-2">{getLabel(label)}
                                </span>
                                <span className="text-sm pb-2 border-b-1 border-gray-400 grow">{feature}</span>
                            </div>
                        ))}
                    </BodyWrapper>
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