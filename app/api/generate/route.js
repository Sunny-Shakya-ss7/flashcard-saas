import { NextResponse } from "next/server";
import OpenAI from "openai";


const systemPrompt =  `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`;

export async function POST(req) {
  const data = await req.json();

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [{ role: "system", content: systemPrompt }, ...data],
    response_format: {type: 'json_object'},
  });

  const flashcards =  JSON.parse(completion.choices[0].message.content)

  return NextResponse.json(flashcards.flashcard);
}