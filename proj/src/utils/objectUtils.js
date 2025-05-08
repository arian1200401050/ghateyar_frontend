function getValueByPath(obj, path) {  
    return path.split('.').reduce((acc, key) => {  
        if (acc && key in acc) {  
            return acc[key];  
        }  
        return undefined; // Return undefined if the key doesn't exist  
    }, obj);  
}  

function setValueByPath(obj, path, value) {  
    const keys = path.split('.');
    const lastKey = keys.pop(); // Get the last key  
    const target = keys.reduce((acc, key) => {  
        // If the key does not exist in the accumulator, create an empty object  
        if (!acc[key]) {  
            acc[key] = {};  
        }  
        return acc[key];  
    }, obj); // Start from the original object  
    
    // Set the value at the last key  
    target[lastKey] = value;  
    
    // Return the shallow copy of the merged source object so that the original source object is not modified
    // Its neccessary for reflect the changes in react state
    return {...obj};
} 

export {
    getValueByPath,
    setValueByPath
}