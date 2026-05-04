"use server";

import nodemailer from 'nodemailer';
import { saveSubscriber } from '@/lib/db';

export async function subscribeToNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: "Enter a valid email" };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Use a transporter for both emails
  let transporter;
  if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '587'),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  const date = new Date().toLocaleString();

  try {
    // 1. Save to JSON DB
    const isNew = await saveSubscriber({
      email,
      subscribedAt: new Date().toISOString()
    });

    if (!isNew) {
      return { success: true, message: "You are already subscribed!" };
    }

    // 2. If SMTP is configured, send emails
    if (transporter) {
      const logoUrl = "https://adsgrind.com/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg";

      // Admin Notification
      await transporter.sendMail({
        from: `"Adsgrind System" <${smtpUser}>`,
        to: 'business@adsgrind.com',
        subject: `New Newsletter Subscriber 🚀`,
        html: `
          <div style="background-color: #0B0B0B; color: #ffffff; padding: 40px; font-family: sans-serif;">
            <h2 style="color: #FF5800;">New Growth Subscriber</h2>
            <p>A new user has subscribed to the Adsgrind newsletter.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Timestamp:</strong> ${date}</p>
            </div>
          </div>
        `
      });

      // User Confirmation
      await transporter.sendMail({
        from: `"Adsgrind Strategy" <${smtpUser}>`,
        to: email,
        subject: `Welcome to Adsgrind`,
        html: `
          <div style="background-color: #0B0B0B; color: #ffffff; padding: 40px; font-family: sans-serif; text-align: center;">
            <img src="${logoUrl}" width="50" style="border-radius: 10px; margin-bottom: 20px;">
            <h2 style="font-style: italic; text-transform: uppercase;">You're In.</h2>
            <p style="color: #A0A0A0; font-size: 16px;">
              Welcome to the inner circle of app growth. 
              Expect performance insights, growth strategies, and real campaign data delivered straight to your terminal.
            </p>
            <div style="margin-top: 30px;">
              <a href="https://adsgrind.com" style="background: #FF5800; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Explore Infrastructure</a>
            </div>
          </div>
        `
      });
    } else {
      console.log(`Newsletter signup (No SMTP): ${email}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
