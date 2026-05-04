// ============================================
// 📁 app/api/send-itinerary/route.ts
// Email API — nodemailer se Gmail bhejo
// ============================================
// .env.local mein ye 3 lines add karo:
//
//   EMAIL_USER=tumhara@gmail.com
//   EMAIL_PASS=xxxx xxxx xxxx xxxx   ← Gmail App Password (16 chars)
//   EMAIL_TO=jahan@receive.com
//
// Gmail App Password kaise banao:
//   myaccount.google.com → Security → 2-Step Verification ON karo
//   → App Passwords → "Mail" select → Generate
// ============================================

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, tourTitle, days } = await req.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const receivedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif; background:#f1f5f9; padding:32px 16px; }
    .wrapper { max-width:520px; margin:0 auto; }
    .card { background:white; border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.10); }

    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #60a5fa 100%);
      padding: 32px;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content:'✈';
      position:absolute;
      right:24px; top:16px;
      font-size:64px;
      opacity:0.12;
    }
    .header-badge {
      display:inline-block;
      background:rgba(255,255,255,0.2);
      border:1px solid rgba(255,255,255,0.3);
      border-radius:20px;
      padding:4px 14px;
      font-size:12px;
      font-weight:600;
      letter-spacing:1px;
      text-transform:uppercase;
      margin-bottom:12px;
    }
    .header h1 { font-size:22px; font-weight:700; margin-bottom:6px; }
    .header p  { font-size:13px; opacity:0.8; }

    .body { padding:32px; }

    .tour-tag {
      display:inline-flex;
      align-items:center;
      gap:8px;
      background:#eff6ff;
      border:1px solid #bfdbfe;
      color:#1d4ed8;
      border-radius:12px;
      padding:10px 16px;
      font-size:14px;
      font-weight:600;
      margin-bottom:24px;
      width:100%;
    }

    .field { margin-bottom:20px; }
    .field-label {
      font-size:10px;
      font-weight:700;
      text-transform:uppercase;
      letter-spacing:1.5px;
      color:#94a3b8;
      margin-bottom:5px;
    }
    .field-value {
      font-size:15px;
      color:#1e293b;
      font-weight:500;
      display:flex;
      align-items:center;
      gap:8px;
    }

    .divider { height:1px; background:#f1f5f9; margin:24px 0; }

    .cta {
      background:#f8faff;
      border:1px solid #e0eaff;
      border-radius:12px;
      padding:16px;
      text-align:center;
      color:#475569;
      font-size:13px;
      line-height:1.6;
    }
    .cta strong { color:#1d4ed8; }

    .footer {
      background:#f8faff;
      border-top:1px solid #e2e8f0;
      padding:16px 32px;
      text-align:center;
      font-size:11px;
      color:#94a3b8;
    }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="card">

    <div class="header">
      <div class="header-badge">🔔 New Lead</div>
      <h1>Itinerary Download Request</h1>
      <p>Someone just downloaded the tour itinerary from your website</p>
    </div>

    <div class="body">

      <div class="tour-tag">
        📍 ${tourTitle}
        ${days ? `&nbsp;·&nbsp; 🗓️ ${days}` : ""}
      </div>

      <div class="field">
        <div class="field-label">Traveller Name</div>
        <div class="field-value">👤 ${name}</div>
      </div>

      <div class="field">
        <div class="field-label">Mobile Number</div>
        <div class="field-value">📞 +91 ${phone}</div>
      </div>

      ${email ? `
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">📧 ${email}</div>
      </div>` : ""}

      <div class="divider"></div>

      <div class="field">
        <div class="field-label">Received At</div>
        <div class="field-value" style="font-size:13px;color:#64748b;">🕐 ${receivedAt} (IST)</div>
      </div>

      <div class="cta">
        💡 <strong>Tip:</strong> Call within 30 minutes for highest conversion rate.<br/>
        This lead is interested in <strong>${tourTitle}</strong>.
      </div>

    </div>

    <div class="footer">
      Sent automatically from your travel website · Do not reply to this email
    </div>

  </div>
</div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Travel Leads 🌍" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `📩 New Lead: ${tourTitle} — ${name} (+91${phone})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-itinerary] Error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Check server logs." },
      { status: 500 }
    );
  }
}