import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

// Initialize Gemini Client
// WARNING: In a production app, never expose API keys on the client side.
// Ideally, this call should go through your own backend proxy.
// For this portfolio demo, we assume the environment variable is injected securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: RESUME_CONTEXT,
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return response.text;
    } else {
      return "Maaf, saya tidak dapat memproses permintaan saat ini.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Maaf, terjadi kesalahan pada sistem AI. Silakan coba lagi nanti.";
  }
};