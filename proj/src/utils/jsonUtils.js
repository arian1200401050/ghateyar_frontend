import { promises as fs } from 'fs';

// Function to read and parse JSON file  
async function readJsonFile(filePath) {  
    try {  
        const data = await fs.readFile(filePath, 'utf-8'); // Read the file content  
        const jsonObject = JSON.parse(data); // Parse the JSON string into an object  
        return jsonObject;  
    } catch (error) {  
        console.error('Error reading or parsing the file:', error);  
        return null; // Handle the error  
    }  
}  

export {
    readJsonFile
};