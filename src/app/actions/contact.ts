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

    // 1. Admin Email Template (Institutional Monochrome)
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Growth Inquiry</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 60px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; margin: 0 auto; border: 1px solid #222222;">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 40px; border-bottom: 1px solid #111111;">
                    <img src="${logoUrl}" alt="ADSGRIND" width="40" height="40" style="filter: grayscale(100%);">
                    <p style="font-size: 11px; color: #666666; margin-top: 15px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase;">
                      Institutional Hub
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 60px 50px; background-color: #050505;">
                    <p style="margin: 0; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; opacity: 0.3;">Transmission Analysis</p>
                    <h1 style="margin: 15px 0 40px 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: -0.02em; text-transform: uppercase;">New Strategic Lead</h1>
                    
                    <div style="border-left: 2px solid #333333; padding-left: 30px; margin-bottom: 50px;">
                      <p style="margin: 0 0 10px 0; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Identity</p>
                      <p style="margin: 0 0 25px 0; font-size: 18px; color: #ffffff; font-weight: bold;">${safeName}</p>
                      
                      <p style="margin: 0 0 10px 0; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Organization</p>
                      <p style="margin: 0 0 25px 0; font-size: 16px; color: #ffffff;">${safeCompany}</p>
                      
                      <p style="margin: 0 0 10px 0; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Protocol Address</p>
                      <p style="margin: 0 0 25px 0; font-size: 14px; color: #ffffff;">${safeEmail}</p>

                      <p style="margin: 0 0 10px 0; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Budget Level</p>
                      <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: bold;">${safeBudget}</p>
                    </div>

                    <p style="margin: 0 0 10px 0; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Mission Brief</p>
                    <div style="padding: 30px; background-color: #000000; border: 1px solid #111111; font-size: 14px; color: #999999; line-height: 1.8;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 30px; border-top: 1px solid #111111;">
                    <p style="margin: 0; font-size: 9px; color: #333333; text-transform: uppercase; letter-spacing: 3px;">Adsgrind System • ${date}</p>
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
      from: `"Adsgrind Transmission" <${smtpUser}>`,
      to: 'business@adsgrind.com',
      subject: `🚨 Strategic Transmission: ${safeCompany}`,
      html: adminHtml,
    });

    // 2. User Auto-Reply (Institutional)
    const userHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transmission Received</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 60px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #050505; border: 1px solid #222222; text-align: center; padding: 80px 40px;">
                <tr>
                  <td>
                    <img src="${logoUrl}" alt="ADSGRIND" width="50" style="filter: grayscale(100%); margin-bottom: 40px;">
                    <h1 style="color: #ffffff; font-size: 26px; margin: 0; text-transform: uppercase; letter-spacing: 6px; font-weight: bold;">Protocol Logged</h1>
                    <p style="color: #666666; font-size: 14px; line-height: 1.8; margin: 30px auto; max-width: 400px; text-transform: uppercase; letter-spacing: 1px;">
                      Hi ${safeName}, we have received your strategic inquiry for <strong>${safeCompany}</strong>. 
                      A growth specialist will contact you within 24 hours to initiate deployment.
                    </p>
                    <div style="margin-top: 50px;">
                      <a href="https://adsgrind.com" style="background-color: #ffffff; color: #000000; padding: 18px 40px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">Review Infrastructure</a>
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
      from: `"Adsgrind Hub" <${smtpUser}>`,
      to: email,
      subject: 'Transmission Received: Institutional Growth Protocol',
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
