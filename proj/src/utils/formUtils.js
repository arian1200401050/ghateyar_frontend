function formDataToJson(formData) {  
    const formObject = {};  

    for (const [key, value] of formData.entries()) {  
        // Check if the value is a File  
        if (value instanceof File) {  
            // Add an identifier for the file  
            formObject[key] = {  
                filename: value.name,  
                type: value.type,  
                size: value.size,  
                content: null // Placeholder for the file content or a path  
            };  
        } else {  
            formObject[key] = value;  
        }  
    }  

    return JSON.stringify(formObject);  
} 

export {
    formDataToJson
}