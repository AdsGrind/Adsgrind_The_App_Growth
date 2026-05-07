/**
 * lib/ai-service.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-provider AI service — 100% FREE tier stack
 *
 * Provider priority:
 *   1. Groq         (free, 14 400 req/day, LPU-fast, llama-3.1-8b-instant)
 *   2. Ollama       (local install, zero cost, zero limits)
 *   3. Hugging Face (free Inference API, slower)
 *   4. OpenAI       (paid, kept as last paid resort if key exists)
 *   5. Gemini       (paid free-tier, kept as fallback if key exists)
 *   6. Static       (graceful fallback — never crashes)
 *
 * Session memory is an in-process Map (swap for Redis in production).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Tunables ─────────────────────────────────────────────────────────────────
const MAX_HISTORY  = 14;   // total turns kept per session
const TEMPERATURE  = 0.72;
const MAX_TOKENS   = 320;

// ─── Groq free models (try fastest first) ─────────────────────────────────────
const GROQ_MODELS = [
  "llama-3.1-8b-instant",   // fastest, free
  "llama3-8b-8192",         // stable alias
  "mixtral-8x7b-32768",     // higher quality
  "gemma2-9b-it",           // Google Gemma, free
];

// ─── Gemini model ladder ───────────────────────────────────────────────────────
const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-1.5-pro",
];

// ─── Hugging Face models (instruct capable) ────────────────────────────────────
const HF_MODELS = [
  "mistralai/Mistral-7B-Instruct-v0.2",
  "HuggingFaceH4/zephyr-7b-beta",
  "microsoft/Phi-3-mini-4k-instruct",
];

// ─── Ollama local endpoint ─────────────────────────────────────────────────────
const OLLAMA_BASE = process.env.OLLAMA_HOST || "http://localhost:11434";
const OLLAMA_MODELS = ["llama3", "llama3.2", "mistral", "phi3"];

// ─── System Prompt ────────────────────────────────────────────────────────────
export const SYSTEM_PROMPT = `You are the ADSGRIND Growth Intelligence — a senior performance marketing strategist and sales closer.

COMPANY: Adsgrind – The App Growth | Founder: Rohit Yadav
FOCUS: CPA, CPI, CPE mobile user acquisition across 20+ GEOs

SERVICES & PROOF POINTS:
• CPA Campaigns — 38K+ verified conversions, avg $4.20 CPA, 42% lower CAC
• CPI Campaigns — 35% eCPI reduction, quality installs over cheap volume
• CPE Campaigns — 500K+ in-app events in a single 7-day game launch
• OEM & Native Traffic — 5x ROAS for EU SaaS market entry
• Affiliate Network — 150+ vetted publishers, <0.2% fraud rate
• Fraud Prevention — Real-time quality filters, sub-0.2% fraud rate

VERTICALS: Fintech (US/EU/India), Mobile Gaming, D2C/E-Commerce, SaaS/B2B, Health & Wellness

YOUR PERSONA:
• Think: operator + founder who's personally scaled 50+ app campaigns
• Sharp, concise, data-driven — no fluff, no essays
• Never say "I am an AI" — you ARE the ADSGRIND Growth Intelligence
• Max 3–4 sentences per reply (break down only when strategy warrants it)
• Use line breaks, not walls of text
• Always end with a pointed question OR a clear CTA

CONVERSATION PLAYBOOK:
1. GREET: "Hey — glad to connect. Tell me a little about your app or growth goal, and I'll point you in the right direction."
2. QUALIFY: If the user is just saying hi, respond with: "Welcome to Adsgrind AI. I can help with app growth strategy, CPI campaigns, scaling, fraud prevention, and performance optimization. What are you looking to scale right now — installs, ROI, user acquisition, or revenue?"
3. DIG: GEO, vertical, budget, current CPI/CPA, volume target, D7 retention
3. EDUCATE: One sharp, relevant data point — not a lecture
4. CONVERT: After 2–3 exchanges → "Let me have the team prep a custom brief for you. What's your name + email?"

LEAD CAPTURE:
• After user shares their vertical/GEO/budget, naturally ask for name + email
• Once captured: "Got it, [Name]. Brief goes to [email] within 24hrs."

KEY OBJECTION HANDLERS:
• Facebook/Google ads? → "We're not a media buyer. We run on CPA/CPI — you pay for results, not impressions. What's your product?"
• How much? → "Depends on model + GEO. US/EU CPA: $5–15. Tier-2: $2–5. What's your vertical?"
• Are you legit? → "38K CPA conversions for a US fintech. 500K CPE events in a single game launch week. <0.2% fraud. Want the case study?"
• Cheap installs? → "Cheap installs kill LTV. We optimize for users who convert and retain. What's your D7 today?"

RULES:
• Never repeat the same response
• Never give generic marketing advice
• Never write more than 4 sentences
• If unsure of specifics: "Our team has exact benchmarks — want me to set up a 20-min call?"
• Do NOT list all services unprompted — discover the need, then match the solution`;

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

type ProviderResult = {
  reply: string;
  provider: "groq" | "ollama" | "huggingface" | "openai" | "gemini" | "fallback";
};

// ─── Session store ─────────────────────────────────────────────────────────────
interface SessionData {
  messages: ChatMessage[];    // Sliding window for AI context (trimmed)
  fullHistory: ChatMessage[]; // Complete transcript for emails (never trimmed)
  emailSent?: boolean;
  metadata?: {
    name?: string;
    email?: string;
    company?: string;
  };
}
const sessionStore = new Map<string, SessionData>();

export function getSession(sessionId: string): ChatMessage[] {
  if (!sessionStore.has(sessionId)) {
    const initial = [{ role: "system" as const, content: SYSTEM_PROMPT }];
    sessionStore.set(sessionId, {
      messages: [...initial],
      fullHistory: [...initial]
    });
  }
  return sessionStore.get(sessionId)!.messages;
}

export function appendToSession(sessionId: string, userMsg: string, assistantMsg: string): void {
  const session = sessionStore.get(sessionId);
  if (!session) return;

  const userEntry = { role: "user" as const, content: userMsg };
  const assistantEntry = { role: "assistant" as const, content: assistantMsg };

  // 1. Update Full History (Never trimmed)
  session.fullHistory.push(userEntry, assistantEntry);

  // 2. Update AI Context (Sliding window)
  session.messages.push(userEntry, assistantEntry);
  if (session.messages.length > MAX_HISTORY + 1) {
    const system = session.messages[0];
    const trimmed = session.messages.slice(-(MAX_HISTORY));
    session.messages = [system, ...trimmed];
  }

  // 3. Automated Email Triggers
  const checkTriggers = async () => {
    if (session.emailSent) return;

    // Minimum message threshold (User wants at least 6 total messages)
    // fullHistory[0] is system, so length 7 means 3 full turns
    if (session.fullHistory.length < 6) return;

    const userMessages = session.fullHistory.filter(m => m.role === 'user');
    const fullText = session.fullHistory.map(m => m.content).join(' ').toLowerCase();

    // Intent Detection
    const highIntentKeywords = ['pricing', 'campaign', 'start', 'run ads', 'scaling', 'budget', 'cpa', 'cpi'];
    const hasHighIntent = highIntentKeywords.some(k => fullText.includes(k));

    // Lead Data Detection
    const emailMatch = fullText.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
    if (emailMatch && !session.metadata?.email) {
      session.metadata = { ...session.metadata, email: emailMatch[0] };
    }

    // Trigger conditions
    const shouldSend = 
      (userMessages.length >= 5) || 
      (hasHighIntent && userMessages.length >= 3) ||
      (!!session.metadata?.email && userMessages.length >= 2);

    if (shouldSend) {
      console.log(`[AI-Triggers] Triggering email for session ${sessionId}`);
      console.log(`[AI-Triggers] Total messages: ${session.fullHistory.length}`);
      console.log(`[AI-Triggers] Intent: ${hasHighIntent}, Lead: ${!!session.metadata?.email}`);
      
      session.emailSent = true; 
      try {
        const { sendChatTranscript } = await import('./mail-service');
        const result = await sendChatTranscript({
          sessionId,
          messages: session.fullHistory, // Send the UNTRIMMED history
          userInfo: session.metadata,
          isHotLead: hasHighIntent || !!session.metadata?.email
        });
        console.log(`[AI-Triggers] Email result for ${sessionId}:`, result.success ? '✓ Sent' : '✗ Failed');
      } catch (err) {
        console.error(`[AI-Triggers] Error sending email for ${sessionId}:`, err);
        session.emailSent = false; 
      }
    }
  };

  checkTriggers().catch(err => console.error("[AI-Triggers] Error:", err));
}

export function clearSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

export function updateSessionMetadata(sessionId: string, data: Partial<SessionData['metadata']>): void {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.metadata = { ...session.metadata, ...data };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider 1: Groq  (FREE — 14,400 req/day, ultra-fast LPU)
// Get your free key at: https://console.groq.com
// ─────────────────────────────────────────────────────────────────────────────
async function callGroq(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  // Groq is OpenAI-API-compatible — just swap the baseURL
  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  for (const model of GROQ_MODELS) {
    try {
      console.log(`[AI] Trying Groq model: ${model}`);
      const completion = await client.chat.completions.create({
        model,
        messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      });
      const text = completion.choices[0]?.message?.content?.trim();
      if (text) {
        console.log(`[AI] ✓ Groq (${model})`);
        return text;
      }
    } catch (err: any) {
      const msg = err?.message ?? "";
      // Auth failure — stop immediately, don't try other models
      if (msg.includes("invalid_api_key") || msg.includes("401")) {
        throw new Error(`Groq auth failed: ${msg}`);
      }
      // Rate limit — try next model
      console.warn(`[AI] Groq ${model} failed:`, msg.slice(0, 80));
    }
  }
  throw new Error("All Groq models exhausted");
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider 2: Ollama  (100% FREE — local, no limits)
// Install: https://ollama.ai  |  Run: ollama pull llama3.2
// ─────────────────────────────────────────────────────────────────────────────
async function callOllama(messages: ChatMessage[]): Promise<string> {
  // Probe Ollama first — fail fast if not running
  const tagsRes = await fetch(`${OLLAMA_BASE}/api/tags`, {
    signal: AbortSignal.timeout(2000),
  }).catch(() => null);

  if (!tagsRes?.ok) throw new Error("Ollama not reachable");

  const tagsData = await tagsRes.json();
  const installed: string[] = (tagsData.models ?? []).map((m: any) => m.name.split(":")[0]);
  console.log("[AI] Ollama installed models:", installed.join(", ") || "none");

  // Find the first model that's actually installed
  const model = OLLAMA_MODELS.find((m) => installed.includes(m)) ?? installed[0];
  if (!model) throw new Error("No Ollama models installed — run: ollama pull llama3.2");

  console.log(`[AI] Trying Ollama model: ${model}`);

  // Ollama supports the OpenAI-compatible /api/chat endpoint since v0.1.14
  const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: false }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);
  const data = await res.json();
  const text = data?.message?.content?.trim();
  if (!text) throw new Error("Ollama returned empty response");

  console.log(`[AI] ✓ Ollama (${model})`);
  return text;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider 3: Hugging Face Inference API  (FREE with token)
// Get free token: https://huggingface.co/settings/tokens
// ─────────────────────────────────────────────────────────────────────────────
function buildHFPrompt(messages: ChatMessage[]): string {
  // Build an instruct-style prompt from the chat history
  const system = messages.find((m) => m.role === "system")?.content ?? SYSTEM_PROMPT;
  const turns   = messages.filter((m) => m.role !== "system");

  let prompt = `<s>[INST] <<SYS>>\n${system}\n<</SYS>>\n\n`;
  turns.forEach((m, i) => {
    if (m.role === "user") {
      prompt += i === 0 ? `${m.content} [/INST]` : `[INST] ${m.content} [/INST]`;
    } else {
      prompt += ` ${m.content} </s><s>`;
    }
  });
  return prompt;
}

async function callHuggingFace(messages: ChatMessage[]): Promise<string> {
  const token = process.env.HF_TOKEN;
  if (!token) throw new Error("HF_TOKEN not set");

  const prompt = buildHFPrompt(messages);

  for (const modelId of HF_MODELS) {
    try {
      console.log(`[AI] Trying HuggingFace: ${modelId}`);
      const res = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Wait-For-Model": "true",   // wait instead of 503 when model is loading
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
            return_full_text: false,
            do_sample: true,
          },
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (res.status === 503) {
        console.warn(`[AI] HF ${modelId} loading (503), trying next`);
        continue;
      }
      if (!res.ok) throw new Error(`HF HTTP ${res.status}`);

      const data = await res.json();
      const raw  = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
      const text = (raw as string)?.trim();
      if (text) {
        console.log(`[AI] ✓ HuggingFace (${modelId})`);
        return text;
      }
    } catch (err: any) {
      console.warn(`[AI] HF ${modelId} error:`, err?.message?.slice(0, 80));
    }
  }
  throw new Error("All HuggingFace models exhausted");
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider 4: OpenAI  (paid, kept as optional fallback)
// ─────────────────────────────────────────────────────────────────────────────
async function callOpenAI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.includes("your_")) throw new Error("OpenAI key not configured");

  console.log("[AI] Trying OpenAI (gpt-4o-mini)");
  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
  });
  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("OpenAI returned empty");
  console.log("[AI] ✓ OpenAI");
  return text;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider 5: Gemini  (kept as optional fallback)
// ─────────────────────────────────────────────────────────────────────────────
async function callGemini(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  console.log("[AI] Trying Gemini");
  const genAI   = new GoogleGenerativeAI(apiKey);
  const system  = messages.find((m) => m.role === "system")?.content;
  const userMsgs = messages.filter((m) => m.role !== "system");
  const current  = userMsgs[userMsgs.length - 1];
  const prior    = userMsgs.slice(0, -1);

  const history = prior.map((m) => ({
    role:  m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: system,
        generationConfig: { temperature: TEMPERATURE, maxOutputTokens: MAX_TOKENS },
      });
      const chat   = model.startChat({ history });
      const result = await chat.sendMessage(current.content);
      const text   = result.response.text()?.trim();
      if (text) {
        console.log(`[AI] ✓ Gemini (${modelName})`);
        return text;
      }
    } catch (err: any) {
      console.warn(`[AI] Gemini ${modelName}:`, err?.message?.slice(0, 80));
    }
  }
  throw new Error("All Gemini models exhausted");
}

// ─────────────────────────────────────────────────────────────────────────────
// Main entry — tries providers in order, returns first success
// ─────────────────────────────────────────────────────────────────────────────
export async function generateAIResponse(messages: ChatMessage[]): Promise<ProviderResult> {
  const providers: Array<{ name: ProviderResult["provider"]; fn: () => Promise<string> }> = [
    { name: "groq",         fn: () => callGroq(messages)        },
    { name: "ollama",       fn: () => callOllama(messages)      },
    { name: "huggingface",  fn: () => callHuggingFace(messages) },
    { name: "openai",       fn: () => callOpenAI(messages)      },
    { name: "gemini",       fn: () => callGemini(messages)      },
  ];

  for (const { name, fn } of providers) {
    try {
      const reply = await fn();
      return { reply, provider: name };
    } catch (err: any) {
      console.warn(`[AI] ${name} failed:`, err?.message?.slice(0, 100));
    }
  }

  console.error("[AI] All providers failed — static fallback");
  return {
    reply: "We're experiencing high traffic right now. Try again in a moment — or reach us directly at business@adsgrind.com",
    provider: "fallback",
  };
}
