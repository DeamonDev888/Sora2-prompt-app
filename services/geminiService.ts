import { GoogleGenAI, Type } from "@google/genai";
import { WizardData, GeneratedPrompts } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSoraPrompts = async (data: WizardData): Promise<GeneratedPrompts> => {
  const client = getClient();
  
  const systemInstruction = `You are an expert prompt engineer for OpenAI's Sora 2 video generation model. 
  Your task is to take structured production inputs and synthesize them into a single, highly optimized prompt.
  
  CONSTRAINTS:
  1. The final prompt MUST be under 1000 characters.
  2. Use precise cinematic terminology (lensing, lighting, framing).
  3. Use a "Production Brief" format: concise, direct, density of information.
  4. Prioritize: Style > Character/Object Invariants > Action > Continuity Rules.
  5. Output valid JSON with two fields: 'french' and 'english'.
  `;

  const userPrompt = `
  Please generate the optimized Sora 2 prompts based on these specifications:

  1. Format & Style:
  - Style: ${data.style}
  - Duration: ${data.duration}
  - Model: ${data.quality}

  2. Identity & Props (Locks):
  - Character Bible: ${data.characterBible}
  - Props/Continuity: ${data.props}

  3. Cinematography:
  - Framing: ${data.framing}
  - Lensing/DOF: ${data.lensing}
  - Lighting/Atmosphere: ${data.lighting}

  4. Movement & Physics:
  - Main Action (The Beat): ${data.action}
  - Camera Movement: ${data.cameraMovement}
  - Physics/Continuity Rules: ${data.continuity}

  Synthesize this into a dense, cinematic prompt.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            french: { type: Type.STRING, description: "The optimized prompt in French" },
            english: { type: Type.STRING, description: "The optimized prompt in English" }
          },
          required: ["french", "english"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const result = JSON.parse(text);
    
    return {
      french: result.french,
      english: result.english,
      charCountFr: result.french.length,
      charCountEn: result.english.length
    };
  } catch (error) {
    console.error("Error generating prompts:", error);
    throw error;
  }
};