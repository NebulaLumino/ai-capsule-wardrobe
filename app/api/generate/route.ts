import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const prompt = buildPrompt(formData);
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function buildPrompt(formData: any): string {
  const fields = `- Bodytype: ${formData['bodyType'] || 'Not specified'}
- Skintone: ${formData['skinTone'] || 'Not specified'}
- Lifestyle: ${formData['lifestyle'] || 'Not specified'}
- Dresscode: ${formData['dressCode'] || 'Not specified'}
- Budget: ${formData['budget'] || 'Not specified'}
- Closet: ${formData['closet'] || 'Not specified'}
- Inspiration: ${formData['inspiration'] || 'Not specified'}
- Climate: ${formData['climate'] || 'Not specified'}`;
  const template = `You are an expert personal stylist and capsule wardrobe consultant. Based on the following user profile, create a comprehensive, well-structured capsule wardrobe plan.

{fields}

Please provide:
1. Essential Pieces List (with specific garment descriptions)
2. Color Palette (specific colors that complement their skin tone)
3. Outfit Combinations (at least 10 mix-and-match outfits)
4. Shopping List (prioritized by importance)
5. Cost Breakdown (estimated total)
6. Seasonal Rotation Plan
7. Styling Tips for their body type

Format everything in clean markdown with headers, bullet points, and organized sections.`;
  return template.replace("{fields}", fields);
}
