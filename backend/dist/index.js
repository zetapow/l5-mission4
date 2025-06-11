"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const genai_1 = require("@google/genai");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Import config and variables
const config_1 = require("./config");
if (!config_1.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in the environment variables.");
    process.exit(1);
}
// Initialize express and GoogleGenAI
const app = (0, express_1.default)();
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Allow requests from the frontend
}));
// API routes
app.get("/", (req, res) => {
    res.send("Welcome to the Insurance AI Backend!");
});
app.post("/api/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        // input from user or frontend
        // const userInput = req.body.prompt || "hello";
        const contents = req.body.contents || [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
        ];
        const config = {
            responseMimeType: "text/plain",
            systemInstruction: [{ text: config_1.systemInstructions }],
        };
        const response = yield ai.models.generateContent({
            model: config_1.GEMINI_MODEL,
            config,
            contents,
        });
        // Get response from Gemini object
        const reply = (_f = (_e = (_d = (_c = (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) !== null && _f !== void 0 ? _f : "No response from Gemini.";
        res.json({ geminiResponse: reply });
    }
    catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}));
app.listen(config_1.PORT, () => {
    console.log(`Server is running on http://localhost:${config_1.PORT}`);
});
