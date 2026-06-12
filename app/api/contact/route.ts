import { NextResponse } from 'next/server';

const DESTINATION_EMAIL = 'sabihulh75@gmail.com';
const FROM_NAME = 'DevNexa Contact Form';

/* ── Branded HTML email template ── */
function buildHtml({
  name, email, company, budget, message, service, project, role,
}: Record<string, string>) {
  const context = service
    ? `<p><strong>Service of interest:</strong> ${service}</p>`
    : project
      ? `<p><strong>Project reference:</strong> ${project}</p>`
      : role
        ? `<p><strong>Role applied for:</strong> ${role}</p>`
        : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact — DevNexa</title>
</head>
<body style="margin:0;padding:0;background:#faf9f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid rgba(9,9,11,0.08);overflow:hidden;max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="background:#09090b;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.03em;">DevNexa</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">New Contact Request</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 24px;color:#09090b;font-size:20px;font-weight:700;letter-spacing:-0.02em;">
                You have a new message from ${name}
              </h2>

              <!-- Sender details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f6;border-radius:12px;border:1px solid rgba(9,9,11,0.08);margin-bottom:24px;">
                <tr><td style="padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid rgba(9,9,11,0.06);">
                        <span style="font-size:11px;color:rgba(9,9,11,0.4);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Name</span><br/>
                        <span style="font-size:15px;color:#09090b;font-weight:600;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid rgba(9,9,11,0.06);">
                        <span style="font-size:11px;color:rgba(9,9,11,0.4);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Email</span><br/>
                        <a href="mailto:${email}" style="font-size:15px;color:#3b82f6;font-weight:600;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid rgba(9,9,11,0.06);">
                        <span style="font-size:11px;color:rgba(9,9,11,0.4);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Company / Project</span><br/>
                        <span style="font-size:15px;color:#09090b;">${company || '—'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;${context ? 'border-bottom:1px solid rgba(9,9,11,0.06);' : ''}">
                        <span style="font-size:11px;color:rgba(9,9,11,0.4);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Estimated Budget</span><br/>
                        <span style="font-size:15px;color:#09090b;">${budget || '—'}</span>
                      </td>
                    </tr>
                    ${context ? `<tr><td style="padding:8px 0;">${context.replace('<p><strong>', '<span style="font-size:11px;color:rgba(9,9,11,0.4);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">').replace('</strong>', '</span><br/><span style="font-size:15px;color:#09090b;">').replace('</p>', '</span></td></tr>')}</td></tr>` : ''}
                  </table>
                </td></tr>
              </table>

              <!-- Message -->
              <h3 style="margin:0 0 12px;font-size:13px;color:rgba(9,9,11,0.5);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Message</h3>
              <div style="background:#faf9f6;border:1px solid rgba(9,9,11,0.08);border-radius:12px;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;font-size:15px;color:#09090b;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#09090b;border-radius:9999px;padding:12px 28px;">
                    <a href="mailto:${email}" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:-0.01em;">Reply to ${name} →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(9,9,11,0.06);">
              <p style="margin:0;font-size:12px;color:rgba(9,9,11,0.35);">DevNexa · contact@devnexa.dev · DHA Phase 2, Islamabad, Pakistan</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Auto-reply to the sender ── */
function buildAutoReplyHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>We received your message — DevNexa</title></head>
<body style="margin:0;padding:0;background:#faf9f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid rgba(9,9,11,0.08);overflow:hidden;max-width:600px;">
        <tr>
          <td style="background:#09090b;padding:32px 40px;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.03em;">DevNexa</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;color:#09090b;font-size:20px;font-weight:700;">Hi ${name}, we got your message.</h2>
            <p style="margin:0 0 16px;font-size:15px;color:rgba(9,9,11,0.6);line-height:1.7;">
              Thank you for reaching out to DevNexa. We review every enquiry personally and will get back to you within <strong style="color:#09090b;">24 hours</strong> with a tailored scope and timeline.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:rgba(9,9,11,0.6);line-height:1.7;">
              In the meantime, feel free to browse our work at <a href="https://devnexa.dev/our-work" style="color:#3b82f6;text-decoration:none;">devnexa.dev/our-work</a> or reach us directly on WhatsApp at <a href="https://wa.me/923003386392" style="color:#10b981;text-decoration:none;">+92 300 338 6392</a>.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#09090b;border-radius:9999px;padding:12px 28px;">
                  <a href="https://devnexa.dev" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Visit DevNexa →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid rgba(9,9,11,0.06);">
            <p style="margin:0;font-size:12px;color:rgba(9,9,11,0.35);">DevNexa · contact@devnexa.dev · DHA Phase 2, Islamabad, Pakistan</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message, service, project, role } = body;

    /* ── Validation ── */
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const subject = `New enquiry from ${name}${service ? ` — ${service}` : project ? ` — ${project}` : role ? ` — ${role}` : ''}`;
    const html = buildHtml({ name, email, company, budget, message, service, project, role });
    const autoReplyHtml = buildAutoReplyHtml(name);

    /* ══════════════════════════════════════════════
       APPROACH 1 — RESEND  (if RESEND_API_KEY is set)
    ══════════════════════════════════════════════ */
    const resendKey = process.env.RESEND_API_KEY;
    const isPlaceholderResend = !resendKey || resendKey === 're_your_api_key_here' || resendKey === '';

    if (!isPlaceholderResend) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);

        /* Send notification to DevNexa */
        const { error } = await resend.emails.send({
          from: `${FROM_NAME} <onboarding@resend.dev>`,
          to: DESTINATION_EMAIL,
          replyTo: email,
          subject,
          html,
        });

        if (error) throw new Error(error.message);

        /* Send auto-reply to the sender */
        await resend.emails.send({
          from: 'DevNexa <onboarding@resend.dev>',
          to: email,
          subject: `We received your message, ${name}!`,
          html: autoReplyHtml,
        }).catch(() => { /* non-critical — ignore */ });

        return NextResponse.json({ success: true, provider: 'resend' });
      } catch (err: any) {
        console.warn('[DevNexa] Resend failed, falling back to Web3Forms:', err.message);
      }
    }

    const w3fKey = process.env.WEB3FORMS_ACCESS_KEY;
    const isPlaceholderW3F = !w3fKey || w3fKey === '2ba6cd97-0e71-4358-aa3c-78162aa32215' || w3fKey === '';

    let web3formsFailed = false;
    let web3formsErrorMessage = '';

    if (!isPlaceholderW3F) {
      try {
        const contextLine = service
          ? `Service: ${service}`
          : project
            ? `Project reference: ${project}`
            : role
              ? `Role: ${role}`
              : '';

        const plainBody = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || '—'}`,
          `Budget: ${budget || '—'}`,
          contextLine,
          '',
          'Message:',
          message,
        ].filter(Boolean).join('\n');

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: w3fKey,
            subject,
            from_name: FROM_NAME,
            name,
            email,
            message: plainBody,
          }),
        });

        const contentType = res.headers.get('content-type');
        let data: any = {};

        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Web3Forms returned an invalid response. Status: ${res.status}`);
        }

        if (res.ok && data.success) {
          return NextResponse.json({ success: true, provider: 'web3forms' });
        }

        throw new Error(data.message || `Web3Forms returned status: ${res.status}`);
      } catch (err: any) {
        console.warn('[DevNexa] Web3Forms submission failed:', err.message);
        web3formsFailed = true;
        web3formsErrorMessage = err.message;
      }
    }

    /* ══════════════════════════════════════════════
       FALLBACK — dev console log only
    ══════════════════════════════════════════════ */
    console.log('\n━━━ DevNexa Contact Form (dev mode) ━━━');
    console.log('To:     ', DESTINATION_EMAIL);
    console.log('Subject:', subject);
    console.log('From:   ', `${name} <${email}>`);
    console.log('Body:\n', message);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (process.env.NODE_ENV === 'development' || isPlaceholderResend) {
      return NextResponse.json({
        success: true,
        isMock: true,
        message: 'Logged to server console. (Note: External providers returned errors, falling back to console mock mode)',
      });
    }

    return NextResponse.json(
      { error: web3formsErrorMessage || 'All email delivery providers failed.' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('[DevNexa] Contact API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
