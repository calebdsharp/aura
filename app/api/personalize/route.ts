import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { THEMES, THEME_IDS } from "@/lib/themes";

const ALLOWED_THEMES = THEME_IDS;

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
          "Return only JSON with a theme field that is exactly one of the theme ids below, " +
          "and a short reason field. Pick the theme whose description best fits the user's interests; " +
          "use Default when none fits clearly. Do not pick a light/dark mode and do not return colors. " +
          THEMES.map(
            (t) => `${t.id}: ${t.name} — ${t.description} (tags: ${t.tags.join(", ")})`,
          ).join(" "),

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
