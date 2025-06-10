export type Message = {
   role: "user" | "model";
   text: string;
};

// handle gemini format
export function toGeminiFormat(messages: Message[]) {
   return messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.text }],
   }));
}
