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

  const { name, email, company, budget, message } = formData;
  const date = new Date().toLocaleString('en-US', { 
    year: 'numeric', month: 'numeric', day: 'numeric', 
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
  });

  console.log(`Attempting to send email from ${smtpUser} to business@adsgrind.com and user ${email}`);

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
    const safeMessage = escape(message).replace(/\n/g, '<br>');

    // 1. Admin Email Template (Premium Dark + Red)
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Intelligence</title>
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
                          <p style="margin: 0; color: #FF5800; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Lead Notification</p>
                          <h1 style="margin: 8px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">NEW GROWTH INQUIRY</h1>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding-top: 30px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Contact Details</p>
                                <p style="margin: 6px 0 0 0; font-size: 16px; color: #ffffff; font-weight: 600;">${safeName}</p>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">${safeCompany}</p>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: #FF5800;"><a href="mailto:${safeEmail}" style="color: #FF5800; text-decoration: none;">${safeEmail}</a></p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Objectives</p>
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

    console.log('Sending admin notification email...');
    await transporter.sendMail({
      from: `"Adsgrind Lead" <${smtpUser}>`,
      to: 'business@adsgrind.com',
      subject: `🔥 New Lead: ${safeCompany} - ${safeName}`,
      html: adminHtml,
    });
    console.log('Admin notification sent successfully.');

    // 2. User Auto-Reply Template (Premium Dark + Red)
    const userHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We received your inquiry</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding-left: 16px !important; padding-right: 16px !important; }
            .brand-text { font-size: 22px !important; }
            .content-padding { padding: 40px 20px !important; }
            .heading { font-size: 24px !important; }
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
                  <td class="content-padding" style="background-color: #141414; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 60px 50px; text-align: center;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <h2 class="heading" style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; line-height: 1.2; text-transform: uppercase; font-style: italic;">HI ${safeName.toUpperCase()}!</h2>
                          <p style="margin: 24px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                            Thanks for reaching out to <strong>Adsgrind</strong>. We've received your growth inquiry for <strong>${safeCompany}</strong> and our strategy team is already reviewing your request.
                          </p>
                          <p style="margin: 16px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                            A Growth Strategist will contact you within 24 hours with a custom approach designed to scale your app beyond limits.
                          </p>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 40px;">
                            <tr>
                              <td align="center">
                                <a href="https://adsgrind.com" style="display: inline-block; background-color: #FF5800; color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 800; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(255, 88, 0, 0.2);">Explore Intelligence HQ</a>
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
                  <td align="center" style="padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 40px;">
                    <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 700; letter-spacing: 0.5px;">The Adsgrind Team</p>
                    <p style="margin: 6px 0 0 0; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px;">Scale Without Limits • adsgrind.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    console.log(`Sending user auto-reply to ${safeEmail}...`);
    await transporter.sendMail({
      from: `"Adsgrind Team" <${smtpUser}>`,
      to: email,
      subject: 'We received your inquiry - Adsgrind',
      html: userHtml,
    });
    console.log('User auto-reply sent successfully.');

    // 3. Save to DB for CRM
    await saveLead({
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      company,
      budget,
      message,
      status: 'New',
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return { success: false, error: `Failed to send email: ${error.message || 'Unknown error'}` };
  }
}
