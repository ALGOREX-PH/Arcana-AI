import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyBO-w3iWUQDKbedw1ehOOCG1cd_DNBU4WM");

export async function getTarotReading(question: string, card: { name: string; description: string; isReversed: boolean; upright: string[]; reversed: string[] }) {
  if (!question || !card) {
    throw new Error('Question and card are required for a reading');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a mystical AI tarot reader. The user asked: "${question}"

They drew the ${card.name} ${card.isReversed ? '(Reversed)' : '(Upright)'}.

Card meanings:
${card.isReversed ? 
  '- Reversed: ' + card.reversed.join(', ') :
  '- Upright: ' + card.upright.join(', ')}

Provide a mystical and insightful tarot reading based on their question and the drawn card. Keep the response concise but meaningful, around 2-3 paragraphs. Use mystical language but remain clear and helpful. Focus on providing actionable guidance.`;

    const result = await model.generateContent(prompt);
    if (!result.response) {
      throw new Error('No response received from Gemini API');
    }
    const response = await result.response;
    const text = response.text();
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    return text;
  } catch (error) {
    console.error('Error getting tarot reading:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error("The mystical connection requires proper authentication. Please ensure your API key is correctly configured.");
      }
      if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error("The ethereal forces deny access. Please check your API key's permissions.");
      }
      throw new Error(error.message);
    }
    throw new Error("I sense a disturbance in the ethereal connection. Please try your reading again in a moment.");
  }
}
