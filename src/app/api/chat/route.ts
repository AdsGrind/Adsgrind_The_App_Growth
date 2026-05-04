/**
 * app/api/chat/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/chat
 *
 * Request body:
 *   { message: string; sessionId: string }
 *
 * Response:
 *   { reply: string; provider: "openai" | "gemini" | "fallback" }
 *
 * Errors:
 *   400 — missing required fields
 *   405 — non-POST methods
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateAIResponse,
  getSession,
  appendToSession,
} from "@/lib/ai-service";

// Track per-session fallback counts to avoid spamming the same message
const fallbackCount = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body as {
      message?: string;
      sessionId?: string;
    };

    // ── Validation ──────────────────────────────────────────────────────────
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }
    if (!sessionId?.trim()) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // ── Build message array (system + history + new user msg) ───────────────
    const history = getSession(sessionId);
    const messages = [
      ...history,
      { role: "user" as const, content: message.trim() },
    ];

    // ── Generate response ───────────────────────────────────────────────────
    const { reply, provider } = await generateAIResponse(messages);

    // ── Suppress repeated fallbacks ─────────────────────────────────────────
    if (provider === "fallback") {
      const count = (fallbackCount.get(sessionId) ?? 0) + 1;
      fallbackCount.set(sessionId, count);
      // After 2 consecutive fallbacks, escalate to WhatsApp CTA
      if (count > 1) {
        return NextResponse.json({
          reply:
            "Still having issues connecting. The fastest way to reach us is WhatsApp: wa.me/919625982835",
          provider: "fallback",
        });
      }
    } else {
      // Reset counter on successful response
      fallbackCount.delete(sessionId);
      // Persist exchange to session memory
      appendToSession(sessionId, message.trim(), reply);
    }

    return NextResponse.json({ reply, provider });
  } catch (err: any) {
    console.error("[/api/chat] Unhandled error:", err?.message);
    return NextResponse.json(
      {
        reply:
          "Something went wrong on our end. Reach us at business@adsgrind.com",
        provider: "fallback",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", endpoint: "POST /api/chat" },
    { status: 200 }
  );
}
