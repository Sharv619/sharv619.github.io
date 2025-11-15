import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model;
  private chat;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    this.chat = this.model.startChat();
  }

  async sendMessage(message: string, systemPrompt?: string) {
    try {
      const finalMessage = systemPrompt ? `${systemPrompt}\n\n${message}` : message;
      const response = await this.chat.sendMessage(finalMessage);
      return response.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Sorry, I'm having trouble connecting. Please try again.");
    }
  }

  // Create a new chat session (for starting fresh conversations)
  resetChat() {
    this.chat = this.model.startChat();
  }
}

export const geminiService = new GeminiService();
