import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEnquiryEmail } from '@/lib/emailTemplate';

/**
 * POST /api/enquire
 * Receives a booking inquiry from the client-side form, validates the payload,
 * and dispatches a beautifully formatted HTML email to the shop owner.
 *
 * Fallback behaviour: if no `RESEND_API_KEY` is configured, the route logs the
 * lead to the server console and returns a success response so the app can be
 * developed/tested in "sandbox mode" without a real email provider.
 */

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'shauryasinghsfp@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

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

    // --- Client-side style validation (server double-check) --------------
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

    // --- Sandbox mode: no API key configured yet --------------------------
    if (!process.env.RESEND_API_KEY) {
      console.log('\n[APEX // ATELIER] ====== SANDBOX MODE — no RESEND_API_KEY ======');
      console.log('Subject:', subject);
      console.log('To:', OWNER_EMAIL);
      console.log('Lead:', JSON.stringify(data, null, 2));
      console.log('========================================================================\n');

      return NextResponse.json(
        {
          ok: true,
          sandbox: true,
          message:
            'Inquiry received (sandbox mode). Add a RESEND_API_KEY to enable real email dispatch.',
        },
        { status: 200 }
      );
    }

    // --- Production mode: dispatch via Resend ----------------------------
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: emailData, error } = await resend.emails.send({
      from: `APEX Atelier <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      replyTo: data.email,
      subject,
      html,
    });

    if (error) {
      console.error('[APEX // ATELIER] Resend error:', error);
      return NextResponse.json(
        {
          ok: false,
          message:
            'The email service could not deliver your inquiry. Please try again shortly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        id: emailData?.id,
        message: 'Your inquiry has been sent to the atelier. We will be in touch shortly.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[APEX // ATELIER] Unexpected error:', err);
    return NextResponse.json(
      {
        ok: false,
        message: 'An unexpected error occurred while processing your inquiry.',
      },
      { status: 500 }
    );
  }
}
