import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ALLOWED_THEMES = ["default", "warm", "cool"] as const;

export const POST = async (request: Request) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 },
      );
    }

    const { interests } = await request.json();

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `User interests: ${interests || "general"}. Pick the best theme for Aura.`,
      config: {
        responseMimeType: "application/json",
        systemInstruction:
          "You are the personalization service for Aura, a home page app. " +
          "Return only JSON with a theme field that is exactly one of: default, warm, cool, " +
          "and a short reason field. Warm is cozy, earthy, and homey. Cool is calm, clean, and blue-toned. " +
          "Default is neutral when neither fits clearly.",
        temperature: 0,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text) as { theme?: string; reason?: string };
    const theme = ALLOWED_THEMES.includes(parsed.theme as never)
      ? parsed.theme!
      : "default";

    return Response.json({ theme, reason: parsed.reason || "" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Personalization failed" }, { status: 500 });
  }
};
