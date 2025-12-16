import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // We cannot use responseSchema with googleSearch tool, so we must prompt carefully for JSON.
    const prompt = `
      Analyze this URL for security threats: "${url}"
      
      Perform the following checks:
      1. Check for typo-squatting (imitating popular brands).
      2. Analyze the Top Level Domain (TLD) reputation.
      3. Use Google Search to check if this domain is a known legitimate business or reported as a scam/phishing site.
      4. Look for obfuscation techniques in the URL string.

      Return the response STRICTLY as a raw JSON object (no markdown formatting, no code blocks) with this structure:
      {
        "safetyScore": number (0 is dangerous, 100 is very safe),
        "verdict": "SAFE" | "SUSPICIOUS" | "DANGEROUS",
        "summary": "A concise summary of why this link is safe or dangerous.",
        "riskFactors": ["list", "of", "risks"],
        "safeFactors": ["list", "of", "positive signs"],
        "technicalDetails": {
          "domainAge": "unknown or estimated",
          "hostingProvider": "unknown or inferred",
          "sslStatus": "inferred from protocol"
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Low temperature for consistent analysis
      },
    });

    const text = response.text || "{}";
    
    // Clean up potential markdown code blocks if the model adds them despite instructions
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("JSON Parse Error", e);
      throw new Error("Failed to parse AI analysis results.");
    }

    // Extract grounding chunks for sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri && chunk.web.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return {
      url,
      ...parsedData,
      sources,
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      url,
      safetyScore: 0,
      verdict: 'UNKNOWN',
      summary: "Analysis failed due to a technical error. Proceed with extreme caution.",
      riskFactors: ["Analysis service unavailable"],
      safeFactors: [],
      technicalDetails: {},
      sources: []
    };
  }
};