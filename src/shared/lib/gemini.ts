import { GoogleGenerativeAI, GenerativeModel, Part } from '@google/generative-ai';

/**
 * gemini.ts — the analytical-work helper.
 *
 * Cheap, fast, JSON-mode model calls for the parts of the pipeline that are
 * extraction/scoring/QA rather than creative writing. This is the other half
 * of the LLM-routing discipline: analytical → cheap model here, creative →
 * runClaudeMax(). Any JSON-capable provider can back this; the surface is just
 * geminiJson / geminiVisionJson / geminiVisionText.
 */

let model: GenerativeModel | null = null;
let textModel: GenerativeModel | null = null;

/**
 * True when an analytical-LLM key is configured. Activities use this to fall
 * back to deterministic placeholders so the reference pipeline runs end-to-end
 * with zero credentials (same philosophy as the stub adapters).
 */
export function geminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

function getModel(): GenerativeModel {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });
  }
  return model;
}

function getTextModel(): GenerativeModel {
  if (!textModel) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    const genAI = new GoogleGenerativeAI(apiKey);
    textModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }
  return textModel;
}

/** Call the model and parse a JSON response. Throws on empty/invalid JSON. */
export async function geminiJson<T>(systemPrompt: string, userMessage: string): Promise<T> {
  const result = await getModel().generateContent({
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
  });
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty response');
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Gemini response is not valid JSON: ${text.slice(0, 200)}`);
  }
}

/** Vision variant: text + inline base64 images, JSON response. */
export async function geminiVisionJson<T>(
  systemPrompt: string,
  textParts: string[],
  imageParts: Array<{ base64: string; mimeType: string }>,
): Promise<T> {
  const parts: Part[] = [
    ...textParts.map((text) => ({ text })),
    ...imageParts.map((img) => ({ inlineData: { data: img.base64, mimeType: img.mimeType } })),
  ];
  const result = await getModel().generateContent({
    contents: [{ role: 'user', parts }],
    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
  });
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty response');
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Gemini vision response is not valid JSON: ${text.slice(0, 200)}`);
  }
}

/** Vision variant returning raw text (no JSON coercion). */
export async function geminiVisionText(
  systemPrompt: string,
  textParts: string[],
  imageParts: Array<{ base64: string; mimeType: string }>,
): Promise<string> {
  const parts: Part[] = [
    ...textParts.map((text) => ({ text })),
    ...imageParts.map((img) => ({ inlineData: { data: img.base64, mimeType: img.mimeType } })),
  ];
  const result = await getTextModel().generateContent({
    contents: [{ role: 'user', parts }],
    systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
  });
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty response');
  return text;
}
