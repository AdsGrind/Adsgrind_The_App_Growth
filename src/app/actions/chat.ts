"use server";

/**
 * app/actions/chat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server actions used by the chat widget.
 * getChatResponse now delegates to the multi-provider AI service so the same
 * logic (OpenAI → Gemini → fallback) is used whether the widget calls a server
 * action or the /api/chat REST endpoint.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { generateAIResponse, SYSTEM_PROMPT, ChatMessage as ServiceMessage, updateSessionMetadata } from "@/lib/ai-service";
import { saveLead } from "@/lib/db";
import crypto from "crypto";

/** Shape the widget passes per message */
export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/**
 * Primary chat function called by the widget.
 *
 * Converts the widget's { role: "user"|"model", text } history format into
 * the OpenAI-compatible { role: "user"|"assistant", content } format, runs it
 * through the multi-provider service, and returns the plain text reply.
 *
 * Special sentinel values returned on non-recoverable errors:
 *   "QUOTA_EXCEEDED" — both providers hit quota
 *   "API_ERROR"      — unexpected failure
 */
export async function getChatResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  // Convert widget history format → service format
  const serviceMessages: ServiceMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((m) => ({
      role: (m.role === "model" ? "assistant" : "user") as "user" | "assistant",
      content: m.text,
    })),
    { role: "user", content: message },
  ];

  const { reply, provider } = await generateAIResponse(serviceMessages);

  if (provider === "fallback") {
    // Let the widget decide how to display this (it shows a WhatsApp card)
    return "QUOTA_EXCEEDED";
  }

  return reply;
}

/** Save a lead captured through the chat widget into the CRM */
export async function saveChatLead(data: {
  name: string;
  email: string;
  company?: string;
  summary?: string;
  sessionId?: string;
}): Promise<{ success: boolean }> {
  try {
    // Sync with session metadata so transcript emails include info
    if (data.sessionId) {
      updateSessionMetadata(data.sessionId, {
        name: data.name,
        email: data.email,
        company: data.company
      });
    }

    await saveLead({
      id: crypto.randomUUID?.() ?? `chat_${Date.now()}`,
      name: data.name,
      email: data.email,
      company: data.company || "Not provided",
      budget: "Via Chat",
      message: `[CHAT LEAD] ${data.summary || "Captured via AI chat widget"}`,
      status: "New",
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err) {
    console.error("saveChatLead error:", err);
    return { success: false };
  }
}
