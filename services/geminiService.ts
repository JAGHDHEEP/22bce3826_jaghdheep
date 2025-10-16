
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function reviewCode(code: string): Promise<string> {
  const model = 'gemini-2.5-pro';
  
  const prompt = `
    You are an expert code reviewer with years of experience in software development. 
    Your task is to analyze the following code snippet. 
    Please provide a comprehensive and constructive review covering the following aspects:
    1.  **Readability & Maintainability**: How easy is the code to understand and modify? Are variable names clear? Is the structure logical?
    2.  **Best Practices & Conventions**: Does the code adhere to common language-specific best practices and coding conventions?
    3.  **Potential Bugs & Edge Cases**: Are there any logical errors, potential runtime issues, or unhandled edge cases?
    4.  **Performance**: Are there any obvious performance bottlenecks?
    5.  **Security**: Are there any potential security vulnerabilities?

    Structure your response using markdown. Use headings for each section. Provide specific code examples where necessary to illustrate your points. Be clear, concise, and helpful.

    Here is the code to review:
    \`\`\`
    ${code}
    \`\`\`
    `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get review from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
}
