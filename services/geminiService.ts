/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from '@google/genai';

export const getCyberAdvice = async (
  city: string,
  scenario: string,
  userAge: number = 12
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `You are the Smart Cyber Morocco Mentor. 
  A child aged ${userAge} is exploring a simulation in the city of ${city}. 
  A "${scenario}" has just occurred. 
  
  Explain in simple, engaging terms:
  1. What this cyber threat is (use a real-world analogy).
  2. How it affects ${city}'s smart systems.
  3. One clear "Defense Protocol" (a tip) the user can use in their real life to stay safe.
  
  Keep the response under 150 words, encouraging and educational. Use a professional but friendly tone.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error('Gemini Advice Error:', error);
    throw error;
  }
};

export const chatWithMentor = async (history: {role: string, text: string}[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are the Smart Cyber Morocco Mentor. You help kids understand cybersecurity. Be brief, safe, and educational.'
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
