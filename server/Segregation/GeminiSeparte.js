import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const geminiApiKey = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generate = async (emails, domainCategories) => {
  try {
    if (!emails || emails.length === 0) {
      throw new Error("No emails provided to group.");
    }

    const formattedEmails = emails.map((email) => ({
      subject: email.subject,
      body: email.message.substring(0, 150),
      urls: email.url
    }));
    const emailContent = JSON.stringify(formattedEmails);

    const prompt = `
      Classify these emails into categories: ${domainCategories.join(", ")}.
      For uncategorized emails, use "other". Respond in strict JSON format:

      {
        "Category1": [
          { "subject": "Example Subject", "body": "Example Body",url: "noefej" }
        ],
        "Category2": [ ... ],
        "other": [
          { "subject": "Example Subject", "body": "Example Body",url: "noefej" }
        ]
      }

      Emails:
      ${emailContent}
    `;

    const result = await geminiModel.generateContent(prompt);

    return {
      success: true,
      content: result.response,
    };
  } catch (error) {
    console.error("Error in generating Gemini response:", error);
    return {
      success: false,
      message: "Failed to process the request.",
    };
  }
};
