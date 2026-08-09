/**
 * emailTemplate.js
 * Generates a beautifully formatted HTML email for incoming APEX lead inquiries.
 * Used by the `/api/enquire` route to dispatch the booking request to the shop owner.
 * Enquiries are delivered to OWNER_EMAIL (configured via .env.local).
 */

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '<')
    .replaceAll('>', '>')
    .replaceAll('"', '"')
    .replaceAll("'", '&#039;');
}

/**
 * Builds the full HTML email body for a new enquiry.
 * @param {object} data - normalized lead data from the booking form
 * @returns {object} { subject, html }
 */
export function buildEnquiryEmail(data) {
  const subject = `New Enquiry — ${escapeHtml(data.clientName)} | ${escapeHtml(
    data.carMake
  )} ${escapeHtml(data.carModel)}`;

  const rows = [
    ['Client Name', data.clientName],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Vehicle', `${data.carMake} ${data.carModel} ${data.carYear}`],
    ['Paint Color', data.carColor],
    ['Service Tier', data.serviceTier],
    ['Preferred Date', data.preferredDate],
    ['Notes', data.notes || '—'],
  ];

  const rowHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 20px;border-bottom:1px solid #1f1f24;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a93;width:180px;vertical-align:top;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:12px 20px;border-bottom:1px solid #1f1f24;font-size:14px;color:#ededef;vertical-align:top;">
          ${escapeHtml(value)}
        </td>
      </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=Inter:wght@400;500&display=swap');
    </style>
  </head>
  <body style="margin:0;padding:0;background:#09090b;font-family:'Inter',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#121214;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:32px 36px;background:#121214;border-bottom:1px solid rgba(212,175,55,0.25);">
                <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;letter-spacing:0.16em;color:#ededef;">
                  APEX DETAILING
                </div>
                <div style="font-family:'Syne',sans-serif;font-size:11px;letter-spacing:0.42em;color:#d4af37;margin-top:4px;">
                  // ATELIER
                </div>
              </td>
            </tr>
            <!-- Intro -->
            <tr>
              <td style="padding:32px 36px 8px 36px;">
                <div style="font-family:'Syne',sans-serif;font-size:15px;letter-spacing:0.12em;text-transform:uppercase;color:#d4af37;margin-bottom:8px;">
                  New Booking Inquiry
                </div>
                <div style="font-size:13px;line-height:1.6;color:#8a8a93;">
                  A new client has submitted a detailing enquiry through the APEX
                  atelier. Review the details below and respond at your earliest
                  convenience.
                </div>
              </td>
            </tr>
            <!-- Lead details table -->
            <tr>
              <td style="padding:16px 36px 8px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1f1f24;border-radius:12px;overflow:hidden;">
                  ${rowHtml}
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:24px 36px 32px 36px;">
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:20px;"></div>
                <div style="font-size:11px;line-height:1.7;color:#5f5f66;letter-spacing:0.04em;">
                  This automated message was sent from the APEX DETAILING // Atelier booking system.
                  <br />
                  Sovereign detail studio · Precision for the world's finest automobiles.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}
