import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  flashcards:[
    {
      front: 'Front of the card',
      back: 'Back of the card'
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
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    response_format: { type: "json_object" },
  });

  const responseText = completion.choices[0].message.content;

  const jsonStartIndex = responseText.indexOf("{");
  const jsonEndIndex = responseText.lastIndexOf("}") + 1; // +1 to include the closing bracket

  if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
    var jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);
  }

  // const jsonString = {
  //   flashcards: [
  //     {
  //       front: "Mercury is the smallest planet in our solar system.",
  //       back: "The average distance from the Sun is about 58 million kilometers.",
  //     },
  //     {
  //       front: "Venus is the hottest planet in the solar system.",
  //       back: "The surface temperature can reach up to 462°C.",
  //     },
  //     {
  //       front: "Mars is often referred to as the Red Planet.",
  //       back: "It is known for its reddish appearance due to iron oxide in the soil.",
  //     },
  //     {
  //       front: "Jupiter is the largest planet in our solar system.",
  //       back: "It is more than 1,300 times the size of Earth.",
  //     },
  //     {
  //       front: "Saturn is known for its beautiful ring system.",
  //       back: "The rings are made up of ice and rock particles.",
  //     },
  //     {
  //       front: "Uranus is an icy planet with a tilted axis.",
  //       back: "This tilt causes extreme seasons on the planet.",
  //     },
  //     {
  //       front: "Neptune is the farthest planet from the Sun.",
  //       back: "It is also one of the coldest planets in the solar system.",
  //     },
  //     {
  //       front: "Pluto is no longer considered a planet.",
  //       back: "It is now classified as a dwarf planet.",
  //     },
  //     {
  //       front: "The gas giants are Jupiter, Saturn, Uranus, and Neptune.",
  //       back: "They are characterized by their gas composition and lack of a solid surface.",
  //     },
  //     {
  //       front: "The rocky planets are Mercury, Venus, Earth, and Mars.",
  //       back: "They are composed primarily of rock and metal.",
  //     },
  //   ],
  // };

  const flashcards = JSON.parse(jsonString).flashcards;

  return NextResponse.json(flashcards);
}
