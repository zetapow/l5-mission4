import express, { response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const fetch = global.fetch;

// Environment variables
const PORT = process.env.PORT || 3000;
const GEMINI_API_URL =
   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   console.error("GEMINI_API_KEY is not set in the environment variables.");
   process.exit(1);
}
const app = express();

// Middlewares
app.use(express.json());

// API routes
app.get("/", (req, res) => {
   res.send("Welcome to the Insurance AI Backend!");
});

app.post("/api/chat", async (req, res) => {
   try {
      const prompt = req.body.prompt || "say hello";
      const dataToSend = {
         contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await axios.post(
         `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
         dataToSend,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      res.json({ geminiResponse: response.data });
   } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
