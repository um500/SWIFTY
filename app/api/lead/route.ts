// app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, address, tourName } = body;

    // ── Validate input ──
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });
    }
    if (!phone || !/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Valid 10-digit phone number is required." }, { status: 400 });
    }
    if (!address || typeof address !== "string" || address.trim().length < 3) {
      return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }

    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // ── Send email (non-blocking — don't fail the request if email fails) ──
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

    if (emailUser && emailPass && notifyEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        await transporter.sendMail({
          from: `"Swasti Tours Leads" <${emailUser}>`,
          to: notifyEmail,
          subject: `New Tour Lead — ${tourName ?? "Unknown Tour"}`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
              <div style="background:#3b4fa8;padding:20px 24px;">
                <h2 style="color:#fff;margin:0;font-size:18px;">New Tour Lead</h2>
              </div>
              <div style="padding:24px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td style="padding:8px 0;color:#666;width:120px;">Tour</td>
                    <td style="padding:8px 0;font-weight:600;color:#111;">${tourName ?? "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666;">Name</td>
                    <td style="padding:8px 0;font-weight:600;color:#111;">${name.trim()}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666;">Phone</td>
                    <td style="padding:8px 0;font-weight:600;color:#111;">${phone.trim()}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666;">Address</td>
                    <td style="padding:8px 0;font-weight:600;color:#111;">${address.trim()}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666;">Date & Time</td>
                    <td style="padding:8px 0;color:#111;">${now} IST</td>
                  </tr>
                </table>
              </div>
              <div style="background:#f9fafb;padding:12px 24px;font-size:12px;color:#999;">
                Swasti Tours & Travels — Lead Notification
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // Email failed — log it but still let the user download the PDF
        console.error("Email send failed:", emailErr);
      }
    } else {
      console.warn("Email env vars not set — skipping email. Set EMAIL_USER, EMAIL_PASS, LEAD_NOTIFY_EMAIL in .env.local");
    }

    // Always return success so the PDF opens
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}