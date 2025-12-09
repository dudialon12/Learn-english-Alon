import { GoogleGenAI, Type } from "@google/genai";
import { GradeLevel, Question } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestions = async (grade: GradeLevel): Promise<Question[]> => {
  const model = "gemini-2.5-flash";
  
  const systemPrompt = `
    You are an expert English teacher for Hebrew-speaking children.
    Generate 10 multiple-choice English questions suitable for a student in ${grade}.
    
    Difficulty Guidelines:
    - Grade 1-2: Basic vocabulary (colors, animals, numbers, family), simple present 'to be'.
    - Grade 3-4: Simple sentences, present simple, basic prepositions, clothing, food.
    - Grade 5-6: Past simple, future, comparatives, reading comprehension (short sentence), more complex vocabulary.
    
    Ensure the "hebrewTranslation" is accurate and helpful.
    Ensure "correctAnswer" matches exactly one of the "options".
    Add a relevant emoji to the "emoji" field for visual appeal.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: "Generate 10 questions now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              questionText: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.STRING },
              hebrewTranslation: { type: Type.STRING },
              emoji: { type: Type.STRING }
            },
            required: ["id", "questionText", "options", "correctAnswer", "hebrewTranslation"],
            propertyOrdering: ["id", "questionText", "hebrewTranslation", "options", "correctAnswer", "emoji"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    const questions = JSON.parse(jsonText) as Question[];
    return questions;

  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw error;
  }
};