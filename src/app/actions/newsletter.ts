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
        subject: `Institutional Subscription 🚀`,
        html: `
          <div style="background-color: #000000; color: #ffffff; padding: 60px; font-family: 'Inter', sans-serif; border: 1px solid #333333;">
            <h2 style="color: #ffffff; text-transform: uppercase; letter-spacing: 4px; font-size: 14px; margin-bottom: 30px; border-bottom: 1px solid #333333; padding-bottom: 20px;">New Growth Subscriber</h2>
            <div style="background: rgba(255,255,255,0.03); padding: 30px; border: 1px solid #222222;">
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Identity:</p>
              <p style="margin: 0 0 30px 0; font-size: 18px; font-weight: bold;">${email}</p>
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Timestamp:</p>
              <p style="margin: 0; font-size: 14px; color: #999999;">${date}</p>
            </div>
          </div>
        `
      });

      // User Confirmation
      await transporter.sendMail({
        from: `"Adsgrind Strategy" <${smtpUser}>`,
        to: email,
        subject: `Protocol Initiated: Welcome to Adsgrind`,
        html: `
          <div style="background-color: #000000; color: #ffffff; padding: 80px 40px; font-family: 'Inter', sans-serif; text-align: center; border: 1px solid #333333;">
            <img src="${logoUrl}" width="60" style="margin-bottom: 40px; filter: grayscale(100%);">
            <h1 style="font-weight: bold; text-transform: uppercase; letter-spacing: 8px; font-size: 24px; margin-bottom: 20px;">Protocol Initiated.</h1>
            <p style="color: #666666; font-size: 14px; line-height: 1.8; max-width: 400px; margin: 0 auto 50px auto; text-transform: uppercase; letter-spacing: 1px;">
              You have successfully integrated into the Adsgrind intelligence feed. 
              Engineered performance insights and institutional growth data will follow.
            </p>
            <div style="margin-top: 40px;">
              <a href="https://adsgrind.com" style="display: inline-block; background: #ffffff; color: #000000; padding: 18px 40px; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px;">Explore Infrastructure</a>
            </div>
            <p style="margin-top: 60px; font-size: 10px; color: #333333; letter-spacing: 2px; text-transform: uppercase;">© 2026 Adsgrind. All Rights Reserved.</p>
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
