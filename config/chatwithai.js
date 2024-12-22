import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

// Initialize the API with the key
const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configuration for the model
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// Initialize the generative model
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro',
  geminiConfig,
});

const generate = async (s) => {
  try {
    const prompt = `Tell me about ${s}.`; // Crafting the prompt
    const result = await geminiModel.generateContent(prompt);

    console.log('Raw result:', result); // Debugging line

    // Accessing the content in the first candidate
    if (result.response && result.response.candidates && result.response.candidates[0]) {
      return result.response.candidates[0].text; // Extract text from the first candidate
    }

    throw new Error('No content generated in candidates');
  } catch (error) {
    console.error('Error in generate function:', error);
    throw new Error('Error generating content');
  }
};


export default generate;
