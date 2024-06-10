import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// buat OpenAI Client requuuuuuestt
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Key API, Jangan dishare
});


export const runtime = "edge";

// Rate limiter biar ga iso nyepam
let lastResetTime = Date.now();
let requestCount = 0;
const maxRequestsPerHour = 5;

// Function buat cek request
function canMakeRequest(): boolean {
  const now = Date.now();
  // Reset request 
  if (now - lastResetTime > 60 * 60 * 1000) {
    
    lastResetTime = now;
    requestCount = 0;
  }
  
  return requestCount < maxRequestsPerHour;
}

export async function POST(req: Request) {
  try {
    if (!canMakeRequest()) {
      return NextResponse.json({ error: "Limit Reach" }, { status: 429 });
    }

    const { messages, stopRequest } = await req.json();

    if (stopRequest) {
      return NextResponse.json({ message: "Request stopped by user" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      max_tokens: 500,
      messages,
    });

    requestCount++;

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    // Error handling
  }
}
