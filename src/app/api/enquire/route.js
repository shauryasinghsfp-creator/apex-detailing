import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEnquiryEmail } from '@/lib/emailTemplate';

/**
 * POST /api/enquire
 * Receives a booking inquiry from the client-side form, validates the payload,
 * and dispatches a beautifully formatted HTML email to the shop owner.
 *
 * Uses Gmail SMTP via Nodemailer (no custom domain required). Configure with:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_USER=<your gmail address>
 *   SMTP_PASS=<your gmail APP PASSWORD>
 *   OWNER_EMAIL=<where enquiries are delivered>
 *
 * Fallback: if SMTP is not configured, logs the lead to the console (sandbox mode).
 */

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'johnstanleee@gmail.com';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  try {
    const body = await request.json();

    // --- Normalise & sanitise incoming fields ----------------------------
    const data = {
      clientName: normalizeValue(body.clientName),
      phone: normalizeValue(body.phone),
      email: normalizeValue(body.email),
      carMake: normalizeValue(body.carMake),
      carModel: normalizeValue(body.carModel),
      carYear: normalizeValue(body.carYear),
      carColor: normalizeValue(body.carColor),
      serviceTier: normalizeValue(body.serviceTier),
      preferredDate: normalizeValue(body.preferredDate),
      notes: normalizeValue(body.notes),
    };

    // --- Server-side validation ------------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};
    if (!data.clientName) errors.clientName = 'Please provide your full name.';
    if (!data.phone || data.phone.length < 7)
      errors.phone = 'Please provide a valid phone number.';
    if (!emailRegex.test(data.email))
      errors.email = 'Please provide a valid email address.';
    if (!data.carMake) errors.carMake = 'Required.';
    if (!data.carModel) errors.carModel = 'Required.';
    if (!data.carYear) errors.carYear = 'Required.';
    if (!data.serviceTier) errors.serviceTier = 'Please select a service tier.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // --- Build the HTML email --------------------------------------------
    const { subject, html } = buildEnquiryEmail(data);

    // --- Sandbox mode: SMTP not configured -------------------------------
    if (!SMTP_USER || !SMTP_PASS) {
      console.log('\n[APEX // ATELIER] ====== SANDBOX MODE — SMTP not configured ======');
      console.log('Subject:', subject);
      console.log('To:', OWNER_EMAIL);
      console.log('Lead:', JSON.stringify(data, null, 2));
      console.log('========================================================================\n');

      return NextResponse.json(
        {
          ok: true,
          sandbox: true,
          message:
            'Inquiry received (sandbox mode). Configure SMTP_GMAIL_USER/PASS to enable real email dispatch.',
        },
        { status: 200 }
      );
    }

    // --- Production mode: send via Gmail SMTP ----------------------------
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // 465
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: `APEX Atelier <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject,
      html,
    });

    console.log('[APEX // ATELIER] Email sent:', info.messageId);

    return NextResponse.json(
      {
        ok: true,
        id: info.messageId,
        message: 'Your inquiry has been sent to the atelier. We will be in touch shortly.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[APEX // ATELIER] Email error:', err);
return NextResponse.json(
      {
        ok: false,
        message:
          'The email service could not deliver your inquiry. Please check the SMTP configuration.',
      },
      { status: 500 }
    );
  }
}
