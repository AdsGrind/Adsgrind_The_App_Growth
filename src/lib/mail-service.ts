/**
 * lib/mail-service.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Utility for sending chat transcripts and AI-related notifications.
 * Reuses SMTP configuration from .env.local
 * ─────────────────────────────────────────────────────────────────────────────
 */

import nodemailer from 'nodemailer';
import { ChatMessage } from './ai-service';

export async function sendChatTranscript(data: {
  sessionId: string;
  messages: ChatMessage[];
  userInfo?: { name?: string; email?: string; company?: string };
  isHotLead?: boolean;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[Mail] SMTP not configured, skipping chat transcript email.");
    return { success: false, error: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort || '587'),
    secure: smtpPort === '465',
    auth: { user: smtpUser, pass: smtpPass },
    debug: true,
    logger: true,
  });

  const { sessionId, messages, userInfo, isHotLead } = data;
  const date = new Date().toLocaleString('en-US', { 
    year: 'numeric', month: 'numeric', day: 'numeric', 
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
  });

  // Format messages into HTML
  const transcriptHtml = messages
    .filter(m => m.role !== 'system')
    .map(m => {
      const isUser = m.role === 'user';
      return `
        <div style="margin-bottom: 16px; text-align: ${isUser ? 'right' : 'left'};">
          <p style="margin: 0; font-size: 10px; font-weight: 700; text-transform: uppercase; color: ${isUser ? '#FF5800' : '#A0A0A0'}; letter-spacing: 1px;">
            ${isUser ? 'USER' : 'ADSGRIND AI'}
          </p>
          <div style="
            display: inline-block;
            margin-top: 4px;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            background-color: ${isUser ? '#FF5800' : 'rgba(255,255,255,0.05)'};
            color: ${isUser ? '#ffffff' : '#e0e0e0'};
            border: 1px solid ${isUser ? '#FF5800' : 'rgba(255,255,255,0.1)'};
            max-width: 85%;
            text-align: left;
          ">
            ${m.content.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    })
    .join('');

  const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="margin: 0; padding: 40px 20px; background-color: #0B0B0B; font-family: sans-serif; color: #ffffff;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden;">
        <!-- Header -->
        <div style="padding: 30px; background-color: ${isHotLead ? '#FF1D23' : '#1a1a1a'}; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <p style="margin: 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.7);">
            ${isHotLead ? '🔥 HOT LEAD DETECTED' : 'NEW AI CONVERSATION'}
          </p>
          <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 800;">${userInfo?.name || 'Anonymous Partner'}</h1>
        </div>

        <!-- Info Grid -->
        <div style="padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom: 20px;">
                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Session Context</p>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #ffffff;">ID: <span style="font-family: monospace; color: #FF5800;">${sessionId}</span></p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">${date}</p>
              </td>
            </tr>
            ${userInfo?.email ? `
            <tr>
              <td style="padding-bottom: 20px;">
                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Partner Contact</p>
                <p style="margin: 6px 0 0 0; font-size: 16px; color: #FF5800; font-weight: 700;">${userInfo.email}</p>
                ${userInfo.company ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">${userInfo.company}</p>` : ''}
              </td>
            </tr>` : ''}
          </table>
        </div>

        <!-- Transcript -->
        <div style="padding: 30px; background-color: #0d0d0d;">
          <p style="margin: 0 0 24px 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Full Transcript</p>
          ${transcriptHtml}
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #141414; border-top: 1px solid rgba(255,255,255,0.05);">
          <p style="margin: 0; font-size: 10px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 1px;">Adsgrind Intelligence • Real-time Lead Capture</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Adsgrind Intelligence" <${smtpUser}>`,
      to: 'business@adsgrind.com',
      subject: `${isHotLead ? '🔥 Hot Lead:' : '💬 AI Chat:'} ${userInfo?.name || 'New Inquiry'} [${sessionId.slice(-6)}]`,
      html: adminHtml,
    });
    return { success: true };
  } catch (err) {
    console.error("[Mail] Failed to send chat transcript:", err);
    return { success: false, error: err };
  }
}
