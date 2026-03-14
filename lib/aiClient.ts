/*THERE WAS SOME ERROR WITH GEMINI API KEY(, SO I USED THE GROQ API FOR THE TIME BEING.
I DO UNDERSTAND BOTH API USECASES -  MY SINCERE APOLOGIES )*/

// // Gemini prompt understanding --> When using gemini API * 

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function explainTopic(topic: string): Promise<string> {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//     tools: [{ googleSearch: {} } as any],
//   });

//   const prompt = `You are a smart, direct and helpful assistant. Follow these rules:

// 1. If the question asks for real-time data (gold price, stock price, weather, sports scores, news, currency rates etc.) — use Google Search to get the latest information and give a direct, accurate and specific answer with the actual current value.

// 2. If the question is a study topic or concept — explain it simply and clearly in under 150 words suitable for a student.

// 3. Always be specific and direct. Never give vague or generic answers.

// User question: "${topic}"`;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// }


// Groq prompt understanding 
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function explainTopic(topic: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a smart, direct and helpful assistant. Follow these rules strictly:

1. If the question asks for real-time data (gold price, stock price, weather, sports scores, news, currency rates etc.) — clearly say you don't have live data, give the most recent approximate value you know, explain what affects it, and tell the user exactly where to check for the live figure (e.g. "Check Google Finance", "Visit mcx.in", "Search on Google").

2. If the question is a study topic or concept — explain it simply and clearly in under 150 words suitable for a student.

3. Always be specific and direct. Never give vague or generic answers. Never just describe what something is when the user is clearly asking for a specific value or fact.`,
      },
      {
        role: "user",
        content: topic,
      },
    ],
    max_tokens: 400,
  });

  return completion.choices[0]?.message?.content || "Could not generate a response.";
}
