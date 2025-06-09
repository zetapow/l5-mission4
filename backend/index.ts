import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Import config and variables
import {
   PORT,
   GEMINI_API_KEY,
   GEMINI_MODEL,
   systemInstructions,
} from "./config";

if (!GEMINI_API_KEY) {
   console.error("GEMINI_API_KEY is not set in the environment variables.");
   process.exit(1);
}

// Initialize express and GoogleGenAI
const app = express();
const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
});

// Middlewares
app.use(express.json());

// API routes
app.get("/", (req, res) => {
   res.send("Welcome to the Insurance AI Backend!");
});

app.post("/api/chat", async (req, res) => {
   try {
      // input from user or frontend
      const userInput = req.body.prompt || "hello";

      const contents = [
         {
            role: "user",
            parts: [{ text: userInput }],
         },
      ];

      const config = {
         responseMimeType: "text/plain",
         systemInstruction: [{ text: systemInstructions }],
      };

      const response = await ai.models.generateContent({
         model: GEMINI_MODEL,
         config,
         contents,
      });

      // Get response from Gemini object

      const reply =
         response.candidates?.[0]?.content?.parts?.[0]?.text ??
         "No response from Gemini.";

      res.json({ geminiResponse: reply });
   } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
