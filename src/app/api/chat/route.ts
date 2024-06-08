import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI key
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// Initialize variables for rate limiting
let lastResetTime = Date.now();
let requestCount = 0;
const maxRequestsPerHour = 5;

// Function to check if a request can be made
function canMakeRequest(): boolean {
  const now = Date.now();
  // Reset request count if an hour has passed since the last reset
  if (now - lastResetTime > 60 * 60 * 1000) {
    // 1 hour in milliseconds
    lastResetTime = now;
    requestCount = 0;
  }
  // Return true if the request count is less than the maximum allowed
  return requestCount < maxRequestsPerHour;
}

export async function POST(req: Request) {
  try {
    if (!canMakeRequest()) {
      return NextResponse.json({ error: "Limit Reach" }, { status: 429 });
    }

    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      max_tokens: 500,
      messages,
    });

    requestCount++;

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) { // Specify the type of error as any
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
