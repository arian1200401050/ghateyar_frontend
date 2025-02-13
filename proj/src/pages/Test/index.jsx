import React, { useState, useEffect } from 'react';  

// Child Component  
const ChildComponent = ({ index, setValue }) => {  
    useEffect(() => {  
        // Simulate some operation that returns a value  
        const returnValue = `Value from Child ${index}`;  
        
        // Update the parent's state with the return value  
        setValue(returnValue);  
        console.log(returnValue)
    }, [index]); // Dependency array with index and setValue  

    return (  
        <div>  
            <h3>Child Component {index}</h3>  
            {/* Additional UI Logic */}  
        </div>  
    );  
};  

// Parent Component  
const ParentComponent = () => {  
    const [returnedValues, setReturnedValues] = useState([]);  

    const handleSetValue = (value) => {  
        setReturnedValues((prevValues) => [...prevValues, value]);  
    };  

    return (  
        <div>  
            <h1>Parent Component</h1>  
            {[0, 1, 2].map((index) => (  
                <ChildComponent key={index} index={index} setValue={handleSetValue} />  
            ))}  
            <h2>Returned Values:</h2>  
            <ul>  
                {returnedValues.map((val, idx) => (  
                    <li key={idx}>{val}</li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default ParentComponent;