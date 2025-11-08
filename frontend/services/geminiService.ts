import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Scholarship } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY environment variable not set. Using a mock service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const MOCK_DELAY = 1000;

// Mock responses for when API key is not available
const getMockResponse = async (text: string): Promise<GenerateContentResponse> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return {
    text: `This is a mock response for: "${text.substring(0, 100)}...". Please configure your Gemini API key to get real AI responses.`,
  } as GenerateContentResponse;
};


export const getChatResponse = async (history: string, newPrompt: string): Promise<GenerateContentResponse> => {
  if (!ai) return getMockResponse(newPrompt);

  const fullPrompt = `${history}\n\nUser: ${newPrompt}\nSmartScholar:`;
  
  return ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
    config: {
        systemInstruction: "You are SmartScholar, a friendly and expert AI assistant for students seeking financial aid and scholarships. Provide clear, concise, and encouraging advice. Keep responses helpful and focused on the user's questions about financial aid.",
        temperature: 0.7,
        topP: 1,
    },
  });
};

export const summarizeDocument = async (documentText: string): Promise<GenerateContentResponse> => {
    if (!ai) return getMockResponse(documentText);

    const prompt = `Please analyze the following document text and provide a concise 'Eligibility Summary'. Extract key requirements such as GPA, field of study, deadlines, and required documents. Format the output clearly with bullet points.

    Document Text:
    ---
    ${documentText}
    ---
    Eligibility Summary:`;

    return ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
};

export const getScholarshipRecommendations = async (userProfile: string, scholarships: Scholarship[]): Promise<GenerateContentResponse> => {
    if (!ai) {
      const mockRec = {
        recommendations: [
          // FIX: Use the 'scholarships' parameter for mock data instead of the undefined MOCK_SCHOLARSHIPS constant.
          { id: scholarships[0].id, reason: "Mock reason for STEM students." },
          // FIX: Use the 'scholarships' parameter for mock data instead of the undefined MOCK_SCHOLARSHIPS constant.
          { id: scholarships[1].id, reason: "Mock reason for art students." }
        ]
      }
      return { text: JSON.stringify(mockRec) } as GenerateContentResponse
    }
    
    const scholarshipsJSON = JSON.stringify(scholarships.map(s => ({id: s.id, title: s.title, eligibility: s.eligibility, description: s.description})), null, 2);

    const prompt = `Based on the user's profile, recommend the top 3 most relevant scholarships from the provided list. For each recommendation, provide a brief, one-sentence reason explaining why it's a good fit.

    User Profile:
    ---
    ${userProfile}
    ---

    Available Scholarships (JSON format):
    ---
    ${scholarshipsJSON}
    ---`;
    
    return ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recommendations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.NUMBER, description: "The ID of the recommended scholarship." },
                                reason: { type: Type.STRING, description: "A brief reason for the recommendation." }
                            }
                        }
                    }
                }
            }
        }
    });
};