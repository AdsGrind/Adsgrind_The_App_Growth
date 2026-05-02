"use server";

import nodemailer from 'nodemailer';
import { saveLead } from '@/lib/db';
import crypto from 'crypto';

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  goal?: string;
  markets?: string[];
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP configuration is missing in environment variables");
    return { 
      success: false, 
      error: "Email service is not configured yet. (Missing SMTP credentials in .env)" 
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort || '587'),
    secure: smtpPort === '465', // false for 587, true for 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    debug: true,
    logger: true,
  });

  const { name, email, company, budget, message, goal, markets } = formData;
  const date = new Date().toLocaleString('en-US', { 
    year: 'numeric', month: 'numeric', day: 'numeric', 
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
  });

  try {
    const logoUrl = "https://adsgrind.com/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg";
    
    // Helper to escape HTML to prevent injection in emails
    const escape = (str: string) => str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const safeName = escape(name);
    const safeEmail = escape(email);
    const safeCompany = escape(company);
    const safeBudget = escape(budget);
    const safeGoal = escape(goal || 'Not Specified');
    const safeMarkets = escape(markets?.join(', ') || 'Global / Tier 1');
    const safeMessage = escape(message).replace(/\n/g, '<br>');

    // 1. Admin Email Template (Premium Dark + Red)
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Growth Inquiry</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding-left: 16px !important; padding-right: 16px !important; }
            .brand-text { font-size: 22px !important; }
            .content-padding { padding: 30px 20px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0B0B0B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0B0B; padding: 40px 0;">
          <tr>
            <td align="center">
              <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; margin: 0 auto;">
                <!-- Header / Brand -->
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <img src="${logoUrl}" alt="ADSGRIND" width="40" height="40" style="display: block; border-radius: 10px;">
                          <p style="font-size: 14px; color: #A0A0A0; margin-top: 8px; font-weight: 500; letter-spacing: 0.3px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                            ADSGRIND
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Main Card -->
                <tr>
                  <td class="content-padding" style="background-color: #141414; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <p style="margin: 0; color: #FF5800; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Inquiry Analysis</p>
                          <h1 style="margin: 8px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">NEW STRATEGIC OPPORTUNITY</h1>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding-top: 30px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Partner Details</p>
                                <p style="margin: 6px 0 0 0; font-size: 16px; color: #ffffff; font-weight: 600;">${safeName}</p>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">${safeCompany}</p>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: #FF5800;"><a href="mailto:${safeEmail}" style="color: #FF5800; text-decoration: none;">${safeEmail}</a></p>
                              </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 20px;">
                                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Growth Profile</p>
                                    <p style="margin: 6px 0 0 0; font-size: 14px; color: #ffffff;">Markets: <span style="color: #FF5800; font-weight: 700;">${safeMarkets}</span></p>
                                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #ffffff;">Primary Goal: <strong>${safeGoal}</strong></p>
                                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #ffffff;">Budget: <strong>${safeBudget}</strong></p>
                                </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Additional Intelligence</p>
                                <div style="margin: 12px 0 0 0; padding: 20px; background-color: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; word-break: break-word; overflow-wrap: anywhere;">
                                  ${safeMessage}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 1px;">Adsgrind Intelligence • ${date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Adsgrind Expansion" <${smtpUser}>`,
      to: 'business@adsgrind.com',
      subject: `🌍 Expansion Inquiry: ${safeCompany} - ${safeMarkets}`,
      html: adminHtml,
    });

    // 2. User Auto-Reply (Strategic)
    const userHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We received your expansion request</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0B0B0B; font-family: sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0B0B; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #141414; border-radius: 16px; padding: 60px 50px; text-align: center;">
                <tr>
                  <td>
                    <img src="${logoUrl}" alt="ADSGRIND" width="40" height="40" style="border-radius: 10px; margin-bottom: 24px;">
                    <h2 style="color: #ffffff; font-size: 28px; margin: 0; text-transform: uppercase; font-style: italic;">Expansion Strategy Requested</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin-top: 24px;">
                      Hi ${safeName}, thanks for requesting a market entry strategy for <strong>${safeCompany}</strong> in <strong>${safeMarkets}</strong>.
                    </p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin-top: 16px;">
                      Our global markets team is preparing localized traffic insights and acquisition benchmarks tailored to your ${safeGoal} objectives.
                    </p>
                    <div style="margin-top: 40px;">
                      <a href="https://adsgrind.com" style="background-color: #FF5800; color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 800; text-decoration: none; display: inline-block;">Explore Global Intelligence</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Adsgrind Team" <${smtpUser}>`,
      to: email,
      subject: 'Global Market Strategy Request Received - Adsgrind',
      html: userHtml,
    });

    // 3. Save to DB
    await saveLead({
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      company,
      budget,
      message: `MARKETS: ${safeMarkets} | GOAL: ${goal} | MESSAGE: ${message}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return { success: false, error: `Failed to send email: ${error.message || 'Unknown error'}` };
  }
}
