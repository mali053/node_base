import { Request, Response } from 'express';
import axios from 'axios';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const uploadFiles = async (req: Request, res: Response) => {
    // Check if file exists
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the uploaded file to extract email addresses
    const fileContent: string = req.file.buffer.toString();
    const emailAddresses: string[] = fileContent.split(',').map(email => email.trim());

    const validationResults: string[] = [];

    // Validate each email address
    for (const email of emailAddresses) {
        const result = await validateEmail(email);
        validationResults.push(result);
        await sleep(1000);
    }

    // Send the validation results as a response
    res.json({ validationResults });
};

const validateEmail = async (email: string): Promise<string> => {
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=e93dfe0babd84e35bf33be23e29480c7&email=${email}`);
        return `${email}: ${response.data.is_valid_format.value ? 'Valid' : 'Invalid'}`;
    } catch (error) {
        return `${email}: Error - ${error}`;
    }
};

export { uploadFiles };
