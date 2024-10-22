import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generate = async (question, emails) => {
  try {
    if (!emails || Object.keys(emails).length === 0) {
      throw new Error("No emails provided to group.");
    }

    const emailList = JSON.stringify(emails, null, 2);
    const prompt = `${question}\n\nHere is the list of grouped emails:\n${emailList}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response.text();

    console.log(response);
    return response;
  } catch (error) {
    console.log("Error in generate function:", error.message);
    return "Failed to process the request.";
  }
};

